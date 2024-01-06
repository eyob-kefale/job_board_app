import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import { StatusBar } from "expo-status-bar"
import JobListing from './screen/JobListing';
import UserProfile from './screen/MyProfile/UserProfile';
import MyApplication from './screen/MyApplication';
import Notification from './screen/Notification/Notification';
import NavBar from './common/NavBar'
import SingleNotification from './screen/Notification/SingleNotification';
import EditProfile from './screen/MyProfile/EditProfile';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeerProfile from './screen/employeerProfile';
import Register from './screen/Register';
import ApplyPage from './screen/ApplyPage';
import HomeScreen from './screen/HomeScreen';
import LogIn from './screen/LogIn';
import { useState } from 'react';
import User from 'firebase/auth'
import { UserProvider } from './common/context/UserContext'

import { collection, getDocs } from "firebase/firestore"; 
import EditJobs from './screen/Employer/EditJobs';
import SingleJob from './screen/JobList/SingleJob';
import CreateJobListing from './screen/Employer/CreateJobListing';
import MyJobs from './screen/Employer/MyJobs';
import Applicants from './screen/Employer/applicants';
import MyEmployeeProfile from './screen/Employer/MyEmployeeProfile';
import ViewEmployeeApplication from './screen/Employer/ViewEmployeeApplication';
import AboutUs from './screen/aboutUs';

import * as Notifications from 'expo-notifications';
// const querySnapshot = await getDocs(collection(db, "user"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const jobDetails = [
  {
    title: 'Software Developer',
    imgUrl: require("./assets/job1.jpg"),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("./assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("./assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("./assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("./assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("./assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("./assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
];


// userProfile

const user = {
  name: 'Eyob Kefale',
  email: 'jobkefale@gmail.com',
  department: 'Software Engineer',
  profileImage: require("./assets/job2.jpg"),
  skills: ['React Native', 'JavaScript', 'UI/UX Design'],
  education: 'Bachelor of Computer Science, Example University',
  profession: 'Software Engineer',
  aboutMe: 'Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.',
};

// const MainTabNavigator = () => (
//   <HomeScreen />
// );


const App = () => {
  // const [user,setUser]=useState<User|null>(null);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
  return (


    <NavigationContainer>
      <UserProvider>
      {/* <StatusBar style="auto" /> */}
      <Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="SingleNotification" component={SingleNotification} />
        <Stack.Screen name="EmployeerProfile" component={EmployeerProfile} />
        <Stack.Screen name="EditJobs" component={EditJobs} />
        <Stack.Screen name="ApplyPage" component={ApplyPage} />
        <Stack.Screen name="JobListing" component={JobListing} />
        <Stack.Screen  options={{ headerShown: false }} name="NavBar" component={NavBar}  />
        <Stack.Screen options={{ headerShown: false }} name="LogIn" component={LogIn} />
        <Stack.Screen name="SingleJob" component={SingleJob} />
       <Stack.Screen name="CreateJobListing" component={CreateJobListing}/>
       <Stack.Screen name="MyJobs" component={MyJobs}/>
       <Stack.Screen name="applicants" component={Applicants}/>
       <Stack.Screen name="MyEmployeeProfile" component={MyEmployeeProfile}/>
       <Stack.Screen name="ViewEmployeeApplication" component={ViewEmployeeApplication}/>
       <Stack.Screen name="AboutUs" component={AboutUs}/>
       
        {/* Add more stack screens if needed */}
      </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>

  );
};

export default App;
