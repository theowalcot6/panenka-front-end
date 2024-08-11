import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../../../config';
import Constants from 'expo-constants';
import Attending from '../../../Components/Attending';
import Past from '../../../Components/Past';

export default function HistoryScreen({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const [activeView, setActiveView] = useState('ATTENDING');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(`${API_URL}/account/get-account-info`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const views = ['ATTENDING', 'PAST'];

  // fix key issue in this block?
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        {userInfo ? (
          <>
            <Text style={styles.nameText}>{userInfo.firstname} {userInfo.secondname}</Text>
            <Text style={styles.emailText}>{userInfo.email}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.switchContainer}>
        {views.map((view, index) => (
          <View style={styles.singleswitchcontainer} key={`singleswitch-${index}`}>
          <TouchableOpacity
            style={styles.switch}
            key={`switch-${index}`}
            onPress={() => setActiveView(view)}
          >
            <Text
              style={[
                styles.switchText,
                view === activeView && styles.activeSwitchText
              ]}
              key={`text-${index}`}
            >
              {view}
            </Text>
          </TouchableOpacity>
          {view === activeView && 
          <View
            style={styles.underline}
            key={`underline-${index}`}
          >
          </View>
          }
          </View>
        ))}
      </View>
      {activeView === 'ATTENDING' ? <Attending navigation={navigation}/> : <Past/> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'web' ? 80 : 40 + Constants.statusBarHeight,
    paddingBottom: 40,
    paddingLeft: 20,
  },
  nameText: {
    fontSize: 22,
    color: '#333333',
    fontWeight: '600',
  },
  emailText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '500',
  },
  switchContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  switch: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },
  switchText: {
    fontSize: 15,
  },
  activeSwitchText: {
    fontWeight: 'bold',
  },
  underline: {
    height:2,
    width:'100%',
    backgroundColor:'black'
  },
  singleswitchcontainer: {
    flexDirection:'column',
    width: '50%',
    justifyContent:'space-between'
  }
});

