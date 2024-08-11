import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useAuth } from '../../../authcontext/authcontext';
import Constants from 'expo-constants';

export default function ProfileScreen({ navigation, route }) {
  const message = (route.params && route.params.message) || "";

  const {onLogout} = useAuth();

  const profile_links = [
    {
      name: 'Settings',
      icon_name: 'settings-outline',
      type: 'Ionicons'
    },
    {
      name: 'Credits',
      icon_name: 'card-outline',
      type: 'Ionicons'
    },
    {
      name: 'Update Email',
      icon_name: 'mail-outline',
      type: 'Ionicons'
    },
    {
      name: 'Update Password',
      icon_name: 'lock-closed-outline',
      type: 'Ionicons'
    },
    {
      name: "About",
      icon_name: 'information-circle-outline',
      type: 'Ionicons'
    },
    {
      name: "Sign out",
      icon_name: "log-out-outline",
      type: 'Ionicons',
      action: onLogout
    },
    {
      name: 'Delete account',
      icon_name: 'remove-circle-outline',
      type: 'Ionicons',
    }
  ];

  const getIconComponent = (type) => {
    switch (type) {
      case 'Ionicons':
        return Ionicons;
      case 'MaterialCommunityIcons':
        return MaterialIcons;
      case 'Octicons':
        return Octicons;
      default:
        return Ionicons; // Default to Ionicons if type is not recognized
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.username_container}>
        <Text style={styles.username}>theowalcot6</Text>
      </View>
      <View style={styles.links_container}>
        {profile_links.map(link => {
          const IconComponent = getIconComponent(link.type);
          return (
            <TouchableOpacity
              key={link.name}
              onPress={link.action ? link.action : () => navigation.navigate(link.name)}
              style={styles.linkButton}
            >
              <IconComponent name={link.icon_name} size={28} color="black" style={styles.icon} />
              <Text style={styles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={message && styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 18,
    fontWeight: '600'
  },
  username_container: {
    width: '100%',
    justifyContent: 'center',
    height: '6.8%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'web' ? 10 : 10 + Constants.statusBarHeight,
  },
  links_container: {
    paddingTop: 30,
    marginLeft: '5%',
    width: '95%'
  },
  linkButton: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkText: {
    marginLeft: 20,
    fontSize: 16
  },
  message : {
    fontSize:16,
    backgroundColor: '#DFF2BF', // light green background
    color: '#4F8A10', // dark green text
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
    width: '90%',
    position: 'absolute',
    bottom:30,
    right:'5%'
  }
});
