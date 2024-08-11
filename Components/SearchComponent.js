import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FilterContext } from '../appcontexts/FilterContext';

const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your actual API key

const { width: screenWidth } = Dimensions.get('window');
const searchWidth = screenWidth - 20 - 28 - 8 - 28 - 8 - 8 - 28 - 8 - 8 - 20;
const leftAlignment = (20 + 28 + 8 + 28 + 8 + searchWidth) - screenWidth;
console.log(leftAlignment);

export default function SearchComponent() {
  const { updateFilter } = useContext(FilterContext);

  const handlePlaceSelect = (data, details) => {
    if (details) {
      const { lat, lng } = details.geometry.location;
      updateFilter({
        location: {
          latitude: lat,
          longitude: lng
        }
      });
    } else {
      console.error('Error: Place details are undefined', { data, details });
      // You can also show a user-friendly message or take other actions here
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handlePlaceSelect}
        fetchDetails={true} // Enable fetching of place details
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en'
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          predefinedPlacesDescription: styles.predefinedPlacesDescription,
          listView: styles.listView,
          row: styles.row,
        }}
        requestUrl={{
          url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  textInput: {
    width: searchWidth,
    height: 44,
    color: '#5d5d5d',
    fontSize: 16,
    marginBottom: 0,
    zIndex: 1000,
  },
  textInputContainer: {
    width: searchWidth,
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
    zIndex: 1000,
  },
  listView: {
    width: screenWidth,
    position: 'absolute',
    left: leftAlignment,
    top: 38,
    zIndex: 1000,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});


