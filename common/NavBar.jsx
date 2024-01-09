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
import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FireBaseConfig';
import { Text, View } from 'react-native';
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

  const [post, setPosts] = useState([])
  useEffect(() => {
    const fetchNotification = async () => {
      const fetchNot = collection(db, 'notification');
      //  console.log(getDocument.data());

      try {
        const data = await getDocs(fetchNot);


        // Check if data.docs is defined before mapping over it
        if (data.docs && data.docs.length > 0) {
          const jobIds = data.docs.map((doc) => doc.id);


          // Set the posts state with the data and include IDs
          setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } else {
          console.error('No documents found');
        }
      } catch (error) {
        console.error('Error fetching job lists: ', error);
      }
    }
    fetchNotification();
    // console.log(post);
  }, [post])

const len=post.length;
// console.log("len ",len)

  
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
          tabBarIcon: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="bell" color={color} size={24} />
              {len > 0 && (
                <View style={{ backgroundColor: '#9C26B0', borderRadius: 10, marginBottom: 4, paddingHorizontal:1}}>
                  <Text style={{ color: 'white', fontSize: 10 }}>{len}</Text>
                </View>
              )}
            </View>
          ),
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