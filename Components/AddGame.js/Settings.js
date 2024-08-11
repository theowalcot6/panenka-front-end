import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import RadioButtons from '../RadioButtons'


export default function Settings({ submissionData, setSubmissionData }) {
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: '5 a side', value: 5 },
    { label: '6 a side', value: 6 },
    { label: '7 a side', value: 7 },
    { label: '8 a side', value: 8 },
    { label: '9 a side', value: 9 },
    { label: '10 a side', value: 10 },
    { label: '11 a side', value: 11 }
  ];

  const genderOptions = [
    'Mixed', 'Male', 'Female'
  ]

  const handleTitleSelect = (text) => {
    setSubmissionData(prevData => ({
      ...prevData,
      Settings: { ...prevData.Settings, title: text }
    }));
  };

  const handleDescriptionSelect = (text) => {
    setSubmissionData(prevData => ({
      ...prevData,
      Settings: { ...prevData.Settings, description: text }
    }));
  };

  const handleGameTypeSelect = (type) => {
    setSubmissionData(prevData => ({
      ...prevData,
      Settings: { ...prevData.Settings, gameType: type }
    }));
  };

  const handleGenderSelect = (gender) => {
    setSubmissionData(prevData => ({
      ...prevData,
      Settings: { ...prevData.Settings, gender: gender }
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Give your game a short title"
        value={submissionData.Settings.title}
        onChangeText={(text) => handleTitleSelect(text)}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Let people know more about your game, meeting points, level of the game..."
        value={submissionData.Settings.description}
        onChangeText={(text) => handleDescriptionSelect(text)}
        multiline
      />
      <Text style={styles.label}>Game Type</Text>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Game Type"
        value={submissionData.Settings.gameType}
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          handleGameTypeSelect(item.value);
          setIsFocus(false);
        }}
      />
      <Text style={styles.label}>Gender</Text>
      <RadioButtons options={genderOptions} value={submissionData.Settings.gender} setValue={handleGenderSelect}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 18,
    width:'100%'
  },
  button: {
    padding: 10,
    backgroundColor: '#4CAF50',
    color: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
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
    backgroundColor:'#eee'
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 12,
    backgroundColor:'#eee'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333333',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top', // Ensure the text starts at the top
  },
  label: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
});
