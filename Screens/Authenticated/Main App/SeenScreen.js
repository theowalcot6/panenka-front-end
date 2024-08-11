import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../../../config';
import Constants from 'expo-constants';
import LocationFilterModal from '../../../Components/LocationFilterModal';
import { LocationFilterContext } from '../../../appcontexts/LocationFilterContext';
import Icons from 'react-native-vector-icons/Ionicons';

const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => x * Math.PI / 180;
  const R = 6371; // Earth radius in kilometers
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
    Math.cos(toRad(coords1.latitude)) * Math.cos(toRad(coords2.latitude)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export default function SeenScreen({ filterVisible, toggleFilterModal, navigation }) {
  const { locationfilters } = useContext(LocationFilterContext);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/games/unique-locations`)
      .then(response => {
        const filteredLocations = response.data.filter(location => {
          const distance = locationfilters.location 
            ? haversineDistance(locationfilters.location, { latitude: location.latitude, longitude: location.longitude }) 
            : null;
          return distance !== null && distance <= locationfilters.radius;
        });
        setLocations(filteredLocations);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, [locationfilters]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {locations.map((location, index) => {
          const distance = locationfilters.location 
            ? haversineDistance(locationfilters.location, { latitude: location.latitude, longitude: location.longitude }) 
            : null;
          return (
            <TouchableOpacity key={index} style={styles.locationContainer} onPress={() => navigation.navigate('Individual Location',{location})}>
              <Text style={styles.locationText}>{location.location}</Text>
              {distance !== null && <View style={styles.innerLocationContainer}><Icons name='location-outline'/><Text style={styles.coordsText}>{distance.toFixed(2)} km</Text></View>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <LocationFilterModal
        visible={filterVisible}
        onClose={toggleFilterModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    zIndex: -1,
    marginTop: Platform.OS === 'web' ? 80 : 80 + Constants.statusBarHeight,
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
  },
  locationContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameIdsText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  coordsText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  innerLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
