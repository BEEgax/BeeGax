import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import BeescaAPI from './BeescaAPI';


const HiveSettings = ({route}) => {
  const {buttonID} = route.params
  const hive = BeescaAPI.hives.find((value) => value.id==buttonID);
  if (buttonID[0] != "P"){
    // get Hive by Id
    // parse correct props to settings screen
    return (
      <View><SettingsScreen Hid={buttonID} Name={hive.name} Location={hive.location} Key={hive.hardware_api_key} Post={false}></SettingsScreen></View> 
    );
  }else{
    return (
      <View><SettingsScreen Hid={buttonID} Name={hive.name} Location={hive.location} Key={hive.hardware_api_key} Post={true}></SettingsScreen></View>
    );
  }

}

const SettingsScreen = (props) => {
  console.log(props);
  if (Object.keys(props).length === 0){    
    props = {id: "", hardware_api_key: "", location: "", name: ""}
  }
  const {Hid, Name, Location, Key, Post} = props;
  const [hiveName, setHiveName] = useState(Name.toString());
  const [location, setLocation] = useState(Location);
  const [apiKey, setApiKey] = useState(Key);

  const hive = {id: Hid, name: hiveName, location: location, hardware_api_key: apiKey};
  const handleSave = async () => {
    // save the inputs
    if (Post == true)
    {
      await BeescaAPI.postHive(hive);
    }else{
      await BeescaAPI.patchHive(hive);
    }
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
