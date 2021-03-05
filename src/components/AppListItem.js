import React from "react";
import { StyleSheet } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { Swipeable } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { CancelLocalScheduleNotification } from "../services/LocalPushController";
import { REMOVE_REMINDER } from "../store/remiders/reminders.action";
import AppDeleteButton from "./AppDeleteButton";

const AppListItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    CancelLocalScheduleNotification(item.id);
    dispatch({ type: REMOVE_REMINDER, payload: item.id });
  };

  return (
    <Swipeable
      renderRightActions={() => <AppDeleteButton onPress={handleDelete} />}
    >
      <ListItem
        bottomDivider
        topDivide
        onPress={() => console.log("press")}
        containerStyle={styles.container}
      >
        <Icon name="alarm" />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          {item.description.length ? (
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          ) : null}
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 30,
  },
});

export default AppListItem;
