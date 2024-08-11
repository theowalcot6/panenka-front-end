import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo2.png'

export default function Landing({navigation}) {
  

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.signinbutton} onPress={() => {navigation.navigate('Login')}}>
          <Text style={styles.signintext}>
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupbutton} onPress={() => {navigation.navigate('SignUpNavigator')}}>
          <Text style={styles.signuptext}>
            Create a free account
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.terms}>By signing up, you agree to our Terms and Conditions Privacy Policy and Cookie Policy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding:50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    gap:28
  },
  logo : {
    width: 260,
    height:260,
    marginRight:4
  },
  buttoncontainer : {
    width:'100%',
    flexDirection:'column',
    alignItems: 'center',
    gap:20
  },
  signinbutton : {
    backgroundColor:'#FC6D2A',
    padding:16,
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
    padding:16,
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
  terms : {
    color:'#333333',
    fontSize:15,
    width:'80%'
  }
});
