import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';
import PushNotification from '../services/LocalPushController';

const TestNotification = () => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [view, setView] = useState(false);

  const handleButtonPress = (time) => {
    PushNotification.LocalScheduleNotification(moment(time));
  };

  const handleDatePick = (selectedDate) => {
    console.log(selectedDate);
    console.log(date);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setView(false);
  };

  useEffect(() => {
    RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then(
      (isEnabled) => {
        if (isEnabled) {
          RNDisableBatteryOptimizationsAndroid.openBatteryModal();
        }
      },
    );
  }, []);

  // console.log(`${date.getHours()}:${date.getMinutes()}`);

  return (
    <SafeAreaProvider style={styles.container}>
      {/* <View style={styles.button}>
          <Button title="pick your time schedule" onPress={() => setView(true)} />
        </View>
        <View style={styles.button}>
          <Button
            style={styles.button}
            title="SCHEDULE NOTIFICATION"
            onPress={() => handleButtonPress(date)}
          />
        </View>
        <DateTimeModalPicker
          mode="time"
          isVisible={view}
          onCancel={() => setView(false)}
          onConfirm={handleDatePick}
          is24Hour={true}
        /> */}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TestNotification;
