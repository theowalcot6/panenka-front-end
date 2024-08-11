import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'
import API_URL from '../../../../config'


export default function UpdateEmailPassword({navigation}) {
  const [password, setPassword] = useState('')

  const checkPassword = async () => {
    try {
      const response = await axios.post(`${API_URL}/account/check-password`,{ password });

      if (response.status === 200) {
        navigation.navigate('UpdateEmailNewEmail')
      }
    } catch (error) {
      Alert.alert('Error checking password:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please confirm your password before continuing</Text>
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
      <TouchableOpacity onPress={checkPassword} style={styles.button}>
        <Text style={styles.buttonText}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    padding:'5%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    width: '100%',
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
  button : {
    backgroundColor:'#FC6D2A',
    padding:12,
    width:'100%',
    borderRadius:8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText : {
    color:'white',
    fontSize:18,
    fontWeight:'600'
  },
  text : {
    fontSize:16,
    color:'#333333',
    fontWeight:'500',
    marginBottom: 20
  }
});
