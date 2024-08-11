import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const Past = () => {
  const [pastGames, setPastGames] = useState([]);

  useEffect(() => {
    const fetchPastGames = async () => {
      try {
        const response = await axios.get('http://your-api-url/games/past');
        setPastGames(response.data);
      } catch (error) {
        console.error('Error fetching past games:', error);
      }
    };

    fetchPastGames();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Past</Text>
      <FlatList
        data={pastGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.gameContainer}>
            <Text>{item.title}</Text>
            <Text>{item.date}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  gameContainer: {
    padding: 10,
  },
});

export default Past;


