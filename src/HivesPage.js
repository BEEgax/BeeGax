import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import BeescaAPI from "./BeescaAPI";


const HivesPage = ({ navigation }) => {
  useEffect(() => {
    setButtonList(BeescaAPI.getHives());
    console.log("asd");
  }, []);
  const POPUPconf = (buttonText) => {
    if (buttonText == '+'){
      navigation.navigate('HiveSettings', {buttonID: buttonText})
    } else {
      navigation.navigate('HiveInfo', {buttonID: buttonText});
    }

  };
  const [buttonList, setButtonList] = useState(BeescaAPI.getHives());

  const renderButton = (buttonText) => {
    return <Button title={buttonText} onPress={() => POPUPconf(buttonText)} />;
  };
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the hives page!</Text>
      {buttonList.map((buttonText) => (
      renderButton(buttonText)
    ))}
    </View>
  );
}

const PopupHeader = (hive) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('HiveSettings', {buttonID: 'ich weiß nigt'})}>
      <Text>Settings</Text>
    </TouchableOpacity>
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

export default HivesPage;
