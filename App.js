import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import Splash from './Screens/Splash';
import { AuthProvider, useAuth } from './authcontext/authcontext';
import AuthNavigator from './Navigators/AuthNavigator'
import AppNavigator from './Navigators/AppNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { FilterProvider } from './appcontexts/FilterContext';
import {LocationFilterProvider} from './appcontexts/LocationFilterContext'
import Constants from 'expo-constants';



export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.manifest.extra.eas.projectId,
    })).data;

    console.log(token);
    return token;
  }
  // END

  if (isLoading) {
    return <Splash setIsLoading={setIsLoading} />;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState } = useAuth();

  return !authState?.authenticated ? 
  <AuthNavigator /> :
  <FilterProvider>
    <LocationFilterProvider>
      <AppNavigator />
    </LocationFilterProvider>
  </FilterProvider> 
}
