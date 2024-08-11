import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SearchComponent from './SearchComponent'; // Adjust the import according to your file structure

const CustomHeader = ({ navigation, toggleFilterModal }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.rightButtonsContainer}>
        <SearchComponent />
        <TouchableOpacity onPress={toggleFilterModal} style={styles.iconButton}>
          <MaterialIcons name="tune" size={28} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Add Game')} style={styles.iconButton}>
          <MaterialIcons name="add" size={28} color="#333333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingTop: 20,
    backgroundColor: 'transparent', // Adjust as needed
  },
  leftButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 100,
    padding: 8,
    marginLeft: 10,
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  iconButton: {
    padding: 8,
  },
});

export default CustomHeader;


