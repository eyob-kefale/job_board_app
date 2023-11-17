import React from 'react';
import {  StyleSheet, Dimensions } from 'react-native';
import {theme } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import materialTheme from './constants/Theme';
import Images from './constants/Images';
import LogIn from './screen/LogIn';
import HomeScreen from './screen/HomeScreen'
import Register from './screen/Register';
import JobListing from './screen/JobListing';
import SideBar from './common/SideBar';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

const { height, width } = Dimensions.get('screen');


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
        />
         <Stack.Screen
          name="Register"
          component={Register}
        />

        <Stack.Screen
          name="JobListing"
          component={JobListing}
        />
         <Stack.Screen
          name="SideBar"
          component={SideBar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
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

