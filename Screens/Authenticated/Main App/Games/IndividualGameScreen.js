import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Linking, Dimensions, Modal } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { StripeProvider } from '@stripe/stripe-react-native';
import Join from '../../../../Components/Join';
import API_URL from '../../../../config';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD1z1xv9ukniUz8ed0aEip9srpS62VyyN4';

const { width: screenWidth } = Dimensions.get('window');
const containerWidth = screenWidth - 40

export default function IndividualGameScreen({ navigation, route }) {
  const { title, longitude, latitude, owner, time, date, venue, cost, gender, description, a_side, id } = route.params;

  const [joined, setJoined] = useState(false);
  const [mine, setMine] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paid, setPaid] = useState(false)

  const [refundModalVisible, setRefundModalVisible] = useState(false)
  const [refundInfo, setRefundInfo] = useState(null)

  // Generate the Google Maps Static API URL
  const mapUrl = title ? 
    `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:G%7C${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}` : 
    null;

  const openLocationInMaps = () => {
    const url = `http://maps.google.com/maps?daddr=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    const checkUserJoined = async () => {
      try {
        const response = await axios.post(`${API_URL}/games/check-user-in-game`, {gameid: id});
        if (response.status === 200) {
          setJoined(response.data.inGame);
          setMine(response.data.isHost)
        } else {
          setJoined(false);
        }
      } catch (error) {
        setJoined(false);
      }
    };
  
    checkUserJoined();
  }, [id, paid]);

  const handleCheckLeave = async () => {
    try {
      const response = await axios.post(`${API_URL}/games/check-refund`, {
        id
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        const message = response.data.message;
        if (message === 'Refund will be given') {
          setRefundInfo("You will be given a refund as you've left the game within the refund window");
          setRefundModalVisible(true);
        } else {
          setRefundInfo("You won't receive a refund as you've past the refund window for this game");
          setRefundModalVisible(true);
        }
      }
    } catch (error) {
      console.log('Failed to check refund status:', error);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await axios.post(`${API_URL}/games/remove`, {
        id
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        setJoined(false);
      } else {
        setJoined(true);
      }
    } catch (error) {
      console.error('Error removing user from game:', error);
      setJoined(true);
    }
    setRefundModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(`${API_URL}/games/delete`, {
        gameId: id
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        setModalVisible(false);
        navigation.goBack(); // Navigate back after successful deletion
      } 
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  useEffect(() => {
    console.log(refundModalVisible)
  }, [refundModalVisible])

  return (
    <StripeProvider
      publishableKey="pk_test_51PXh1tRq9yr5W7F1O8fYY0Stj771wYfh3PyHZXM0vI080pcHQPgUYOQoSFCb2De4rbaDpUZziZmekgu1ssVXGwLi00JijLQDQp"
      urlScheme="Panenka.au" // required for 3D Secure and bank redirects
      merchantIdentifier="Panenka.au" // required for Apple Pay
    >
      <Modal
              animationType="slide"
              transparent={true}
              visible={refundModalVisible}
              onRequestClose={() => setRefundModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{refundInfo}</Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setRefundModalVisible(false)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonDelete]}
                        onPress={handleRemove}
                      >
                        <Text style={styles.textStyle}>Leave game</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
    <View style={styles.container}>
      {title ? (
        <>
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          {mapUrl && (
            <Image
              style={styles.map}
              source={{ uri: mapUrl }}
            />
          )}
          <View style={styles.keyinfocontainer}>
            <Text style={styles.keyinfotitle}>{title}, {a_side}</Text>
            <Text style={styles.keyinfoowner}>{owner}</Text>
            <View style={styles.breaker}></View>
            <View style={styles.keyinfoinfo}>
              <Icons name='calendar-clear-outline' size={20}/>
              <Text style={styles.keyinfotime}>{date}, {time}</Text>
            </View>
            <TouchableOpacity style={[styles.keyinfoinfo,{justifyContent:'space-between'}]} onPress={openLocationInMaps}>
              <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                <Icons name='location-outline' size={20}/>
                <Text style={styles.keyinfolocation}>{venue}</Text>
              </View>
              <Icons name='chevron-forward' size={16}/>
            </TouchableOpacity>
          </View>
          <View style={styles.secondinfocontainer}>
            <View style={styles.secondinfosection}>
              <Text style={styles.secondinfoheader}>Price</Text>
              <Text style={styles.secondinfoinfo}>
                AU$
                {cost}
              </Text>
            </View>
            <View style={styles.breakerV}></View>
            <View style={styles.secondinfosection}>
              <Text style={styles.secondinfoheader}>Gender</Text>
              <Text style={styles.secondinfoinfo}>
                {gender}
              </Text>
            </View>
            <View style={styles.breakerV}></View>
            <View style={styles.secondinfosection}>
              <Text style={styles.secondinfoheader}>Public</Text>
              <Text style={styles.secondinfoinfo}>
                Open
              </Text>
            </View>
          </View>
          <View style={styles.descriptioncontainer}>
            <Text style={styles.descriptionheader}>Description</Text>
            <Text style={styles.descriptiontext}>{description}</Text>
          </View>
        </ScrollView>
        <View style={styles.joincontainer}>
          { joined ?
          mine ? 
          <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.deletebutton}>
              <Text style={styles.deletebuttontext}>Delete game</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Are you sure you want to delete this game?</Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonDelete]}
                      onPress={handleDelete}
                    >
                      <Text style={styles.textStyle}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
          :
          <>
          <TouchableOpacity onPress={handleCheckLeave}>
            <Text>Leave game</Text>
          </TouchableOpacity>
          </>
          :
          <Join id={id} joined={joined} setPaid={setPaid} />
          }
        </View>
        </>
      ) : (
        <Text style={styles.notFound}>Game not found</Text>
      )}
    </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 200,
  },
  keyinfocontainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: containerWidth,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    gap: 16,
  },
  keyinfotitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  keyinfoowner: {
    color: '#333333',
    fontSize: 16,
  },
  keyinfotime: {
    color: '#333333',
    fontSize: 16,
  },
  keyinfolocation: {
    color: '#333333',
    fontSize: 16,
    width: containerWidth - 100,
  },
  keyinfoinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  breaker: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 6,
  },
  breakerV: {
    height: '100%',
    width: 1,
    backgroundColor: '#EEEEEE',
  },
  secondinfocontainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  secondinfosection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondinfoheader: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 6,
  },
  secondinfoinfo: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  descriptioncontainer: {
    alignItems: 'flex-start',
    width: containerWidth,
    marginTop: 20,
  },
  descriptionheader: {
    textAlign: 'left',
    fontSize: 17,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333333',
  },
  descriptiontext: {
    textAlign: 'left',
    fontSize: 15,
    color: '#333333',
  },
  joincontainer: {
    position: 'absolute',
    height: 80,
    backgroundColor: 'white',
    width: screenWidth,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 18,
    color: 'red',
  },
  deletebutton: {
    backgroundColor:'red',
    width:'86%',
    height:50,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center'
  },
  deletebuttontext: {
    fontSize:16,
    color:'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

