import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import JobListing from '../screen/JobListing';
import UserProfile from '../screen/UserProfile';

const Tab = createBottomTabNavigator();



// 
const jobDetails = [
  {
  title: 'Software Developer',
  imgUrl:require("../assets/job1.jpg"),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  experienceRequired: '3 years',
  // Add more details as needed
},
{
  title: 'Software Developer',
  imgUrl:require("../assets/job1.jpg"),
  description: 'Tech Co',
  experienceRequired: '3 years',
  // Add more details as needed
},
{
  title: 'Software Developer',
  imgUrl:require("../assets/job1.jpg"),
  description: 'Tech Co',
  experienceRequired: '3 years',
  // Add more details as needed
},
{
  title: 'Software Developer',
  imgUrl:require("../assets/job1.jpg"),
  description: 'Tech Co',
  experienceRequired: '3 years',
  // Add more details as needed
},
{
  title: 'Software Developer',
  imgUrl:require("../assets/job1.jpg"),
  description: 'Tech Co',
  experienceRequired: '3 years',
  // Add more details as needed
},
{
  title: 'Software Developer',
  imgUrl:require("../assets/job1.jpg"),
  description: 'Tech Co',
  experienceRequired: '3 years',
  // Add more details as needed
},
{
  title: 'Software Developer',
  imgUrl:require("../assets/job1.jpg"),
  description: 'Tech Co',
  experienceRequired: '3 years',
  // Add more details as needed
},
];


// userProfile

const user = {
name: 'Eyob Kefale',
email: 'jobkefale@gmail.com',
profileImage: require("../assets/job2.jpg"),
skills: ['React Native', 'JavaScript', 'UI/UX Design'],
education: 'Bachelor of Computer Science, Example University',
profession: 'Software Engineer',
aboutMe: 'Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.',
};




// 

const NavBar=()=> {
  return (
    <Tab.Navigator>
    <Tab.Screen name="    Job Listing" component={JobListing} initialParams={{jobDetails}} />
    <Tab.Screen name="    My Profile" component={UserProfile} initialParams={{user}} />
  </Tab.Navigator>
  );
}

export default NavBar;