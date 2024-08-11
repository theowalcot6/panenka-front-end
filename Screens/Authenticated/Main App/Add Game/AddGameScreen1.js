import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import footballsticker from '../../../../assets/Footballsticker.png';

export default function AddGameScreen1({ navigation }) {

  return (
    <View style={styles.container}>
      <Image source={footballsticker} style={styles.image}/>
      <View style={styles.textcontainer}>
      <Text style={styles.text}>
        📒 Ensure you have arranged the pitch reservation directly with the venue. Panenka does not reserve any pitches on your behalf when you post a game.
      </Text>
      <Text style={styles.text}>
        🖋 Each player has to sign up through the app.
      </Text>
      <Text style={styles.text}>
        🔗 Share your game link to make it super simple for people to join.
      </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Game 2')}>
        <Text style={styles.buttonText}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 20,
    marginTop: 60,
    backgroundColor: '#f5f5f5' // Light background color for better contrast
  },
  textcontainer: {
    alignItems:'flex-start'
  },
  image: {
    width: 150,
    height: '40%',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'left',
    marginBottom: 16
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width:'100%'
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  }
});
