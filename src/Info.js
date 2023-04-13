import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HiveInfo = ({ route, navigation }) => {
  const { buttonID } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HiveSettings", { buttonID: buttonID })
          }
        >
          <Icon name="cog" size={30} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, buttonID]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{buttonID}</Text>
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
    marginBottom: 10,
  },
});

export default HiveInfo;
