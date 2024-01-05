// AboutUs.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import materialTheme from '../constants/Theme';
const AboutUs = ({ navigation }) => {
  const navigateToHome = () => {
    // Navigate back to the home page or any other page
    navigation.navigate('Setting');
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>

      <View style={styles.content}>
        <Text style={styles.description}>
        Welcome to my app! This is the Campus Job Board, developed by Eyob Kefale. 
          The Campus Job Board is designed to connect students with part-time job opportunities 
          within the campus community. 
        </Text>

        <View style={styles.authorInfo}>
          <Text style={styles.authorText}>Author: Eyob Kefale</Text>
          <Text style={styles.authorText}>Email: eyobkefale1@gmail.com</Text>
          <TouchableOpacity
            style={styles.socialMediaLink}
            onPress={() => openLink('https://www.facebook.com/johndoe')}
          >
            <Icon name="facebook" size={20} color="#4267B2" />
            <Text style={styles.socialMediaText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.openSourceText}>This app is open source.</Text>

        <TouchableOpacity
          style={styles.githubLink}
          onPress={() => openLink('https://github.com/eyob-kefale/job_board_app')}
        >
          <Icon name="github" size={20} color="#4267B2" />
          <Text style={styles.githubText}>GitHub Repository</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.goBackButton} onPress={navigateToHome}>
          <Icon name="arrow-left" size={20} color="#4267B2" />
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // marginTop: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: materialTheme.COLORS.BUTTON_COLOR,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
textAlign:"justify"
  },
  authorInfo: {
    marginBottom: 20,
  },
  authorText: {
    fontSize: 16,
    marginBottom: 5,
  },
  socialMediaLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  openSourceText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  githubLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  githubText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  goBackButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color:  materialTheme.COLORS.BUTTON_COLOR,
  },
});

export default AboutUs;
