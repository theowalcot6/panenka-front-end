import React, { useRef, useEffect, useState, useContext } from 'react';
import { Modal, View, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import RadioButtons from './RadioButtons';
import { Dropdown } from 'react-native-element-dropdown';
import { FilterContext } from '../appcontexts/FilterContext';

const FilterModal = ({ visible, onClose }) => {
  const [isFocus, setIsFocus] = useState(false);
  const { filters, updateFilter } = useContext(FilterContext);

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

  const data = [
    { label: '5 a side', value: '5 a side' },
    { label: '6 a side', value: '6 a side' },
    { label: '7 a side', value: '7 a side' },
    { label: '8 a side', value: '8 a side' },
    { label: '9 a side', value: '9 a side' },
    { label: '10 a side', value: '10 a side' },
    { label: '11 a side', value: '11 a side' },
  ];

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
              <Text style={styles.label}>Gender</Text>
              <RadioButtons
                options={['All', 'Male', 'Female']}
                setFunction={(value) => updateFilter({ gender: value })}
                start={filters.gender === 'All' ? 0 : filters.gender === 'Male' ? 1 : 2}
              />
              <Text style={styles.label}>Radius</Text>
              <RadioButtons
                options={['1km', '3km', '5km']}
                setFunction={(value) => updateFilter({ radius: value })}
                start={filters.radius === '1km' ? 0 : filters.radius === '3km' ? 1 : 2}
              />
              <Text style={styles.label}>Game type</Text>
              <Dropdown
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Option"
                value={filters.gameType}
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  updateFilter({ gameType: item.value });
                  setIsFocus(false);
                }}
              />
              <View style={styles.buttoncontainer}>
                <TouchableOpacity onPress={onApply} style={styles.applybutton}>
                  <Text style={styles.applytext}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resetbutton}
                  onPress={() => updateFilter({ activeDay: '', gender: 'All', radius: '3km', gameType: null })}
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
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 30,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333333',
  },
});

export default FilterModal;


