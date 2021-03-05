import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../configs/colors';

const AppDeleteButton = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={styles.container}>
      <Icon name="trash-can-outline" size={35} color={colors.white} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default AppDeleteButton;
