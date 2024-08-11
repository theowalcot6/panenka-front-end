import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { FilterContext } from '../appcontexts/FilterContext';

const { width: screenWidth } = Dimensions.get('window');

const Day = ({ dayOfWeek, day, fullDate, updateFilter, setActiveDay, activeDay }) => {
  const changeDay = (dayOfWeek, day, fullDate) => {
    updateFilter({ activeDay: fullDate });
    setActiveDay({ day, dayOfWeek, fullDate });
  };

  return (
    <TouchableOpacity 
      style={activeDay && activeDay.day === day && activeDay.dayOfWeek === dayOfWeek ? styles.dateContainerActive : styles.dateContainer} 
      onPress={() => changeDay(dayOfWeek, day, fullDate)}
    >
      <Text>{dayOfWeek}</Text>
      <Text>{day}</Text>
    </TouchableOpacity>
  );
};

export default function DatePicker() {
  const [dates, setDates] = useState([]);
  const { filters, updateFilter } = useContext(FilterContext);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const currentDate = moment();
    const next30Days = [];
    
    for (let i = 0; i < 30; i++) {
      const date = currentDate.clone().add(i, 'days');
      next30Days.push({
        dayOfWeek: date.format('ddd'),
        day: date.format('D'),
        fullDate: date.format('M/D/YYYY')
      });
    }

    setDates(next30Days);
  }, []);

  return (
    <View style={styles.outerContainer}>
      <ScrollView 
        horizontal 
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        {dates.map((date, index) => (
          <Day 
            key={index} 
            dayOfWeek={date.dayOfWeek} 
            day={date.day} 
            fullDate={date.fullDate} 
            updateFilter={updateFilter} 
            setActiveDay={setActiveDay} 
            activeDay={activeDay} 
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 90,
    zIndex: 10,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 5,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    width: 60,
    height: 80,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding: 5,
  },
  dateContainerActive: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    width: 60,
    height: 80,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding: 5,
    backgroundColor: '#ADD8E6',
  }
});


