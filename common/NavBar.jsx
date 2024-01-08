import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobListing from '../screen/JobListing';
import UserProfile from '../screen/MyProfile/UserProfile';
import Notification from '../screen/Notification/Notification';
import Setting from '../screen/Setting';
import Register from '../screen/Register';
import CreateJobListing from '../screen/Employer/CreateJobListing'
import MyApplication from '../screen/MyApplication';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer, } from '@react-navigation/native';
// import EmployeerProfile from '../screen/employeerProfile';
import LogIn from '../screen/LogIn';
import { useUser } from './context/UserContext';
import MyJobs from '../screen/Employer/MyJobs';
const Tab = createBottomTabNavigator();

import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
// userProfile

const user = {
  name: 'Eyob Kefale',
  email: 'jobkefale@gmail.com',
  department: 'Software Engineer',
  profileImage: require("../assets/job2.jpg"),
  skills: ['React Native', 'JavaScript', 'UI/UX Design'],
  education: 'Bachelor of Computer Science, Example University',
  profession: 'Software Engineer',
  aboutMe: 'Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.',
};



const NavBar = () => {
  const { role } = useUser();
  const { updateUser, updateDocId, updateRole, updateApply, updateNotification } = useUser();
  const navigation = useNavigation();

  const auth = getAuth().currentUser;
  //  console.log("authauth ",auth.email);
  useEffect(() => {
    const usId = async () => {
      const uId = await AsyncStorage.getItem('uId');

      const uEmail = await AsyncStorage.getItem('uEmail');
      const uRole = await AsyncStorage.getItem('uRole');
      // const uApply = await AsyncStorage.getItem('uApply');

      const jsonValue = await AsyncStorage.getItem('uApply');
      const uApply = jsonValue != null ? JSON.parse(jsonValue) : null;

      const notificationToken = await AsyncStorage.getItem('notificationToken');
      console.log("uApply ", uApply)
      // console.log("uEmailuEmail ",uEmail)
      // console.log("uRoleuRole ",uRole)
      // console.log("RoleRole ",role)

      updateUser(uEmail);
      updateDocId(uId);
      updateRole(uRole);
      updateApply(uApply);
      updateNotification(notificationToken)
    }
    usId();
  }, [])




  // Add a listener for incoming notifications
  // useEffect(() => {
  //   const subscription = Notifications.addNotificationReceivedListener((notification) => {
  //     // Handle the incoming notification
  //     console.log('Notification received:', notification);
  //     // Update UI or navigate to relevant screen based on notification data
  //   });

  //   return () => {
  //     subscription.remove(); // Remove the listener when the component unmounts
  //   };
  // }, []);

  // useEffect(() => {
  //   const subscription = Notifications.addNotificationReceivedListener((notification) => {
  //     console.log('Notification received:', notification);
      
  //     // Check notification data and navigate to the relevant screen
  //     if (notification.data && notification.data.targetScreen) {
  //       navigation.navigate(notification.data.targetScreen);
  //     }
  //   });
  
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  
  // // context
  // updateUser(email);
  // updateDocId(userData.map(user =>
  //   console.log("user.id",user.id),
  //   user.id));
  // console.log("uid ",userData[0].role);
  // updateRole(userData[0].role);

  // console.log("roleeee ",role);
  return (
    //  <NavigationContainer>

    <Tab.Navigator
      initialRouteName="Job Listing"
      tabBarOptions={{
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, backgroundColor: '#000' },
      }}
    >


      <Tab.Screen

        name="Job Listing"
        component={JobListing}
        // initialParams={{ jobDetails }}
        options={{
          headerShown: false,
          tabBarLabel: 'Job Listing',
          tabBarIcon: ({ color }) => <Icon name="list" color={color} size={24} />,
        }}
      />
      {/* <Tab.Screen
        name="My Profile"
        component={UserProfile}
        initialParams={{ user }}

        options={{
          headerShown: false,
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => <Icon name="user" color={color} size={24} />,
        }}
      /> */}
      {((role == "employee")) && (<Tab.Screen
        name="MyApplication"
        component={MyApplication}
        options={{
          headerShown: false,
          tabBarLabel: 'MyApplication',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="application-outline" color={color} size={24} />,
        }}
      />)}


      {role == "employer" && (
        // <Tab.Screen
        //   name="Create Jobs"
        //   component={CreateJobListing}

        //   options={{
        //     headerShown: false,
        //     tabBarLabel: 'Add job',
        //     tabBarIcon: ({ color }) => <Icon name="bell" color={color} size={24} />,
        //   }}
        // />
        <Tab.Screen
          name="My Jobs"
          component={MyJobs}

          options={{
            headerShown: false,
            tabBarLabel: 'My Jobs',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="application-outline" color={color} size={24} />,
          }}
        />
      )}
      <Tab.Screen
        name="Notification"
        component={Notification}

        options={{
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color }) => <Icon name="bell" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}

        options={{
          headerShown: false,
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={24} />,
        }}
      />

    </Tab.Navigator>
    // {/* </NavigationContainer> */}
  )
}

export default NavBar