import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import API_URL from '../../../config'
import { useAuth } from '../../../authcontext/authcontext';

export default function DeleteAccountScreen({ navigation }) {

  const {onLogout} = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`${API_URL}/account/delete-account`);
      console.log(response)
      if (response.status === 200) {
        onLogout()
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'There was a problem deleting your account. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your account will be immediately deactivated and deleted. At this time, we can't restore accounts if it was accidentally deleted so please be careful when on this page.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete your account</Text>
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
    backgroundColor:'white'
  },
  text: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 8,
    width: '90%',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
