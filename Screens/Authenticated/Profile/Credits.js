import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import API_URL from '../../../config'
import axios from 'axios'

export default function CreditsScreen() {
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/payments/credits`)
          .then(response => {
            setCredits(response.data.credit_amount);
          })
          .catch(error => {
            console.error('Error fetching credits:', error);
          });
      }, []);

  return (
    <View style={styles.container}>
        <Text>You'll be paid credits if a game cancels or you leave a game within the refund window. Reach out to me@panenka.com if you'd like a refund</Text>
        <Text>£{credits}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:0,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:10000,
    backgroundColor: 'white'
  }
});
