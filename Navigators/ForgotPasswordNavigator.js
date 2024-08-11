// SignUpNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordScreen from '../Screens/Non-Authenticated/ForgotPassword/ForgotPassword';
import ForgotPasswordVerificationScreen from '../Screens/Non-Authenticated/ForgotPassword/ForgotPasswordVerification'
import ForgotPasswordPasswordScreen from '../Screens/Non-Authenticated/ForgotPassword/ForgotPasswordConfirm'

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const ForgotPasswordNavigator = () => {

  return (
    <Stack.Navigator
        initialRouteName="ForgotPassword"
        screenOptions={{
          headerBackTitle: '', // This removes the back title globally
          title:'',
          headerTransparent: true,
          headerTintColor: 'black', 
        }}
    >
        <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPasswordScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              )
            })}
        />
        <Stack.Screen 
            name="ForgotPasswordVerification" 
            component={ForgotPasswordVerificationScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              ),
            })}
        />
        <Stack.Screen 
            name="ForgotPasswordPassword" 
            component={ForgotPasswordPasswordScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              ),
            })}
        />
    </Stack.Navigator>
  );
};

export default ForgotPasswordNavigator;