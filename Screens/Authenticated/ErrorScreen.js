import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ErrorScreen() {
  

  return (
    <View style={styles.container}>
      <Text>Error</Text>
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
