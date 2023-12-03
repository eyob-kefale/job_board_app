// import React from 'react';
// import {  StyleSheet, Dimensions, View } from 'react-native';
// import {theme } from 'galio-framework';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// import materialTheme from './constants/Theme';
// import Images from './constants/Images';
// import LogIn from './screen/LogIn';
// import HomeScreen from './screen/HomeScreen'
// import Register from './screen/Register';
// import JobListing from './screen/JobListing';
// import UserProfile from './screen/UserProfile';
// import NavBar from './common/NavBar';
// import TopBar from './common/TopBar';
// import { SafeAreaView } from 'react-native';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();



// // const MainTabs = () => (
// //   <Tab.Navigator>
// //     <Tab.Screen name="Job Listing" component={JobListing} initialParams={{jobDetails}} />
// //     <Tab.Screen name="My Profile" component={UserProfile} initialParams={{user}} />
// //   </Tab.Navigator>
// // );
// const { height, width } = Dimensions.get('screen');


// const App = () => {
//   return (
//    <NavigationContainer>
//     <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="LogIn" component={LogIn} />
//       <Stack.Screen name="Register" component={Register} />
//       <Stack.Screen
//         name="NavBar"
//         component={NavBar}
//         options={{ tabBarVisible: false }}
//       />
//        <Stack.Screen
//         name="TopBar"
//         component={TopBar}
//         options={{ tabBarVisible: false }}
//       />
//     </Stack.Navigator>
//     {/* <Stack.Screen name="NavBar" component={NavBar} /> */}
//   </NavigationContainer>

// //   <NavigationContainer>
// // <SafeAreaView>


//       <TopBar
//         title="My Application"
//         notificationCount={5}
//         userImage={require("./assets/job1.jpg")}
//         onSignOut={() => {
//           console.log('User signed out');
//         }}
//       />

// //       {/* Your app content here */}
// //   </NavigationContainer>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "black",
//   },
//   padded: {
//     paddingHorizontal: theme.SIZES.BASE * 2,
//     position: 'relative',
//     bottom: theme.SIZES.BASE,
//   },
//   button: {
//     width: width - theme.SIZES.BASE * 4,
//     height: theme.SIZES.BASE * 3,
//     shadowRadius: 0,
//     shadowOpacity: 0,
//   },
// });

// export default App;



import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { theme } from 'galio-framework';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import materialTheme from './constants/Theme';
import Images from './constants/Images';
import LogIn from './screen/LogIn';
import HomeScreen from './screen/HomeScreen';
import Register from './screen/Register';
import JobListing from './screen/JobListing';
import UserProfile from './screen/MyProfile/UserProfile';
import NavBar from './common/NavBar';
import TopBar from './common/TopBar';
import Setting from './screen/Setting';
import Notification from './screen/Notification/Notification';
import SingleNotification from './screen/Notification/SingleNotification';
import EditProfile from './screen/MyProfile/EditProfile';
import Search from './common/Search';
import ImagePickerComponent from './screen/ImagePickerComponent';
import MyApplication from './screen/MyApplication';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const MainTabs = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Job Listing" component={JobListing} initialParams={{ jobDetails }} />
//     <Tab.Screen name="My Profile" component={UserProfile} initialParams={{ user }} />
//   </Tab.Navigator>
// );

const { height, width } = Dimensions.get('screen');

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TopBar
          
          title="Job Board"
          notificationCount={5}
          userImage='https://placekitten.com/50/50'
          onSignOut={() => {
            console.log('User signed out');
          }}
        /> */}
      

        
        {/* <Stack.Screen
            name="NavBar"
            component={NavBar}
            options={{ tabBarVisible: true }}
          /> */}
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Notification" component={Notification}  />
          <Stack.Screen name="SingleNotification" component={SingleNotification}  />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="JobListing" component={JobListing} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="MyApplication" component={MyApplication} />
          <Stack.Screen name="ImagePickerComponent" component={ImagePickerComponent} />
        
          
          <Stack.Screen
            name="NavBar"
            component={NavBar}
            options={{ tabBarVisible: false }}
          />
  {/* <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <Icon name="settings" color={color} size={24} />
            ),
          }}
        /> */}
        </Stack.Navigator>
        
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

export default App;