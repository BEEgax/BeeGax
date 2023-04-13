import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HiveSettings = ({route, navigation}) => {
  const {buttonID} = route.params
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{buttonID}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default HiveSettings;
