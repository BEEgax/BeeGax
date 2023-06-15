import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import BeescaAPI from './BeescaAPI';

const HiveSettings = ({ route }) => {
  const { buttonID } = route.params;
  const hive = BeescaAPI.hives.find((value) => value.id == buttonID);
  if (buttonID[0] !== 'P') {
    return (
      <View style={styles.container}>
        <SettingsScreen Hid={buttonID} Name={hive.name} Location={hive.location} Key={hive.hardware_api_key} Post={false} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SettingsScreen Hid={buttonID} Name={hive.name} Location={hive.location} Key={''} Post={true} />
      </View>
    );
  }
};

const SettingsScreen = (props) => {
  const { Hid, Name, Location, Key, Post } = props;
  const [hiveName, setHiveName] = useState(Name.toString());
  const [location, setLocation] = useState(Location);
  const [apiKey, setApiKey] = useState(Key);

  const hive = { id: Hid, name: hiveName, location: location, hardware_api_key: apiKey };
  const handleSave = async () => {
    if (Post === true) {
      await BeescaAPI.postHive(hive);
    } else {
      await BeescaAPI.patchHive(hive);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Hive Name"
        value={hiveName}
        onChangeText={setHiveName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter API Key"
        value={apiKey}
        onChangeText={setApiKey}
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignSelf: 'center', // Center the input fields horizontally
  },
  buttonContainer: {
    width: 100,
    height: 50,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#55a16b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f6f3ee',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HiveSettings;
