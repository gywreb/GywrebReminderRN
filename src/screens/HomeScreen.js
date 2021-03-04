import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider style={styles.container}>
      <Text h1 style={styles.text}>
        REMINDER
      </Text>
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
        onPress={() => navigation.navigate('ReminderEdit')}
      />
      <Text style={styles.reminderDescription}>No Reminder</Text>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: '22%',
  },
  reminderDescription: {
    fontSize: 20,
  },
  button: {
    padding: 20,
    borderRadius: 15,
  },
  text: {
    position: 'absolute',
    top: '10%',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
});

export default HomeScreen;
