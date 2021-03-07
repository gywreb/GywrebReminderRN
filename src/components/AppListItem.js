import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { CancelLocalScheduleNotification } from "../services/LocalPushController";
import { REMOVE_REMINDER } from "../store/remiders/reminders.action";
import AppDeleteButton from "./AppDeleteButton";
import dayjs from "dayjs";
import colors from "../configs/colors";

const AppListItem = ({ item, onPress, noRight = true }) => {
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
        topDivider
        containerStyle={styles.container}
        onPress={onPress}
      >
        <ListItem.Content>
          <ListItem.Title numberOfLines={1}>{item.title}</ListItem.Title>
          {item.description.length ? (
            <ListItem.Subtitle numberOfLines={1}>
              {item.description}
            </ListItem.Subtitle>
          ) : null}
        </ListItem.Content>
        {noRight && (
          <View>
            <View style={styles.repeatInfo}>
              {item.isRepeat ? (
                <MIcon style={styles.icon} name="update" size={25} />
              ) : (
                <MIcon style={styles.icon} name="calendar-check" size={25} />
              )}
              <Text style={styles.repeatType}>
                {item.repeatType ? item.repeatType : "Only once"}
              </Text>
            </View>
            {item.isRepeat ? (
              <Text style={styles.date}>
                {dayjs(item.date).format(
                  item.repeatType === "Daily" ? "HH:mm" : "HH:mm - DD/MM/YYYY"
                )}
              </Text>
            ) : (
              <Text style={styles.date}>
                {dayjs(item.date).format("HH:mm - DD/MM/YYYY")}
              </Text>
            )}
          </View>
        )}
      </ListItem>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 30,
    backgroundColor: colors.light,
  },
  icon: {
    marginHorizontal: 5,
  },
  repeatInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  repeatType: {
    fontStyle: "italic",
  },
  date: {
    marginTop: 5,
    color: colors.medium,
    textAlign: "right",
    fontSize: 12,
  },
});

export default AppListItem;
