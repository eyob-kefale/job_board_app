import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TopBar = ({ title, notificationCount, userImage, onSignOut }) => {
  const [showSignOutButton, setShowSignOutButton] = useState(false);
  const userImageURI = require('uri')(userImage);

  return (
    <SafeAreaView style={styles.outerSafeAreaView}>
      <SafeAreaView style={styles.navBar} statusBar={true}>
      <Image source={{ uri: userImageURI }} style={styles.userPic} />

      <Text style={styles.title}>{title}</Text>

      {notificationCount > 0 && (
        <SafeAreaView style={styles.notificationIconContainer}>
          <AntDesign name="notification" size={24} color="white" />
          <SafeAreaView style={styles.notificationCountBadge}>
            <Text style={styles.notificationCountText}>{notificationCount}</Text>
          </SafeAreaView>
        </SafeAreaView>
      )}

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => {
          setShowSignOutButton(!showSignOutButton);
        }}
      >
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      {showSignOutButton && (
        <TouchableOpacity
          style={styles.signOutConfirmationButton}
          onPress={() => {
            onSignOut();
          }}
        >
          <Text style={styles.signOutConfirmationButtonText}>Confirm Sign Out</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#000',
    //marginVertical:20
  },
  userPic: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationIconContainer: {
    position: 'relative',
  },
  notificationIcon: {
    color: 'white',
  },
  notificationCountBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: {
    color: 'white',
    fontSize: 10,
  },
  signOutButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  signOutConfirmationButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 10,
  },
  signOutConfirmationButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TopBar;
