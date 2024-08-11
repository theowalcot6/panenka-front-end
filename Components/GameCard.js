import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment';

const { width: screenWidth } = Dimensions.get('window');

export default function GameCard({ title, time, date, owner, a_side, cost, longitude, latitude, venue, gender, description, navigation, users, id }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('Individual Game', { title, longitude, latitude, owner, time, date, venue, cost, gender, description, a_side, users, id }) }}>
      <Text style={styles.header}>
        {title}
      </Text>
      <Text style={styles.time}>
        {time} - {moment(date, 'M/D/YYYY').format('DD/MM/YYYY')}
      </Text>
      <View style={styles.side_spots}>
        <Text style={styles.side}>{a_side} a side by {owner}</Text>
        <Text style={styles.spots}>{users.length}/{2*a_side}</Text>
      </View>
      <View style={styles.line} />
      <Text style={styles.cost}>${cost}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: 180,
    backgroundColor: 'white',
    borderRadius: 8,
    width: screenWidth - 30,
    padding: 20,
    marginTop:5,
  },
  header : { 
    fontSize:17,
    fontWeight:'600'
  },
  time : {
    fontSize:15,
    fontWeight:'400'
  },
  side_spots : {
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    fontSize:15
  },
  side : {
    fontSize:15
  },
  spots : {
    fontSize:14,
    backgroundColor:'#EEEEEE',
    paddingHorizontal:10,
    paddingVertical: 5,
    borderRadius:25,
    color:'#333333'
  },
  cost : {
    width:'100%',
    textAlign:'right',
    fontSize:16,
    fontWeight:'600'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
  },
});
