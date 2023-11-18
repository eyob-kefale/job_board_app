import React from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { Block, Button, Text,  } from 'galio-framework';
import materialTheme from '../constants/Theme';
import {theme } from 'galio-framework';
import Images from '../constants/Images';

const { height, width } = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
    // Use useNavigation hook to get the navigation prop
    
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
                  onPress={() => navigation.navigate('NavBar')}>
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