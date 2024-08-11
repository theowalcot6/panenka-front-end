import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../config';

const Attending = ({ navigation }) => {
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      try {
        const response = await axios.get(`${API_URL}/games/upcoming-games`);
        setUpcomingGames(response.data);
      } catch (error) {
        console.error('Error fetching upcoming games:', error);
      }
    };

    fetchUpcomingGames();
  }, []);

  return (
    <View style={styles.container}>
      {upcomingGames.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={styles.gameContainer}
          onPress={() => navigation.navigate('Individual Game', { id: game.id })}
        >
          <View>
            <Text style={styles.bolding}>{game.time}</Text>
            <Text style={styles.bolding}>{game.date}</Text>
          </View>
          <View>
            <Text style={styles.bolding}>{game.title}</Text>
            <Text style={styles.desc}>{game.a_side} by {game.host}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {upcomingGames.length === 0 && (
        <View style={styles.innercontainer}>
          <Text style={styles.nogamedesc}>No games booked</Text>
          <TouchableOpacity style={styles.findgamebutton} onPress={() => navigation.navigate('Join')}>
            <Text style={styles.findgamebuttontext}>Find games</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  innercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  gameContainer: {
    padding: 10,
    paddingLeft: 24,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    alignItems: 'center',
    gap: 20,
  },
  bolding: {
    fontWeight: '600',
    color: '#333333',
    fontSize: 15,
  },
  desc: {
    fontSize: 15,
    color: '#333333',
  },
  nogamedesc: {
    fontSize: 15,
  },
  findgamebutton: {
    backgroundColor: '#333333',
    width: '40%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findgamebuttontext: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Attending;


