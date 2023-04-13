import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DiagramsPage from './src/DiagramsPage.js';
import HivesPadge from "./src/HivesPadge.js";
import POPUP from './src/Popup.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HIVES" component={HivesPadge}/>
        <Stack.Screen name="POPUP" component={POPUP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
