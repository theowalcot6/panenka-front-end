// SignUpNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpEmailScreen from '../Screens/Non-Authenticated/SignUp/SignUp';
import SignUpVerificationScreen from '../Screens/Non-Authenticated/SignUp/SignUpVerification';
import SignUpFirstNameScreen from '../Screens/Non-Authenticated/SignUp/SignUpFirstName';
import SignUpSecondNameScreen from '../Screens/Non-Authenticated/SignUp/SignUpSecondName';
import SignUpPasswordScreen from '../Screens/Non-Authenticated/SignUp/SignUpPassword';


import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


const Stack = createNativeStackNavigator();

const SignUpNavigator = () => {

  return (
    <Stack.Navigator
        initialRouteName="SignUpEmail"
        screenOptions={{
          headerBackTitle: '', // Set the text for the back button
          title:'',
          headerTintColor: '#333333', // Set the color of the back button
          headerTransparent: true, // Make the header transparent
        }}
    >
        <Stack.Screen 
            name="SignUpEmail" 
            component={SignUpEmailScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              ),
            })}
            
        />
        <Stack.Screen 
            name="SignUpVerification" 
            component={SignUpVerificationScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              ),
            })}
            
        />
        <Stack.Screen 
            name="SignUpFirstName" 
            component={SignUpFirstNameScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              ),
            })}
            
      />
      <Stack.Screen 
            name="SignUpSecondName" 
            component={SignUpSecondNameScreen}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              ),
            })}
            
      />
      <Stack.Screen 
            name="SignUpPassword" 
            component={SignUpPasswordScreen}
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

export default SignUpNavigator;