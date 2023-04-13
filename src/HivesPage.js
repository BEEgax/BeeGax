import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import BeescaAPI from "./BeescaAPI";

const HivesPage = ({ navigation }) => {
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
      <TouchableWithoutFeedback onPress={() => POPUPconf(buttonText)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: "#352208",
  },
  text: {
    fontSize: 24,
    marginBottom: 100,
    color: "#f6f3ee",
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
    backgroundColor: "#FCCB06",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#f6f3ee",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Hivespage;
