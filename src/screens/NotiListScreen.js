import dayjs from "dayjs";
import { Text } from "native-base";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import AppListItem from "../components/AppListItem";
import { GetLocalScheduleNotifications } from "../services/LocalPushController";

const NotiListScreen = () => {
  const { notiList } = useSelector((state) => state.reminders);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>List</Text>
        <FlatList
          style={styles.list}
          data={notiList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppListItem
              item={{
                title: item.title,
                description: dayjs(item.date).format("HH:mm - DD/MM/YYYY"),
              }}
              noRight={false}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  text: {
    fontSize: 24,
    marginBottom: 15,
  },
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotiListScreen;
