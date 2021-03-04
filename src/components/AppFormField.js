import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormikContext} from 'formik';
import {Input, Text} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const AppFormField = ({name, ...componentProps}) => {
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
      />
      {errors[name] && touched[name] && (
        <Text style={styles.error}>{errors[name]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  error: {
    marginLeft: '3%',
    color: 'red',
  },
});

export default AppFormField;
