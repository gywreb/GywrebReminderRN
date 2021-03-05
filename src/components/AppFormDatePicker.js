import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { Text } from "react-native-elements";
import { Input } from "react-native-elements";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import colors from "../configs/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AppFormDatePicker = ({
  icon,
  onToggle,
  pickerMode,
  name,
  onOpen,
  title,
  value,
}) => {
  const { values, errors, touched } = useFormikContext();

  return (
    <View style={styles.container}>
      <View style={styles.formInputContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            {icon && (
              <Icon
                name={icon}
                size={25}
                color={colors.medium}
                style={styles.icon}
              />
            )}
            <Text style={styles.buttonText}>{title}</Text>
          </View>
          <Switch onValueChange={onToggle} value={values[name]} />
        </View>

        {values[name] && (
          <TouchableWithoutFeedback
            onPress={() => onOpen(pickerMode)}
            style={styles.touchContainer}
          >
            <Text style={styles.date}>{value}</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
      {errors[name] && touched[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formInputContainer: {
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: colors.light,
    overflow: "hidden",
  },
  buttonText: {
    fontSize: 18,
    color: colors.medium,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginRight: 5,
  },
  touchContainer: {
    paddingVertical: 15,
    backgroundColor: colors.primary,
  },
  date: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: colors.white,
  },
  error: {
    marginTop: 5,
    marginLeft: 15,
    color: colors.danger,
  },
});

export default AppFormDatePicker;
