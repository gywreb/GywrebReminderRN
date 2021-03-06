import PushNotificationIOS from "@react-native-community/push-notification-ios";
import dayjs from "dayjs";
import PushNotification from "react-native-push-notification";
import { NOTIFICATION_CHANNELID } from "@env";

export const PushNotificationInit = () => {
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      // console.log(new Date(notification.fireDate).getDate());
      // console.log(
      //   new Date(notification.fireDate).getHours(),
      //   new Date(notification.fireDate).getMinutes()
      // );
      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: NOTIFICATION_CHANNELID || "scheduleLocal", // (required)
      channelName: "Gywreb Reminder", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const LocalScheduleNotification = (date, id, notiConfig) => {
  const { description, title, repeatType } = notiConfig;
  console.log(date);
  // console.log(notiConfig);

  PushNotification.localNotificationSchedule({
    id,
    channelId: NOTIFICATION_CHANNELID || "scheduleLocal",
    bigText: description,
    title,
    message: "Expand to see more details",
    vibrate: true,
    vibration: 1000,
    playSound: true,
    soundName: "default",
    date,
    repeatType,
    allowWhileIdle: true,
  });
};

export const GetLocalScheduleNotifications = () => {
  PushNotification.getScheduledLocalNotifications((notis) =>
    console.log(notis)
  );
};

export const CancelLocalScheduleNotification = (id) => {
  PushNotification.cancelLocalNotifications({ id });
};

// const LocalNotification = () => {
//   PushNotification.localNotification({
//     channelId,
//     autoCancel: true,
//     bigText:
//       "This is local notification demo in React Native app. Only shown, when expanded.",
//     subText: "Local Notification Demo",
//     title: "Local Notification Title",
//     message: "Expand me to see more",
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     soundName: "default",
//     allowWhileIdle: true,
//     actions: '["Yes", "No"]',
//   });
// };
