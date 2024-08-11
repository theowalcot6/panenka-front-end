import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../../../config';

export default function ForgotPasswordConfirm({ navigation, route }) {
  const { email, code } = route.params || ['','',''];
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [hello, setHello] = useState('')

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setHello('Not same password');
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/users/forgot-change-password`, {
        email,
        code,
        newPassword,
        confirmNewPassword,
      });
  
      if (response.data.message === 'Password has been reset successfully') {
        setHello('Smashed it');
        navigation.getParent().navigate('Login', {
          message: 'Password changed correctly. Please log in with your new password'
        });
      } else {
        setHello('An error occurred while changing the password.');
      }
    } catch (error) {
      setHello('An error occurred while changing the password.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setNewPassword(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        onChangeText={(text) => setConfirmNewPassword(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={confirmNewPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleChangePassword} style={styles.nextbutton}>
        <Text style={styles.nexttext}>
          Change password
        </Text>
      </TouchableOpacity>
      <Text>{hello}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    backgroundColor: 'white'
  },
  input: {
    height: 54,
    width: '100%',
    borderColor: 'rgba(108, 122, 137,0.4)',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EBEBEB',
    borderRadius: 8,
    fontSize: 16,
    color: '#333333',
  },
  nextbutton: {
    backgroundColor: '#FC6D2A',
    padding: 12,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nexttext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
});
