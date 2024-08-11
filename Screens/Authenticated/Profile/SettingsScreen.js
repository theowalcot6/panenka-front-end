import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SettingsScreen() {
  

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:10000
  }
});
