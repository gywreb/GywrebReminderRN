import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';
import { Input, Text } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import colors from '../configs/colors';

const AppFormField = ({ name, ...componentProps }) => {
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext();
  return (
    <View style={styles.container}>
      <Input
        value={values[name]}
        onChangeText={(text) => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name, true)}
        {...componentProps}
        errorMessage={errors[name] && touched[name] ? errors[name] : null}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: colors.light,
    borderBottomWidth: 0,
  },
});

export default AppFormField;
