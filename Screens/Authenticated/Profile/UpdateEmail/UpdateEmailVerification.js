import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../../../../config';

export default function UpdateEmailVerification({ navigation, route }) {
  const [emailError, setEmailError] = useState(null);
  const { email } = route.params;
  const [code, setCode] = useState('');

  const handleNext = async () => {
    setEmailError(null);
    console.log(code)
    try {
      const response = await axios.post(`${API_URL}/users/verify-code-change-email`, {
        email: email,
        code: code,
      });

      if (response.status === 200) {
        navigation.navigate('Profile', {message: 'Email changed successfully. Log in with your new email next time.'});
      } else if (response.status === 404) {
        setEmailError('Incorrect code');
      } else {
        setEmailError('Failed to verify code. Please try again.');
      }
    } catch (error) {
      setEmailError('An error occurred while verifying the code. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter the code we sent to your email. Please check your junk if you can't find it.</Text>
      <TextInput
        style={styles.input}
        placeholder="Code"
        onChangeText={(text) => setCode(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={code}
      />
      <TouchableOpacity onPress={handleNext} style={styles.codebutton}>
        <Text style={styles.codetext}>
          Next
        </Text>
      </TouchableOpacity>
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}
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
  header: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 20
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
  codebutton: {
    backgroundColor: '#FC6D2A',
    padding: 12,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  codetext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 20
  }
});
