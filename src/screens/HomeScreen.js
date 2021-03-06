import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import AppListItem from "../components/AppListItem";
import colors from "../configs/colors";
import AppScreen from "../components/AppScreen";
import { ScrollView } from "react-native-gesture-handler";
import { GetLocalScheduleNotifications } from "../services/LocalPushController";
import RNDisableBatteryOptimizationsAndroid from "react-native-disable-battery-optimizations-android";

const HomeScreen = () => {
  const { list } = useSelector((state) => state.reminders);
  const navigation = useNavigation();

  useEffect(() => {
    GetLocalScheduleNotifications();
  }, []);

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
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 32,
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
