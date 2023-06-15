import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import BeescaAPI from "./BeescaAPI";


const HivesPage = ({ navigation }) => {
  useEffect(() => {
    BeescaAPI.getHives().then((hives) => {
      setButtonList(hives);
    });
  }, []);

  const POPUPconf = (buttonText, key) => {
    if (buttonText == '+'){
      navigation.navigate('HiveSettings', {buttonID: key})
    } else {
      navigation.navigate('HiveInfo', {buttonID: key});
    }

  };
  const [buttonList, setButtonList] = useState([]);

  const renderButton = (buttonText, i) => {
    return <Button key={i} title={buttonText} onPress={() => POPUPconf(buttonText, i)} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the HivesPage!</Text>
      {buttonList.map((hive) => (
        renderButton(hive.hardware_api_key, hive.id)
      ))
      }
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
export default HivesPage;
