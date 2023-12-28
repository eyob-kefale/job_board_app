import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobListing from '../screen/JobListing';
import UserProfile from '../screen/MyProfile/UserProfile';
import Notification from '../screen/Notification/Notification';
import Setting from '../screen/Setting';
import Register from '../screen/Register';
import CreateJobListing from '../screen/Employer/CreateJobListing'
import MyApplication from '../screen/MyApplication';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer, } from '@react-navigation/native';
// import EmployeerProfile from '../screen/employeerProfile';
import LogIn from '../screen/LogIn';
import { useUser } from './context/UserContext';
import MyJobs from '../screen/Employer/MyJobs';
const Tab = createBottomTabNavigator();



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
  // console.log("roleeee ",role);
  return (
    //  <NavigationContainer>

    <Tab.Navigator
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
      {role == "employee" && (<Tab.Screen
        name="MyApplication"
        component={MyApplication}


        options={{
          headerShown: false,
          tabBarLabel: 'MyApplication',
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={24} />,
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
          tabBarLabel: 'Add job',
          tabBarIcon: ({ color }) => <Icon name="bell" color={color} size={24} />,
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

     
    </Tab.Navigator>
    // {/* </NavigationContainer> */}
  )
}

export default NavBar