import { Block ,Text} from 'galio-framework';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Images from '../constants/Images';
import materialTheme from '../constants/Theme';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from '../common/context/UserContext';
import { collection, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../FireBaseConfig';
import { useEffect  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {  Platform } from 'react-native';

const LogIn = ({navigation}) => {
  const [id,setId]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false);
  const {role,updateUser,updateDocId,updateRole,updateApply,updateNotification}=useUser();
 
  const auth=FIREBASE_AUTH;
  console.log("logOut role ",role);
  // jobdetails
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
  department: 'Software Engineer',
  profileImage: require("../assets/job2.jpg"),
  skills: ['React Native', 'JavaScript', 'UI/UX Design'],
  education: 'Bachelor of Computer Science, Example University',
  profession: 'Software Engineer',
  aboutMe: 'Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.',
};


// const handleLogIn=()=>{
//   navigation.navigate("UserProfile",{user});
// }



const handleLogIn = async () => {
  setLoading(true);
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    // Fetch user profile data
    const querySnapshot = await getDocs(userCollectionRef);
    const userData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      user: doc.user,
      id: doc.id,
    }));

    // Update user context and ID
    updateUser(email);
    updateDocId(userData.map(user =>
      console.log("user.id",user.id),
      user.id));
      console.log("uid ",userData[0].role);
      // updateDocId(userData[0].id);
    updateRole(userData[0].role);
    console.log("userData[0].apply ",userData[0])
    updateApply(userData[0].apply);
    // console.log("role for role ",userData[0].role);
    // Navigate to "NavBar"
    const token=await response.user.getIdToken();
    const tokenUserId=userData.map(user =>
      console.log("user.id",user.id),
      user.id)
      console.log("userData[0].id ",userData[0].id);

    await AsyncStorage.setItem('uId', userData[0].id);
    console.log("asyn ",userData[0].id)
    updateDocId(userData[0].id);
    await AsyncStorage.setItem('uRole', userData[0].role);
    await AsyncStorage.setItem('uEmail',email);

    const jsonValue = JSON.stringify(userData[0].apply);
    await AsyncStorage.setItem('uApply', jsonValue);
    updateApply(userData[0].apply);
    await AsyncStorage.setItem('isLoggedIn', token);
    console.log("userData[0].id ",userData[0].apply);
    console.log("userData[0].id ",userData[0]);
    


// // notification
// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     token = (await Notifications.getExpoPushTokenAsync({ projectId: 'b1134ed4-c689-49dc-aadf-2e22206366f8' })).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }



// const notificationToken =await registerForPushNotificationsAsync()
// console.log("notificationToken",notificationToken);

// await AsyncStorage.setItem('notificationToken',notificationToken);
// updateNotification(notificationToken);
// console.log(userData[0].id);

// const userDocRef = doc(collection(db, 'user'), userData[0].id);
// await updateDoc(userDocRef, { token:notificationToken });

navigation.navigate("NavBar");
  } catch (error) {
    alert("Sign in failed: " + error.message);
  } finally {
    setLoading(false);
  }
};



const [userProfile, setUser] = useState([]);
const userCollectionRef = query(collection(db, 'user'), where("email", "==", email));

useEffect(() => {
  const getUserProfile = async () => {
    try {
      const querySnapshot = await getDocs(userCollectionRef);
      const userData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        user: doc.user,
        id: doc.id,
      }));
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user profile: ', error);
    }
  };

  getUserProfile();
}, []);




  const handleRegistration = () => {
    // Add your registration logic here
    // console.log('Registration submitted:', { Email,password });
    navigation.navigate("Register");
    // You can send the data to a server for further processing
  };




  return (
    <View style={styles.container}>
        <Block style={styles.form}>
      <Text style={styles.title}>LogIn</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
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
              onPress={handleLogIn }>
             <Text color="white" size={16}>
                LogIn
              </Text>
            </TouchableOpacity>
          </Block>

          <Block  center>
          <Text style={styles.sign}  color="black" size={12}>
                If you don't have an account
              </Text>
            <TouchableOpacity
             
              onPress={handleRegistration }>
             <Text style={styles.signUp} >
                sign up
              </Text>
            </TouchableOpacity>
          </Block>

      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
signUp:{
  color: materialTheme.COLORS.BUTTON_COLOR,
  fontSize:15
},
 btn: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    width: '100%',
    padding: 15,
    paddingHorizontal:"40%",
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:10
  },
 
  
    container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form:{
    marginTop:20,
    paddingHorizontal:40,

}, 

sign:{
paddingBottom:8
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

export default LogIn;
