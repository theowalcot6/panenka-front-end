import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import API_URL from '../config';  // Ensure this path is correct
import axios from 'axios';

export default function Join({ id, setPaid }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentNeeded, setPaymentNeeded] = useState(false);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await axios.post(`${API_URL}/payments/game-payment`, { id });
      const { paymentIntent, ephemeralKey, customer, paymentNeeded } = response.data;
      setPaymentNeeded(paymentNeeded);
      return { paymentIntent, ephemeralKey, customer };
    } catch (error) {
      console.error('Error fetching payment sheet params:', error.message);
      Alert.alert('Error', 'Failed to fetch payment details. Please try again later.');
      return {};
    }
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
    if (!paymentIntent || !ephemeralKey || !customer) return;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Panenka.au",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    if (!paymentNeeded) {
      joinGame();
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log('Failed to join game');
    } else {
      joinGame();
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const joinGame = async () => {
    try {
      const response = await axios.post(`${API_URL}/games/join`, { id });
      if (response.status === 200) {
        setPaid(true);
      }
    } catch (error) {
      console.log('Failed to join game');
    }
  };

  return (
    <TouchableOpacity style={styles.joinbutton} onPress={openPaymentSheet} disabled={!loading}>
      <Text style={styles.joinbuttontext}>Join</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  joinbutton: {
    height: 50,
    width: '86%',
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinbuttontext: {
    color: 'white',
    fontSize: 16,
  },
});


