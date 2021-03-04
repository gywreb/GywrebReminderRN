import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ReminderEditScreen from '../screens/ReminderEditScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ReminderEdit" component={ReminderEditScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
