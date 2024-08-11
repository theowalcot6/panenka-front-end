import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to import the icons from the correct library
import { useAuth } from '../../authcontext/authcontext';

export default function LogIn({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { message } = route.params || {};
  const {onLogin} = useAuth();

  const login = async () => {
    const result = await onLogin(email, password);

    console.log('loginresult',result)
  
    if (result && result.error) {
      if (result.status === 401) {
        // Unauthorized (401) error
        alert('Invalid email or password. Please try again.');
      } else if (result.status === 500) {
        // Internal Server Error (500) error
        alert('Something went wrong on our end. Please try again later.');
      } else {
        // Handle other error statuses here
        alert('An error occurred. Please try again.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={message && styles.signupmessage}>{message}</Text>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#9A9A9A" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          placeholderTextColor="#9A9A9A"
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#9A9A9A" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          placeholderTextColor="#9A9A9A"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.signinbutton} onPress={login}>
        <Text style={styles.signintext}>
          Sign in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('ForgotPasswordNavigator')}}>
        <Text style={styles.forgottext}>
          Did you forget your password?
        </Text>
      </TouchableOpacity>
      <View style={styles.signupcontainer}>
        <Text style={styles.terms}>Not a Panenka yet?</Text>
        <TouchableOpacity style={styles.signupbutton} onPress={() => {navigation.navigate('SignUpNavigator')}}>
          <Text style={styles.signuptext}>
            Create a free account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight:'600'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '80%',
    borderColor: 'rgba(108, 122, 137, 0.4)',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EBEBEB',
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  signinbutton : {
    backgroundColor:'#FC6D2A',
    padding:12,
    width:'80%',
    borderRadius:8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signintext : {
    color:'white',
    fontSize:18,
    fontWeight:'600'
  },
  signupbutton : {
    backgroundColor:'transparent',
    padding:12,
    width:'80%',
    borderRadius:8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#333333',
    borderWidth:2
  },
  signuptext : {
    color:'#333333',
    fontSize:18,
    fontWeight:'600'
  },
  forgottext : {
    fontSize:16,
    color:'#333333',
    marginTop:20,
    textDecorationLine:'underline'
  },
  terms : {
    color:'#333333',
    fontSize:16,
    marginBottom:4
  },
  signupcontainer : {
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40
  },
  signupmessage: {
    fontSize:16,
    backgroundColor: '#DFF2BF', // light green background
    color: '#4F8A10', // dark green text
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
    width: '90%',
    position: 'absolute',
    top:30,
  },
});
