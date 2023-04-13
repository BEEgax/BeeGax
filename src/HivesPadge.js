import React, { useState } from "react";
import {View, Text, StyleSheet, Button } from 'react-native';
import BeescaAPI from "./BeescaAPI";


const HivesPadge = ({ navigation }) => {
  const POPUPconf = (buttonText) => {
    navigation.navigate('POPUP', {buttonID: buttonText});
    setButtonList(BeescaAPI.getHives())
  };
  const [buttonList, setButtonList] = useState(BeescaAPI.getHives());

  const renderButton = (buttonText) => {
    return <Button title={buttonText} onPress={() => POPUPconf(buttonText)} />;
  };
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the settings page!</Text>
      {buttonList.map((buttonText) => (
      renderButton(buttonText)
    ))}
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: -3,
    },
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BBBBBB",
    height: "100%",
  },
  activeButton: {
    backgroundColor: "#FFDB58",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 5,
  },
  activeButtonText: {
    color: "#FFFFFF",
  },
});

export default HivesPadge;
