import React, { useRef, useEffect, useState, useContext } from 'react';
import { Modal, View, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import RadioButtons from './RadioButtons';
import { LocationFilterContext } from '../appcontexts/LocationFilterContext';

const LocationFilterModal = ({ visible, onClose }) => {
  const { locationfilters, updateLocationFilter } = useContext(LocationFilterContext);

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const slideInStyle = {
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  const onApply = () => {
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContainer, slideInStyle]}>
              <Text style={styles.header}>Filters</Text>
              <Text style={styles.label}>Radius</Text>
              <RadioButtons
                options={['1km', '3km', '5km']}
                setFunction={(value) => updateLocationFilter({ radius: value })}
                start={locationfilters.radius === '1km' ? 0 : locationfilters.radius === '3km' ? 1 : 2}
              />
              <View style={styles.buttoncontainer}>
                <TouchableOpacity onPress={onApply} style={styles.applybutton}>
                  <Text style={styles.applytext}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resetbutton}
                  onPress={() => updateLocationFilter({ activeDay: '', gender: 'All', radius: '3km', gameType: null })}
                >
                  <Text style={styles.resettext}>Reset</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: '100%',
    width: '86%',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
  },
  applybutton: {
    backgroundColor: '#333333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  applytext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  resetbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  resettext: {
    color: '#333333',
    fontSize: 16,
  },
  buttoncontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 20,
    marginBottom: 10,
  }
});

export default LocationFilterModal;


