import React, { useEffect, useState } from "react";
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
import calcNext, { addDate, isScheduleBehind } from "../utils/calcSchedule";

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
  const { lastId } = useSelector((state) => state.reminders);
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(dayjs().add(5, "minutes").toDate());
  const [pickSchedule, setPickSchedule] = useState(new Date(Date.now()));
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("time");
  const [repeatValue, setRepeatValue] = useState(options[0].value);
  const [minDate, setMinDate] = useState(new Date(Date.now()));

  const handleAddReminder = (values) => {
    const validId = lastId + 1;

    console.log(pickSchedule);

    const notiConfig = {
      title: values.title,
      description: `${values.description}`,
      repeatType: values.isRepeat ? repeatValue : null,
    };

    LocalScheduleNotification(pickSchedule, validId, notiConfig);
    dispatch({
      type: ADD_REMINDER,
      payload: {
        ...values,
        id: validId,
        repeatType: values.isRepeat
          ? options.find((type) => type.value === repeatValue).label
          : null,
        date: dayjs(pickSchedule).format(),
      },
    });

    navigation.navigate("Home");
  };

  const handleOpenPicker = (mode) => {
    setMode(mode);
    setVisible(true);
  };

  const handleDatePick = (date) => {
    const pickDate = moment(date);
    const pickTime = moment(time);
    const newDate = new Date(
      pickDate.year(),
      pickDate.month(),
      pickDate.date(),
      pickTime.hours(),
      pickTime.minutes(),
      pickTime.seconds(),
      pickTime.milliseconds()
    );
    setPickSchedule(newDate);
    setDate(date);
    setVisible(false);
  };

  const handleTimePick = (time) => {
    let calcDate = date;
    if (isScheduleBehind(dayjs(time), dayjs())) {
      setMinDate(addDate(dayjs()).toDate());
      calcDate = addDate(dayjs(date)).toDate();
    } else {
      setMinDate(dayjs().toDate());
    }
    const pickDate = moment(calcDate);
    const pickTime = moment(time);
    const newDate = new Date(
      pickDate.year(),
      pickDate.month(),
      pickDate.date(),
      pickTime.hours(),
      pickTime.minutes(),
      pickTime.seconds(),
      pickTime.milliseconds()
    );
    setPickSchedule(newDate);
    setTime(time);
    setDate(calcDate);
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
                  value={dayjs(time).format("HH:mm")}
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
                  value={dayjs(date).format("DD/MM/YYYY")}
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
                  minimumDate={minDate}
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
