// settings.js
import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../common/context/UserContext';
import * as Notifications from 'expo-notifications';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../FireBaseConfig';
const Setting = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const {role, updateUser, updateDocId, updateRole ,notificationEnable,userEmail} = useUser();
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
    notificationEnable(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    sendNotification();
    setDarkModeEnabled(!darkModeEnabled);
  };


  const sendNotification = async () => {
    try {
      // Retrieve all users with the role "employee"
      const employeeUsersRef =query(collection(db, 'user'),where('email','==',userEmail));
      const employeeUsersSnapshot = await getDocs(employeeUsersRef);
  
      // Iterate through employee users and send notifications
      employeeUsersSnapshot.forEach(async (userDoc) => {
        console.log("userDoc.data(); ",userDoc.data());
        if(userDoc.data().token){
          const { token } = userDoc.data();

        
          console.log("retoken ",token)
       // console.log("token ",token);
        try {
          console.log("token ",token);
          await Notifications.scheduleNotificationAsync({
            content: {
              to: token,
              title: "New Job Posted! 📬",
              body: 'Check out the latest job opportunity.',
              data: {
                data: 'goes here',
                icon: '🌟', // Add your desired icon or use emojis
                date: new Date().toLocaleDateString(), // Add the current date
              },
              sound: "default",
            },
            trigger: { seconds: 2 },
          });
        
        } catch (error) {
          console.error("Error scheduling notification:", error);
        }
      }
      
      });
    } catch (error) {
      console.error("Error sending notifications to employees:", error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', '');
    updateUser(null);
    updateDocId(null);
    updateRole(null);
    console.log("logOut role ",role);
    navigation.navigate('LogIn');
  };
  const handleAboutUs = () => {
    navigation.navigate('AboutUs');
  }
  const navigateToProfile = () => {
    // Navigate to the profile page
    navigation.navigate('UserProfile');
  };
  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  }
  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>

      <TouchableOpacity style={styles.profileItem} onPress={navigateToProfile}>
        <View style={styles.profileIcon}>
          <Icon name="user" size={20} color="#007AFF" />
        </View>
        <Text style={styles.profilePage}>Profile Page</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleAboutUs}>
        <MaterialIcons name="info-outline" size={20} color="#219C90" />
        <Text style={styles.aboutUs}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleChangePassword}>
        <MaterialIcons name="security" size={20} color="#C21292" />
        <Text style={styles.changePassword}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={20} color="#FF0000" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: "30%",
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: "8%",
    // Add the following properties for shadow on Android
    elevation: 3,
    // Add the following properties for shadow on iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // Additional styling
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  profileItem: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    height: "8%",

    elevation: 3,
    // Add the following properties for shadow on iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  settingText: {
    fontSize: 18,
   
  },
  profileIcon: {
    marginRight: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    height: "8%",
    elevation: 3,
    // Add the following properties for shadow on iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
profilePage:{
  fontSize: 18,
    color:"#007AFF"
},
  aboutUs: {
    marginLeft: 10,
    fontSize: 18,
    color: '#219C90',
  },
  changePassword: {
    marginLeft: 10,
    fontSize: 18,
    color: '#C21292',
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#FF0000',
  },
});

export default Setting;
