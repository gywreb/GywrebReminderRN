import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppScreen from "../components/AppScreen";
import colors from "../configs/colors";
import { useDispatch } from "react-redux";
import { CancelLocalScheduleNotification } from "../services/LocalPushController";
import { REMOVE_REMINDER } from "../store/remiders/reminders.action";

const ReminderDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const reminder = route.params;

  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log(reminder.id);
    CancelLocalScheduleNotification(reminder.id);
    dispatch({ type: REMOVE_REMINDER, payload: reminder.id });
    navigation.navigate("Home");
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.cardContainer}>
        <Text h3 style={styles.title}>
          {reminder.title}
        </Text>
        <View style={styles.textContainer}>
          {reminder.description ? (
            <Text style={styles.text}>{reminder.description}</Text>
          ) : (
            <Text style={styles.text}>No Description</Text>
          )}
        </View>
      </View>
      <View>
        <Button
          icon={
            <Icon
              name="square-edit-outline"
              color="white"
              size={25}
              style={styles.icon}
            />
          }
          title="EDIT"
          buttonStyle={[styles.button, { backgroundColor: colors.info }]}
        />
        <Button
          icon={
            <Icon name="delete" color="white" size={25} style={styles.icon} />
          }
          title="REMOVE"
          buttonStyle={[styles.button, { backgroundColor: colors.danger }]}
          onPress={handleDelete}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 15,
    justifyContent: "space-evenly",
  },
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  title: {
    color: colors.white,
    marginLeft: 15,
    marginVertical: 15,
  },
  textContainer: {
    borderRadius: 20,
    backgroundColor: colors.white,
    margin: 15,
    padding: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
  },
});

export default ReminderDetailScreen;
