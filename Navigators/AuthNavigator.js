// AuthNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordNavigator from './ForgotPasswordNavigator';
import SignUpNavigator from './SignUpNavigator';

import LoginScreen from '../Screens/Non-Authenticated/LogIn.js';
import LandingScreen from '../Screens/Non-Authenticated/Landing'

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  return (
    <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerBackTitle: null, // This removes the back title globally
          title:'',
          headerTransparent: true,
        }}
    >
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          headerShown:false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#333333" />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen 
        name="SignUpNavigator" 
        component={SignUpNavigator}
        options={{
          headerShown:false,
          }} 
      />
      <Stack.Screen 
        name="ForgotPasswordNavigator" 
        component={ForgotPasswordNavigator}
        options={{
          headerShown:false,
          }} 
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;