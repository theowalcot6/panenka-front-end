import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SignUpFirstName({ navigation, route }) {
  const { email } = route.params;
  const [firstName, setFirstName] = useState('');

  const handleNext = () => {
    navigation.navigate('SignUpSecondName', { email: email, firstname: firstName });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        autoCapitalize="none"
        placeholderTextColor="#9A9A9A"
        value={firstName}
      />
      <TouchableOpacity onPress={handleNext} style={styles.nextbutton}>
        <Text style={styles.nexttext}>
          Next
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
