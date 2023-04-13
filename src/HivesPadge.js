import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BeescaAPI from "./BeescaAPI";

const HivesPadge = ({ navigation }) => {
  const POPUPconf = (buttonText) => {
    navigation.navigate("POPUP", { buttonID: buttonText });
    const newList = [];
    buttonList.map((i) => {
      newList.push(i);
    });
    newList.pop();
    newList.push("gaxe");
    setButtonList(BeescaAPI.getHives());
  };
  const [buttonList, setButtonList] = useState(BeescaAPI.getHives());

  const renderButton = (buttonText) => {
    return (
      <View style={styles.buttonContainer}>
        <Button title={buttonText} onPress={() => POPUPconf(buttonText)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Beehives:</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          {buttonList.slice(0, 4).map((buttonText) => renderButton(buttonText))}
        </View>
        <View style={styles.column}>
          {buttonList.slice(4, 8).map((buttonText) => renderButton(buttonText))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 100,
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
    width: 100, // set a fixed width
    height: 100, // set a fixed height
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default HivesPadge;
