import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native';
import JobListing from '../screen/JobListing';
import UserProfile from '../screen/UserProfile';
import Notification from '../screen/Notification/Notification';
import Setting from '../screen/Setting';

const Tab = createBottomTabNavigator();


const jobDetails = [
  {
    title: 'Software Developer',
    imgUrl: require("../assets/job1.jpg"),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl: require("../assets/job1.jpg"),
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
  profileImage: require("../assets/job2.jpg"),
  skills: ['React Native', 'JavaScript', 'UI/UX Design'],
  education: 'Bachelor of Computer Science, Example University',
  profession: 'Software Engineer',
  aboutMe: 'Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.',
};




// 

const NavBar = () => {
  return (

    <SafeAreaView style={{ flex: 3, height: "20%" }}>
      <Tab.Navigator>


        <Tab.Screen
          name="Job Listing"
          component={JobListing}
          initialParams={{ jobDetails }}
          options={{
            headerShown: false,
            tabBarLabel: 'Job Listing',
            tabBarIcon: ({ color }) => <Icon name="list" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="My Profile"
          component={UserProfile}
          initialParams={{ user }}

          options={{
            headerShown: false,
            tabBarLabel: 'My Profile',
            tabBarIcon: ({ color }) => <Icon name="user" color={color} size={24} />,
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

        <Tab.Screen
          name="Notification"
          component={Notification}

          options={{
            headerShown: false,
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color }) => <Icon name="bell" color={color} size={24} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>



  )

}

export default NavBar;