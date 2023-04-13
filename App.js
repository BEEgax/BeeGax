import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import DiagramsPage from './src/DiagramsPage.js';
import HivesPage from "./src/HivesPage.js";
import Info from './src/Info.js';
import HiveSettings from './src/HiveSettings.js';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HivesPadge" component={HivesPage}options={{
          title: 'Hives',
          headerStyle: {
            backgroundColor: '#55a16b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>

        <Stack.Screen name="HiveInfo" component={Info} options={{
          title: 'Info',
          headerStyle: {
            backgroundColor: '#55a16b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
          
        }}/>

        <Stack.Screen name="HiveSettings" component={HiveSettings} options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#55a16b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
