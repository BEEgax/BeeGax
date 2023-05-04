import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import BeescaAPI from './BeescaAPI';

const HiveSettings = ({route}) => {
  const {buttonID} = route.params
  if (buttonID[0] != "P"){
    // get Hive by Id
    // parse correct props to settings screen
    return (
      <View><SettingsScreen Name={buttonID} Location="none" Key="banana"></SettingsScreen></View> 
    );
  }else{
    return (
      <View><SettingsScreen></SettingsScreen></View> 
    );
  }

}

const SettingsScreen = (props) => {
  console.log(props);
  const {Name, Location, Key} = props;
  const [hiveName, setHiveName] = useState(Name.toString());
  const [location, setLocation] = useState(Location);
  const [apiKey, setApiKey] = useState(Key);

  const handleSave = async () => {
    // save the inputs
    const hive = {name: hiveName, location: location, hardware_api_key: apiKey};
    await BeescaAPI.postHive(hive);
    console.log(`Hive Name: ${hiveName}, Location: ${location}, API Key: ${apiKey}`);
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Hive Name"
        value={hiveName}
        onChangeText={setHiveName}
      />
      <TextInput
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        placeholder="Enter API Key"
        value={apiKey}
        onChangeText={setApiKey}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

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
