import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import DatePicker from '../../../Components/DatePicker';
import GameCard from '../../../Components/GameCard';
import moment from 'moment';
import FilterModal from '../../../Components/FilterModal';
import { FilterContext } from '../../../appcontexts/FilterContext';
import Constants from 'expo-constants';
import API_URL from '../../../config';
import { useFocusEffect } from '@react-navigation/native';

export default function FindScreen({ navigation, filterVisible, toggleFilterModal }) {
  const { filters } = useContext(FilterContext);
  const [filteredGames, setFilteredGames] = useState([]);
  const [allGames, setAllGames] = useState([]);

  const applyFilters = () => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
  
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in kilometers
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };
  
    let filtered = allGames;
  
    if (filters.activeDay) {
      filtered = filtered.filter(game => {
        const gameDate = moment(game.date, 'D/M/YYYY').format('M/D/YYYY');
        return gameDate === filters.activeDay;
      });
    }
    if (filters.gender && filters.gender !== 'All') {
      filtered = filtered.filter(game => game.gender === filters.gender);
    }
    if (filters.radius && filters.location && filters.location.longitude && filters.location.latitude) {
      filtered = filtered.filter(game => {
        const distance = calculateDistance(
          filters.location.latitude, 
          filters.location.longitude, 
          game.latitude, 
          game.longitude
        );
        return distance <= filters.radius;
      });
    }
    if (filters.gameType) {
      filtered = filtered.filter(game => game.a_side === filters.gameType);
    }
  
    setFilteredGames(filtered);
  };

  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_URL}/games/future`);
      const data = await response.json();
      setAllGames(data);
      setFilteredGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      fetchGames();
    }, [])
  );

  useEffect(() => {
    applyFilters();
  }, [filters, allGames]);

  return (
    <View style={styles.container}>
      <DatePicker/>
      <ScrollView 
        contentContainerStyle={styles.gamecardcontainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <GameCard key={index} {...game} navigation={navigation} />
          ))
        ) : (
          <Text>No games today</Text>
        )}
      </ScrollView>
      <FilterModal
        visible={filterVisible}
        onClose={toggleFilterModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'web' ? 80 : 80 + Constants.statusBarHeight,
    width: '100%',
    paddingHorizontal: 15,
    zIndex: -1,
    marginBottom:10
  },
  gamecardcontainer: {
    gap: 10,
  },
});
