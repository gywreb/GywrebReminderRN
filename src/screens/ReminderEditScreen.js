import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Formik} from 'formik';
import * as Yup from 'yup';
import AppFormField from '../components/AppFormField';

const initialValues = {
  title: '',
  description: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(4).label('Title'),
  description: Yup.string().label('Description'),
});

const ReminderEditScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}>
        {() => {
          return (
            <>
              <AppFormField name="title" placeholder="Title" />
              <AppFormField name="description" placeholder="Description" />
            </>
          );
        }}
      </Formik>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ReminderEditScreen;
