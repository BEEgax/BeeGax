import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeTab === "hives" && styles.activeButton]}
          onPress={() => handleTabPress("hives")}
        >
          <Ionicons name="md-bee" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeTab === "charts" && styles.activeButton]}
          onPress={() => handleTabPress("charts")}
        >
          <Ionicons name="md-stats-chart" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === "locations" && styles.activeButton,
          ]}
          onPress={() => handleTabPress("locations")}
        >
          <Ionicons nme="md-pin" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Your existing code with 8 buttons */}
    </View>
  );
};

const styles = StyleSheet.create({
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
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
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

export default App;
