import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Formik } from "formik";
import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { ADD_REMINDER } from "../store/remiders/reminders.action";
import AppFormDatePicker from "../components/AppFormDatePicker";
import DateTimeModalPicker from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import { LocalScheduleNotification } from "../services/LocalPushController";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";
import AppFormPicker from "../components/AppFormPicker";
import { ScrollView } from "react-native-gesture-handler";

const initialValues = {
  title: "",
  description: "",
  isDatePick: false,
  isTimePick: true,
  isRepeat: false,
};

const options = [
  { label: "Daily", value: "day" },
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(4).label("Title"),
  description: Yup.string().label("Description"),
  isDatePick: Yup.boolean().label("Date"),
  isTimePick: Yup.boolean().oneOf([true], "You must choose the reminded time"),
  isRepeat: Yup.boolean().label("Repeat"),
});

const ReminderEditScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { list } = useSelector((state) => state.reminders);
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [time, setTime] = useState(dayjs().format("HH:mm"));
  const [pickSchedule, setPickSchedule] = useState(new Date(Date.now()));
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("time");
  const [repeatValue, setRepeatValue] = useState(options[0].value);

  const handleAddReminder = (values) => {
    const notiConfig = {
      title: values.title,
      description: `${values.description}\nRepeat daily every ${dayjs(
        pickSchedule
      ).format("HH:mm")}`,
      repeatType: values.isRepeat ? repeatValue : null,
    };

    console.log(dayjs(pickSchedule).format());

    LocalScheduleNotification(pickSchedule, list.length + 1, notiConfig);
    dispatch({
      type: ADD_REMINDER,
      payload: { ...values, id: list.length + 1 },
    });

    navigation.navigate("Home");
  };

  const handleOpenPicker = (mode) => {
    setMode(mode);
    setVisible(true);
  };

  const handleDatePick = (date) => {
    setPickSchedule(date);
    setDate(dayjs(date).format("DD/MM/YYYY"));
    setVisible(false);
  };

  const handleTimePick = (date) => {
    setPickSchedule(date);
    setTime(dayjs(date).format("HH:mm"));
    setVisible(false);
  };

  return (
    <ScrollView>
      <SafeAreaProvider style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddReminder}
        >
          {({ handleSubmit, setFieldValue, values }) => {
            return (
              <>
                <AppFormField name="title" placeholder="Title" />
                <AppFormField
                  name="description"
                  placeholder="Description"
                  numberOfLines={3}
                />
                <AppFormDatePicker
                  pickerMode="time"
                  icon="calendar-clock"
                  value={time}
                  name="isTimePick"
                  onOpen={handleOpenPicker}
                  title="Set Time"
                  onToggle={() =>
                    setFieldValue("isTimePick", !values["isTimePick"])
                  }
                />
                <AppFormDatePicker
                  pickerMode="date"
                  icon="calendar-today"
                  value={date}
                  name="isDatePick"
                  onOpen={handleOpenPicker}
                  title="Set Date"
                  onToggle={() =>
                    setFieldValue("isDatePick", !values["isDatePick"])
                  }
                />
                <AppFormPicker
                  options={options}
                  title="Repeat"
                  icon="calendar-refresh"
                  name="isRepeat"
                  onToggle={() =>
                    setFieldValue("isRepeat", !values["isRepeat"])
                  }
                  onPick={(item) => setRepeatValue(item)}
                  selectedValue={repeatValue}
                />
                <DateTimeModalPicker
                  is24Hour={true}
                  minimumDate={new Date(Date.now())}
                  mode={mode}
                  isVisible={visible}
                  onCancel={() => setVisible(false)}
                  onConfirm={mode === "date" ? handleDatePick : handleTimePick}
                />
                <Button
                  title="REMIND ME"
                  onPress={handleSubmit}
                  buttonStyle={styles.button}
                />
              </>
            );
          }}
        </Formik>
      </SafeAreaProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  button: {
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
  },
});

export default ReminderEditScreen;
