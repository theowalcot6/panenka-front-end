import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../../../config';

export default function SignUpPassword({ navigation, route }) {
  const { email, firstname, secondname } = route.params || ['','',''];
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [hello, setHello] = useState('')

  const handleSignUp = async () => {

    if (password !== confirmpassword) {
      setHello('Not same password')
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        email,
        password,
        confirmpassword,
        firstname,
        secondname, // Assuming secondname is actually the lastname
      });

      if (response.data.message === 'User created successfully') {
        setHello('Smashed it')
        navigation.getParent().navigate('Login', {message: 'Sign up successful. Please log in'})
      } else {
        setHello('error1')
      }
    } catch (error) {
        setHello('error2')
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        onChangeText={(text) => setConfirmPassword(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={confirmpassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.nextbutton}>
        <Text style={styles.nexttext}>
          Sign Up
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
