import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

export default function When({ submissionData, setSubmissionData }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false)
    setDate(currentDate);
    handlePlaceSelect(currentDate);
  };

  useEffect(() => {
    setSubmissionData(prevData => ({ ...prevData, When: date }));
  },[])

  const handlePlaceSelect = (when) => {
    setSubmissionData(prevData => ({ ...prevData, When: when }));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const nullify = () => {
    setSubmissionData(prevData => ({ ...prevData, When: '' }));
  }


  return (
    <View style={styles.container}>
      <View style={{width:'100%'}}>
        <TouchableOpacity onPress={showDatepicker} style={styles.datepickerbutton}>
          <View style={{flexDirection:'row', alignItems:'center', gap:8}}>
            <MaterialIcons name='calendar-month' color='#333333' size={18}/>
            <Text style={styles.datepickertext}>
              {submissionData.When && submissionData.When.toLocaleDateString()}
            </Text>
          </View>
          <MaterialIcons name='arrow-drop-down' color='#333333' size={18}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimepicker} style={styles.datepickerbutton}>
          <View style={{flexDirection:'row', alignItems:'center', gap:8}}>
            <MaterialIcons name='access-time' color='#333333' size={18}/>
            <Text style={styles.datepickertext}>
              {submissionData.When && submissionData.When.toLocaleTimeString()}
            </Text>
          </View>
          <MaterialIcons name='arrow-drop-down' color='#333333' size={18}/>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}} onPress={nullify}>
        <Text style={{fontSize:16, color:'#333333'}} >
          {submissionData.When &&  submissionData.When.toLocaleString()}
        </Text>
        {submissionData.When && <MaterialIcons name='highlight-remove' color='#333333' size={22}/>}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 18,
    width:'100%'
  },
  selectedDateText: {
    fontSize: 16,
    width:'100%',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    textAlign:'left'
  },
  datepickerbutton: {
    width:'100%',
    height:40,
    backgroundColor:'#DEDEDE',
    borderRadius:8,
    marginBottom:8,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    padding:6,
  },
  datepickertext: {
    color:'#333333',
    fontSize:16,
    fontWeight:'600'
  }
});
