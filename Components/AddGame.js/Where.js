import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';

const GOOGLE_PLACES_API_KEY = 'AIzaSyD1z1xv9ukniUz8ed0aEip9srpS62VyyN4';

export default function Where({ submissionData, setSubmissionData }) {

  const handlePlaceSelect = (data, details) => {
    const location = {
      address: details.geometry.location,
      name: details.formatted_address
    };
    setSubmissionData(prevData => ({ ...prevData, Where: location}));
  };

  const nullify = () => {
    setSubmissionData(prevData => ({ ...prevData, Where: {
      address: {
        lng: '',
        lat: ''
      },
        name: ''
      } }));
  }


  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a venue"
        onPress={handlePlaceSelect}
        fetchDetails={true} // Enable fetching of place details
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        requestUrl={{
            url:'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            useOnPlatform: 'web',
        }}
      />
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}} onPress={nullify}>
        <Text style={{fontSize:16, color:'#333333'}} >
          {submissionData.Where.name && submissionData.Where.name}
        </Text>
        {submissionData.Where.name && <MaterialIcons name='highlight-remove' color='#333333' size={22}/>}
      </TouchableOpacity>
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
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
