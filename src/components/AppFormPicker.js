import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../configs/colors";
import { useFormikContext } from "formik";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AppFormPicker = ({
  name,
  options,
  title,
  icon,
  onToggle,
  selectedValue,
  onPick,
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
          <View style={styles.selectContainer}>
            <Picker
              style={styles.select}
              selectedValue={selectedValue}
              onValueChange={onPick}
              prompt="Choose repeat type"
            >
              {options.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
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
  selectContainer: {
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
  },
  select: {
    alignItems: "center",
    justifyContent: "center",
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

export default AppFormPicker;
