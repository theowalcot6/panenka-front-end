import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';
import Where from '../../../../Components/AddGame.js/Where';
import When from '../../../../Components/AddGame.js/When';
import Settings from '../../../../Components/AddGame.js/Settings';
import Payment from '../../../../Components/AddGame.js/Payment';
import API_URL from '../../../../config';
import { FilterContext } from '../../../../appcontexts/FilterContext'

export default function AddGameScreen2({ navigation }) {
  const [activeTab, setActiveTab] = useState('Where');
  const [shiftPercentage, setShiftPercentage] = useState(0.31);
  const links = ['Where', 'When', 'Settings', 'Payment'];
  const { updateFilter } = useContext(FilterContext);
  const underlineWidth = useRef(new Animated.Value(0)).current;
  const underlineLeft = useRef(new Animated.Value(0)).current;
  const [submissionData, setSubmissionData] = useState({
    Where: {
      address: {
        lng: '',
        lat: ''
      },
        name: ''
      },
    When: '',
    Settings: {
      title: '',
      description: '',
      gameType: '',
      gender: 'Mixed'
    },
    Payment: {
      cost: '',
      refund_hour: ''
  }
  });
  const tabRefs = useRef([]);
  tabRefs.current = [];

  useEffect(() => {
    let shiftValue;
    if (activeTab === 'Payment') {
      shiftValue = 0.25;
    } else if (activeTab === 'Settings') {
      shiftValue = 0.26;
    } else if (activeTab === 'When') {
      shiftValue = 0.32;
    } else {
      shiftValue = 0.31;
    }
    setShiftPercentage(shiftValue);

    const activeIndex = links.indexOf(activeTab);
    if (tabRefs.current[activeIndex]) {
      tabRefs.current[activeIndex].measure((fx, fy, width, height, px) => {
        const shiftAmount = width * shiftValue;
        Animated.timing(underlineWidth, {
          toValue: width,
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(underlineLeft, {
          toValue: px - shiftAmount,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [activeTab, shiftPercentage]);

  const handleTabPress = (link) => {
    setActiveTab(link);
  };

  const addRef = (ref) => {
    if (ref && !tabRefs.current.includes(ref)) {
      tabRefs.current.push(ref);
    }
  };

  const handleNextPress = () => {
    const currentIndex = links.indexOf(activeTab);
    if (currentIndex < links.length - 1) {
      setActiveTab(links[currentIndex + 1]);
    } else {
      console.log('completed');
    }
  };

  const isNextButtonActive = () => {
    const { Where, When, Settings, Payment } = submissionData;
    if (activeTab === 'Where') {
      return Where.address.lng && Where.address.lat && Where.name;
    }
    if (activeTab === 'When') {
      return When !== '';
    }
    if (activeTab === 'Settings') {
      return Settings.title && Settings.description && Settings.gameType;
    }
    if (activeTab === 'Payment') {
      return Payment !== '';
    }
    return false;
  };

  const handleAddGame = async () => {
    const { Where, When, Settings, Payment } = submissionData;
    const gameData = {
      venue: Where.name,
      time: When.toLocaleTimeString(),
      date: When.toLocaleDateString(),
      gender: Settings.gender,
      privacy: 'open', // or 'closed' based on your logic
      spots: '0/10', // or your logic to calculate spots
      a_side: Settings.gameType, // Adjust this based on your logic
      currency: 'AU$',
      cost: Payment.cost,
      refund_hour: Payment.refund_hour, // Assuming Payment contains the cost
      title: Settings.title,
      description: Settings.description,
      longitude: Where.address.lng,
      latitude: Where.address.lat
    };

    try {
      const response = await axios.post(`${API_URL}/games/add`, gameData);
      if (response.status === 201) {
        console.log('Game added successfully', response.data);
        updateFilter({ activeDay: '', gender: 'All', radius: 3, gameType: null, location: null })
        navigation.navigate('Join');
        // Navigate to the desired screen or show a success message
      } else {
        console.error('Failed to add game', response.data);
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepcontainer}>
        {links.map((link, index) => (
          <TouchableOpacity
            style={styles.stepbutton}
            onPress={() => handleTabPress(link)}
            key={index}
            ref={addRef}
          >
            <Text style={link === activeTab ? styles.activesteptext : styles.steptext}>
              {link}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.underline,
            {
              width: underlineWidth,
              left: underlineLeft,
              zIndex:-1
            },
          ]}
        />
      </View>
      <View style={styles.breaker}></View>
      {activeTab === 'Where' && <Where submissionData={submissionData} setSubmissionData={setSubmissionData}/>}
      {activeTab === 'When' && <When submissionData={submissionData} setSubmissionData={setSubmissionData}/>}
      {activeTab === 'Settings' && <Settings submissionData={submissionData} setSubmissionData={setSubmissionData}/>}
      {activeTab === 'Payment' && <Payment submissionData={submissionData} setSubmissionData={setSubmissionData}/>}
      <TouchableOpacity
       style={isNextButtonActive() ? styles.activenextbutton : styles.nextbutton}
       disabled={!isNextButtonActive()}
       onPress={activeTab === 'Payment' ? handleAddGame : handleNextPress}
       >
        <Text style={isNextButtonActive() != '' ? styles.activenexttext : styles.nexttext}>
          {activeTab === 'Payment' ? 'Add game' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor:'white',

  },
  stepcontainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    position: 'relative', // Ensure the underline is positioned relative to the container
    paddingTop: 20,

  },
  stepbutton: {
    padding: 8,
  },
  activesteptext: {
    color: '#333333',
    fontWeight: '600',
    fontSize:15
  },
  steptext: {
    color: 'grey',
    fontWeight: '600',
    fontSize:15
  },
  underline: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#333333',
    bottom: 0, // Adjust this to place the underline correctly beneath the text
  },
  activenextbutton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width:'100%',
    marginBottom:20
  },
  activenexttext: {
    fontSize: 18,
    color: '#ffffff'
  },
  nextbutton: {
    marginTop: 20,
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width:'100%',
    marginBottom:20
  },
  nexttext: {
    fontSize: 18,
    color: '#333333'
  },
  breaker: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
  },
});
