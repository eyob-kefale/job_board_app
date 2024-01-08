import { Block, Text } from 'galio-framework';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

import materialTheme from '../constants/Theme';

import { doc, setDoc } from "firebase/firestore";
import { db } from '../FireBaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


// var C = require("crypto-js");

// var Decrypted = C.AES.decrypt(E, "your password");
// var result =Decrypted.toString(C.enc.Utf8);

// console.log(result)

// Add a new document in collection "cities"


const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleRegistration = async () => {
    // const hashedPassword = await bcrypt.hash(password, 10);
    // var mytexttoEncryption = "Hello"
    // const hashedPassword = CryptoES.AES.encrypt(mytexttoEncryption, password).toString();

    const auth = getAuth();
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const uid = response.user?.uid; // Access the uid from the user property




      // notification
      async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          // Learn more about projectId:
          // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
          token = (await Notifications.getExpoPushTokenAsync({ projectId: 'b1134ed4-c689-49dc-aadf-2e22206366f8' })).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }

        return token;
      }



      const notificationToken = await registerForPushNotificationsAsync()
      console.log("notificationToken", notificationToken);




      const data = {
        id: uid,
        firstName,
        lastName,
        email,
        // password,
        role: "employee",
        token: notificationToken,
        apply: []
      };

      try {

        const collectionRef = collection(db, 'user');
        const docRef = await addDoc(collectionRef, data);

        // The following line will now correctly log the ID of the newly added document
        // console.log("Document written with ID: ", docRef.id);


        // await AsyncStorage.setItem('notificationToken',notificationToken);
        // // updateNotification(notificationToken);
        // console.log(userData[0].id);

        // const userDocRef = doc(collection(db, 'user'), userData[0].id);
        // await updateDoc(userDocRef, { token:notificationToken });


        // const [userProfile, setUser] = useState([]);
        // const userCollectionRef = query(collection(db, 'user'), where("email", "==", email));

        // useEffect(() => {
        //   const getUserProfile = async () => {
        //     try {
        //       const querySnapshot = await getDocs(userCollectionRef);
        //       const userData = querySnapshot.docs.map((doc) => ({
        //         ...doc.data(),
        //         user: doc.user,
        //         id: doc.id,
        //       }));
        //       setUser(userData);
        //     } catch (error) {
        //       console.error('Error fetching user profile: ', error);
        //     }
        //   };

        //   getUserProfile();
        // }, []);




        navigation.navigate("LogIn");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };




  return (
    <View style={styles.container}>
      <Block style={styles.form}>
        <Text style={styles.title}>Registration Form</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Block center>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleRegistration}>
            <Text color="white" size={16}>
              Register
            </Text>
          </TouchableOpacity>
        </Block>

      </Block>
    </View>
  );
};

const styles = StyleSheet.create({

  btn: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    width: '100%',
    padding: 15,
    paddingHorizontal: "30%",
    borderRadius: 5,
    alignItems: 'center',

  },

  form: {
    marginTop: 20,
    paddingHorizontal: 30,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default Register;
