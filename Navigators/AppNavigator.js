import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, Keyboard } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FindScreen from '../Screens/Authenticated/Main App/FindScreen';
import HistoryScreen from '../Screens/Authenticated/Main App/HistoryScreen';
import SeenScreen from '../Screens/Authenticated/Main App/SeenScreen';

import ErrorScreen from '../Screens/Authenticated/ErrorScreen'
import ProfileScreen from '../Screens/Authenticated/Profile/ProfileScreen'
import DeleteAccountScreen from '../Screens/Authenticated/Profile/DeleteAccountScreen'
import AboutScreen from '../Screens/Authenticated/Profile/AboutScreen'
import UpdatePasswordScreen from '../Screens/Authenticated/Profile/UpdatePasswordScreen'
import SettingsScreen from '../Screens/Authenticated/Profile/SettingsScreen'
import EmailUpdateNavigator from './UpdateEmail';
import IndividualGameScreen from '../Screens/Authenticated/Main App/Games/IndividualGameScreen';
import IndividualLocationScreen from '../Screens/Authenticated/Main App/Games/IndividualLocationScreen'
import AddGameNavigator from './AddGame'
import CustomHeader from '../Components/CustomHeader';
import LocationHeader from '../Components/LocationHeader';
import CreditsScreen from '../Screens/Authenticated/Profile/Credits';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleFilterModal = () => {
    setFilterVisible(!filterVisible);
  };

  const AppStack = () => (
    <Tab.Navigator
      initialRouteName="Join"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: '12%', paddingBottom:16, paddingLeft:8, paddingRight:8, paddingTop:16
        },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarItemStyle: {
          borderRadius: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
        
          if (route.name === 'Join') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
            size = 32;
          } else if (route.name === 'Games') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Locations') {
            iconName = focused ? 'navigate' : 'navigate-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }
        
          return (
              <Icons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveBackgroundColor: 'orange',
        tabBarActiveTintColor: '#333333',
        tabBarInactiveTintColor: 'grey',
        tabBarLabel: ({ focused, color }) => {
          let labelName = route.name;
          const labelStyle = focused ? { fontWeight: '600',  } : {};
          return <Text style={[{ color, fontSize: 14, paddingBottom:10 }, labelStyle]}>{labelName}</Text>;
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          marginTop: 2
        }
      })}
    >
      <Tab.Screen
        name="Join"
        options={({ navigation }) => ({
          title: '',
          header: () => <CustomHeader navigation={navigation} toggleFilterModal={toggleFilterModal} />,
          headerTransparent: true,
        })}
      >
      {(props) => (
        <FindScreen {...props} filterVisible={filterVisible} toggleFilterModal={toggleFilterModal} />
      )}
      </Tab.Screen>
      <Tab.Screen
        name="Games"
        component={HistoryScreen}
        options={({ navigation }) => ({
          title: '',
          headerShown:false,
        })}
      />
      <Tab.Screen
        name="Locations"
        options={({ navigation }) => ({
          title: '',
          header: () => <LocationHeader navigation={navigation} toggleFilterModal={toggleFilterModal} />,
          headerTransparent: true,
        })}
      >
        {(props) => (
          <SeenScreen {...props} filterVisible={filterVisible} toggleFilterModal={toggleFilterModal} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppStack"
        component={AppStack}
        options={({ navigation }) => ({
          title: '',
          headerShown:false,
        })}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={({ navigation }) => ({
          title: '',
          headerTransparent:true,
          headerTintColor: '#333333'
        })}
      />
      <Stack.Screen 
        name="Error" 
        component={ErrorScreen} 
        options={({ navigation }) => ({
          title: '',
          headerTransparent:true,
          headerTintColor: 'black'
        })}
      />
      <Stack.Screen 
        name="Delete account" 
        component={DeleteAccountScreen} 
        options={({ navigation }) => ({
          title: 'Delete Account',
          headerTransparent:true,
          headerTintColor: '#333333',
          headerTitleAlign: 'center', // Center the title
        })}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen} 
        options={({ navigation }) => ({
          title: 'About',
          headerTransparent:true,
          headerTintColor: '#333333',
          headerTitleAlign: 'center', // Center the title
        })}
      />
      <Stack.Screen 
        name="Update Password" 
        component={UpdatePasswordScreen} 
        options={({ navigation }) => ({
          title: 'Update Password',
          headerTitleAlign: 'center', // Center the title
          headerTransparent:true,
          headerTintColor: '#333333'
        })}
      />
      <Stack.Screen 
        name="Update Email" 
        component={EmailUpdateNavigator} 
        options={{
          title: 'Update Email',
          headerTransparent:true,
          headerTitleAlign: 'center', // Center the title
          headerTintColor: '#333333'
        }} 
      />
      <Stack.Screen 
        name="Add Game" 
        component={AddGameNavigator} 
        options={{
          title: 'Add Game',
          headerTransparent:false,
          headerTitleAlign: 'center', // Center the title
          headerTintColor: '#333333',
        }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={({ navigation }) => ({
          title: '',
          headerTransparent:true,
          headerTintColor: '#333333'
        })}
      />
      <Stack.Screen 
        name="Credits" 
        component={CreditsScreen} 
        options={({ navigation }) => ({
          title: 'Credits',
          headerTransparent:true,
          headerTitleAlign: 'center', // Center the title
          headerTintColor: '#333333'
        })}
      />
      <Stack.Screen 
        name="Individual Game" 
        component={IndividualGameScreen} 
        options={({ navigation }) => ({
          title: '',
          headerTransparent:true,
          headerTintColor: '#333333'
        })}
      />
      <Stack.Screen 
        name="Individual Location" 
        component={IndividualLocationScreen} 
        options={({ navigation }) => ({
          title: '',
          headerTransparent:true,
          headerTintColor: '#333333'
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: 150, // Adjust width as needed
    borderWidth: 1,
    borderColor: '#ccc',
  },
  radiusInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: 60, // Adjust width as needed
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default AppNavigator;
