import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import API_URL from '../../../config';

export default function UpdatePasswordScreen({ navigation, route }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/account/change-password`,
        { oldPassword, newPassword, newPasswordConfirmed }
      );

      if (response.status === 200) {
        navigation.navigate('Profile', {message: "Password successfully changed. Use your new password next time you log in"})
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Old password"
        onChangeText={(text) => setOldPassword(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={oldPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New password"
        onChangeText={(text) => setNewPassword(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        onChangeText={(text) => setNewPasswordConfirmed(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={newPasswordConfirmed}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleChangePassword} style={styles.nextbutton}>
        <Text style={styles.nexttext}>
          Change password
        </Text>
      </TouchableOpacity>
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
