import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function Payment({ submissionData, setSubmissionData }) {
  const [takeHome, setTakeHome] = useState((submissionData.Payment * 0.86).toFixed(2))
  const [takeHomeFull, setTakeHomeFull] = useState((takeHome * parseInt(submissionData.Settings.gameType, 10) * 2).toFixed(2))

  const handlePaymentSelect = (amount) => {
    if (!amount) {
      setSubmissionData(prevData => ({
        ...prevData,
        Payment: ''
      }))
    }
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      setSubmissionData(prevData => ({
        ...prevData,
        Payment: { ...prevData.Payment, cost: amount }
      }));

      const gameTypeNumber = parseInt(submissionData.Settings.gameType, 10) || 1; // Assuming the game type represents a number of players
      const calculatedTakeHome = (numericAmount * 0.86).toFixed(2)
      const calculatedTakeHomeFull = (calculatedTakeHome * gameTypeNumber * 2).toFixed(2)

      setTakeHome(calculatedTakeHome);
      setTakeHomeFull(calculatedTakeHomeFull);
    }
  };

  const handleRefundSelect = (hour) => {
    const numericAmount = parseFloat(hour);
    if (!isNaN(numericAmount)) {
      setSubmissionData(prevData => ({
        ...prevData,
        Payment: { ...prevData.Payment, refund_hour: hour }
      }));
  }}

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price per player</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={submissionData.Payment.cost}
        onChangeText={(amount) => handlePaymentSelect(amount)}
        inputMode='numeric'
      />
      {submissionData.Payment.cost && (
        <Text style={styles.paytext}>
          You will be paid <Text style={styles.boldText}>AU${takeHome}</Text> per player, <Text style={styles.boldText}>AU${takeHomeFull}</Text> overall when paid out
        </Text>
      )}
      <Text style={styles.label}>Time before game where user can receive a full refund</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={submissionData.Payment.refund_hour}
        onChangeText={(amount) => handleRefundSelect(amount)}
        inputMode='numeric'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 12,
    width: '100%'
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    marginBottom: 12,
    fontSize:16,
    color:'#333333',
    backgroundColor:'#eee',
  },
  label: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  paytext: {
    fontSize:15,
    color:'#333333',
    marginBottom:30
  },
  boldText: {
    fontWeight: '700',
  }
});