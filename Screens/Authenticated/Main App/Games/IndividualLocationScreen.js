import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import API_URL from '../../../../config';
import GameCard from '../../../../Components/GameCard';
import Constants from 'expo-constants';
import moment from 'moment';

export default function IndividualLocationScreen({ navigation, route }) {
  const { location } = route.params;
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${API_URL}/games/details`, {
          params: { ids: location.gameIds.join(',') }
        });
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, [location]);

  const groupedGames = games.reduce((acc, game) => {
    const gameDate = moment(game.date, 'M/D/YYYY').format('DD/MM/YYYY');
    if (!acc[gameDate]) acc[gameDate] = [];
    acc[gameDate].push(game);
    return acc;
  }, {});

  console.log(groupedGames)

  return (
    <ScrollView style={styles.container}>
        <Text>{location.location}</Text>
      {Object.keys(groupedGames).map(date => (
        <View key={date} style={styles.dateGroup}>
          <Text style={styles.dateText}>{date}</Text>
          {groupedGames[date].map((game, index) => (
            <GameCard key={index} {...game} navigation={navigation}/>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: Platform.OS === 'web' ? 40 : 40 + Constants.statusBarHeight,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  gameText: {
    fontSize: 16,
    color: '#555',
  },
  playerText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
});
