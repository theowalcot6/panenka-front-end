// SignUpNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UpdateEmailPassword from '../Screens/Authenticated/Profile/UpdateEmail/UpdateEmailPassword';
import UpdateEmailNewEmail from '../Screens/Authenticated/Profile/UpdateEmail/UpdateEmailNewEmail';
import UpdateEmailVerification from '../Screens/Authenticated/Profile/UpdateEmail/UpdateEmailVerification';

import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

const EmailUpdateNavigator = () => {

  return (
    <Stack.Navigator
        initialRouteName="UpdateEmailPassword"
        screenOptions={{
          headerShown:false,
        }}
    >
        <Stack.Screen 
            name="UpdateEmailPassword" 
            component={UpdateEmailPassword}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              )
            })}
        />
        <Stack.Screen 
            name="UpdateEmailNewEmail" 
            component={UpdateEmailNewEmail}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              )
            })}
        />
        <Stack.Screen 
            name="UpdateEmailVerification" 
            component={UpdateEmailVerification}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333333" />
                </TouchableOpacity>
              )
            })}
      />
    </Stack.Navigator>
  );
};

export default EmailUpdateNavigator;