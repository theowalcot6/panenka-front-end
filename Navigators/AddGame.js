// SignUpNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddGameScreen1 from '../Screens/Authenticated/Main App/Add Game/AddGameScreen1';
import AddGameScreen2 from '../Screens/Authenticated/Main App/Add Game/AddGameScreen2';
import AddGameScreen3 from '../Screens/Authenticated/Main App/Add Game/AddGameScreen3';

const Stack = createNativeStackNavigator();

const AddGameNavigator = () => {

  return (
    <Stack.Navigator
        initialRouteName="Add Game 1"
        screenOptions={{
          headerShown:false
        }}
    >
        <Stack.Screen 
            name="Add Game 1" 
            component={AddGameScreen1}
        />
        <Stack.Screen 
            name="Add Game 2" 
            component={AddGameScreen2}
        />
        <Stack.Screen 
            name="Add Game 3" 
            component={AddGameScreen3}
      />
    </Stack.Navigator>
  );
};

export default AddGameNavigator;