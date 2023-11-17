// import React from 'react';
// import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
// import { Block, Button, Text, theme } from 'galio-framework';

// const { height, width } = Dimensions.get('screen');

// import materialTheme from './constants/Theme';
// import Images from './constants/Images';
// import LogIn from './screen/logIn';

// export default  App =({ navigation })=>{

  

//     return (
//       <Block flex style={styles.container}>
//         <StatusBar barStyle="light-content" />
//         <Block flex center>
//           <ImageBackground
//             source={{  uri: Images.Onboarding }}
//             style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
//           />
//         </Block>
//         <Block flex space="between" style={styles.padded}>
//           <Block flex space="around" style={{ zIndex: 2 }}>
//             <Block>
//               <Block>
//                 <Text color="white" size={60}>Material</Text>
//               </Block>
//               <Block row>
//                 <Text color="white" size={60}>Kit</Text>
//               </Block>
//               <Text size={16} color='rgba(255,255,255,0.6)'>
//                 Fully coded React Native components.
//               </Text>
//             </Block>
//             <Block center>
//               <Button
//                 shadowless
//                 style={styles.button}
//                 color={materialTheme.COLORS.BUTTON_COLOR}
//                 onPress={() => navigation.navigate(LogIn)}>
//                 GET STARTED
//               </Button>
//             </Block>
//           </Block>
//         </Block>
//       </Block>
//     );
  
// }

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

