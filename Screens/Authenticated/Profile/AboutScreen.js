import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AboutScreen() {

  const about_links = [
    {
      name: 'Privacy Policy',
      icon_name: 'key-outline',
      url: 'https://panenka.world/privay-policy/'
    },
    {
      name: 'Terms and Conditions',
      icon_name: 'document-text-outline',
      url: 'https://panenka.world/terms/'

    },
  ];

    // Function to handle link press
    const handleLinkPress = (url) => {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    };
  

  return (
    <View style={styles.container}>
      <View style={styles.links_container}>
      {about_links.map(link => {
          return (
            <TouchableOpacity
              key={link.name}
              onPress={() => handleLinkPress(link.url)}
              style={styles.linkButton}
            >
              <Ionicons name={link.icon_name} size={28} color="black" style={styles.icon} />
              <Text style={styles.linkText}>{link.name}</Text>
            </TouchableOpacity>
          );
        })}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  links_container: {
    paddingTop: 60,
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
  }
});
