import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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

  const renderButton = (hardwarekey, i, name) => {
    return (
        <>
        {/* <Button key={i} title={buttonText} onPress={() => POPUPconf(buttonText, i)} /> */}
        <TouchableWithoutFeedback key={i} title={hardwarekey} onPress={() => POPUPconf(hardwarekey, i)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{hardwarekey == "+" ? "+" : name}</Text>
        </View>
      </TouchableWithoutFeedback></>    
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the HivesPage!</Text>
      <View style={styles.row}>
      <View style={styles.column}>
      {buttonList.slice(0, 4).map((hive) => (
        renderButton(hive.hardware_api_key, hive.id, hive.name)
      ))
      }
              </View>
        <View style={styles.column}>
          {buttonList.slice(4, 8).map((hive) => renderButton(hive.hardware_api_key, hive.id, hive.name))}
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f3ee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#55a16b",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#f6f3ee",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HivesPage;
