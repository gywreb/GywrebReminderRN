import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import AppListItem from "../components/AppListItem";
import colors from "../configs/colors";
import AppScreen from "../components/AppScreen";
import { ScrollView } from "react-native-gesture-handler";
import { GetLocalScheduleNotifications } from "../services/LocalPushController";
import RNDisableBatteryOptimizationsAndroid from "react-native-disable-battery-optimizations-android";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.reminders);
  const navigation = useNavigation();

  useEffect(() => {
    GetLocalScheduleNotifications(dispatch);
  }, [list]);

  useEffect(() => {
    RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then(
      (isEnabled) => {
        if (isEnabled) {
          RNDisableBatteryOptimizationsAndroid.openBatteryModal();
        }
      }
    );
  }, []);

  return (
    <AppScreen style={styles.container}>
      <Button
        containerStyle={styles.debugButton}
        buttonStyle={styles.debugButtonContainer}
        titleProps={{ style: { fontSize: 10, color: "white" } }}
        title="Notification List"
        titleStyle={styles.title}
        icon={
          <Icon
            name="alarm"
            color="white"
            size={10}
            style={{ marginRight: 5 }}
          />
        }
        onPress={() => navigation.navigate("NotiList")}
      />
      <Text style={styles.text}>SCHEDULE REMINDER</Text>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        title="New Reminder"
        titleStyle={styles.title}
        icon={
          <Icon
            name="plus-circle"
            color="white"
            size={40}
            style={styles.icon}
          />
        }
        onPress={() => navigation.navigate("ReminderEdit")}
      />

      {list.length ? (
        <ScrollView style={styles.reminderList}>
          <View>
            <FlatList
              style={{ width: "100%" }}
              data={list}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AppListItem
                  item={item}
                  onPress={() => navigation.navigate("ReminderDetail", item)}
                />
              )}
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.reminderInfo}>No Reminder</Text>
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  debugButton: {
    alignSelf: "flex-end",
    marginRight: 10,
    padding: 0,
  },
  buttonContainer: {
    marginTop: 50,
  },
  reminderDescription: {
    fontSize: 20,
  },
  button: {
    padding: 20,
    borderRadius: 15,
  },
  text: {
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 26,
  },
  title: {
    textTransform: "uppercase",
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
  reminderList: {
    marginTop: 60,
    width: "100%",
  },
  reminderInfo: {
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
    marginTop: 150,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default HomeScreen;
