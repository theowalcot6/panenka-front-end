import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../../../config'

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }


  const handleNext = async () => {
    setEmailError(null); 
  
    if (isValidEmail(email)) {
      navigation.navigate('SignUpVerification', { email: email });
      try {
        await axios.post(`${API_URL}/users/request-verification`, {
          email: email
        });
      } catch (error) {
        console.log('Email failed')
      }
    } else {
      setEmailError('Invalid email format. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please enter your email and we'll send you a code</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={email}
      />
      <TouchableOpacity onPress={handleNext} style={styles.codebutton}>
        <Text style={styles.codetext}>
          Request code
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
    padding:'5%',
    backgroundColor: 'white'
  },
  header : {
    fontSize:16,
    color:'#333333',
    fontWeight:'500',
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
  codebutton : {
    backgroundColor:'#FC6D2A',
    padding:12,
    width:'100%',
    borderRadius:8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  codetext : {
    color:'white',
    fontSize:16,
    fontWeight:'600'
  },
  errorText : {
    color:'red',
    fontSize:14,
    marginTop:20
  }
});
