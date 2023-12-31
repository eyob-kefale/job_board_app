import React from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet ,SafeAreaView} from 'react-native';
import { Block, Button, Text,  } from 'galio-framework';
import materialTheme from '../constants/Theme';
import {theme } from 'galio-framework';
import Images from '../constants/Images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
const { height, width } = Dimensions.get('screen');

const HomeScreen = () => {
const handleLogIn=async()=>{
  const value = await AsyncStorage.getItem('isLoggedIn');
  // const uId = await AsyncStorage.getItem('uId');
  // console.log("uIduIduId ",uId)
 if(value){
  const auth = getAuth().currentUser;
//  console.log("authauthh ",auth.email);

  navigation.navigate('NavBar')
 }else{
   navigation.navigate('LogIn')
 }
}
    // Use useNavigation hook to get the navigation prop
    const navigation = useNavigation();
      return (
    

        <Block flex style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Block flex center>
            <ImageBackground
              source={{ uri: Images.Onboarding }}
              style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
            />
          </Block>
          <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.padded}>
                <Block>
                  <Text color="white" size={55}>Job Board</Text>
                </Block>
                {/* <Block row>
                  <Text color="white" size={60}>Board</Text>
                </Block> */}

                <Block row>
                  <Text color="white" size={55}>App</Text>
                </Block>
                {/* <Text size={16} color='rgba(255,255,255,0.6)'>
                  Fully coded React Native components.
                </Text> */}
              </Block>
              <Block center>
                <Button
                  shadowless
                  style={styles.button}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={handleLogIn}>
                  GET STARTED
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      
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
    export default HomeScreen;