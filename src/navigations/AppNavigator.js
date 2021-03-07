import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ReminderEditScreen from "../screens/ReminderEditScreen";
import ReminderDetailScreen from "../screens/ReminderDetailScreen";
import NotiListScreen from "../screens/NotiListScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ReminderEdit" component={ReminderEditScreen} />
      <Stack.Screen name="ReminderDetail" component={ReminderDetailScreen} />
      <Stack.Screen name="NotiList" component={NotiListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
