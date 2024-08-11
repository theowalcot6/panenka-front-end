import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function AddGameScreen3({ route }) {

  return (
    <View style={styles.container}>
      <Text>
        Add Game 3
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 20,
  }
});
