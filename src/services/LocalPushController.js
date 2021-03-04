import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import dayjs from 'dayjs';
import moment from 'moment';

const channelId = 'local';

PushNotification.createChannel(
  {
    channelId, // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    console.log(new Date(notification.fireDate).getDate());
    console.log(
      new Date(notification.fireDate).getHours(),
      new Date(notification.fireDate).getMinutes(),
    );
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

const LocalNotification = () => {
  PushNotification.localNotification({
    channelId,
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    allowWhileIdle: true,
    actions: '["Yes", "No"]',
  });
};

const LocalScheduleNotification = (time) => {
  const date = new Date(time.valueOf());
  console.log(date.getHours(), date.getMinutes());
  PushNotification.localNotificationSchedule({
    channelId,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Schedule Notification Demo',
    title: 'Local Schedule Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    date,
    repeatType: 'day',
    allowWhileIdle: true,
  });
};

export default {
  LocalNotification,
  LocalScheduleNotification,
};
