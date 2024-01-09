// // // import React from 'react';
// // // import { View, Text, Button } from 'react-native';
// // // import messaging, { firebase } from '@react-native-firebase/messaging';
// // // import { useUser } from '../../common/context/UserContext';

// // import { TouchableOpacity } from "react-native";

// // // const Notification = () => {
// // //   const notificationToken = useUser(); // Replace with the user's notification token
// // //   console.log("notificationtoken ",notificationToken.notification)
// // //   const handleSendNotification = async () => {
// // //     if (notificationToken.notification) {
// // //       try {
// // //         const response = await messaging().sendToDevice(notificationToken.notification, {
// // //           notification: {
// // //             title: "You've got mail! 📬",
// // //             body: "Hey, you've received a new notification!",
// // //           },
// // //         });

// // //         console.log('Notification sent:', response);
// // //       } catch (error) {
// // //         console.error('Error sending notification:', error);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <View>
// // //       <Text>Notification Component</Text>
// // //       <Button title="Send Notification" onPress={handleSendNotification} />
// // //     </View>
// // //   );
// // // };

// // // export default Notification;
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import * as Device from 'expo-device';
// // import * as Notifications from 'expo-notifications';
// // import {  Platform } from 'react-native';
// // import { Text } from "react-native-elements";
// // import { useEffect } from "react";
// // import { useUser } from "../../common/context/UserContext";
// // const Notification=()=>{
// // const {notification}=useUser();
// //   async function schedulePushNotification() {

// //       await Notifications.scheduleNotificationAsync({
// //         content: {
// //           to:notification,
// //           title: "You've got mail! 📬",
// //           body: 'Here is the notification body',
// //           data: { data: 'goes here' },
// //           sound: "default",
// //         },
// //         trigger: { seconds: 2 },
// //       });


// //   }
// //   return(
// //     <TouchableOpacity onPress={async()=>await schedulePushNotification()}><Text>
// //     click  </Text></TouchableOpacity>
// //   )
// // }

// // export default Notification;


// // // exports.sendNotification = async (req, res) => {
// // //   console.log(req.params.id);
// // //   console.log(req.body);
// // //   const currentUser = await User.findById(req.params.id);
// // //   const { msg } = req.body;
// // //   console.log(currentUser);
// // //   const pushToken = currentUser.pushToken;
// // //   const expo = new Expo();
// // //   if (pushToken) {
// // //     const chunks = expo.chunkPushNotifications([
// // //       {
// // //         to: pushToken,
// // //         title: "You've got mail! 📬",
// // //         sound: "default",
// // //         body: msg,
// // //       },
// // //     ]);

// // //     const sendChunks = async () => {
// // //       chunks.forEach(async (chunk) => {
// // //         try {
// // //           const tickets = await expo.sendPushNotificationsAsync(chunk);
// // //         } catch (error) {
// // //           console.log("Error sending chunk", error);
// // //         }
// // //       });
// // //     };

// // //     await sendChunks();
// // //     res.status(201).json({
// // //       status: "success",
// // //       data: {
// // //         msg: "success",
// // //       },
// // //     });
// // //   }
// // // };



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { Text } from "react-native-elements";
// import { useEffect } from "react";
// import { useUser } from "../../common/context/UserContext";

// const Notification = () => {
//   const { notification, role,userDocId } = useUser();

//   useEffect(() => {
//     // Check if the user is logged in and has a specific role (modify this condition accordingly)
//     if (role === 'employer' && notification) {
//       sendNotification();
//     }
//     // if (role === 'employee' && notification) {
//     //   sendNotification();
//     // }
//   }, [role, notification,userDocId]);

//   const sendNotification = async () => {
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           to: notification,
//           title: "//You've got mail! 📬"+role,
//           body: 'new job',
//           data: {
//             data: 'goes here',
//             icon: '🌟', // Add your desired icon or use emojis
//             date: new Date().toLocaleDateString(), // Add the current date
//           },
//           sound: "default",
//         },
//         trigger: { seconds: 2 },
//       });
//     } catch (error) {
//       console.error("Error scheduling notification:", error);
//     }
//   };

//   return (
//     <Text>Notification component</Text>
//   );
// }

// export default Notification;


import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'
import { useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../FireBaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import materialTheme from '../../constants/Theme'
import Search from '../../common/Search'
const Notification = ({navigation}) => {
  const [post, setPosts] = useState([])
  useEffect(() => {
    const fetchNotification = async () => {
      const fetchNot = collection(db, 'notification');
      //  console.log(getDocument.data());

      try {
        const data = await getDocs(fetchNot);


        // Check if data.docs is defined before mapping over it
        if (data.docs && data.docs.length > 0) {
          const jobIds = data.docs.map((doc) => doc.id);


          // Set the posts state with the data and include IDs
          setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } else {
          console.error('No documents found');
        }
      } catch (error) {
        console.error('Error fetching job lists: ', error);
      }
    }
    fetchNotification();
    console.log(post);
  }, [post])

  const view = [];
  
  const onShowMorePress = (id) => {
    // console.log("SingleJob ",id)
    view.push(id);
    navigation.navigate("SingleNotification", { id });

  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text) => {
    setSearchTerm(text);
  };
  const filteredInfo = post.filter((info) =>
    info.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("view ",view);
  const renderApplicationItem = ({ item, index }) => (

    <View key={item.id} style={styles.container}>

      <View key={item.id} style={styles.jobContainer}>
        <Image source={{ uri: item.img }} style={styles.jobImage} />
        <View style={styles.jobDetails}>
          <Text>

            {item.title}
          </Text>
          <Text style={styles.time}>
            <Text style={styles.closed}>
              The job open in
            </Text>
            <Text>  </Text>
            <Text style={styles.date}>
              {new Date(item.startDate).toLocaleDateString()}
            </Text>
          </Text>

          <Text style={styles.time}>
            <Text style={styles.closed}>
              The job closed in
            </Text>
            <Text>  </Text>
            <Text style={styles.date}>
            {item.endDate}
            </Text>
          </Text>

          <Text numberOfLines={3} style={styles.jobDescription}>
            {item.description}
          </Text>
          <TouchableOpacity onPress={() => onShowMorePress(item.jobId)}>
          <Text style={styles.seeMore} >see more</Text>

          </TouchableOpacity>

        </View>
      </View>

    </View>
  );

  return (
    <View style={styles.con}>
      <View style={styles.Search}>

        <Search
          searchTerm={post}
          placeholder="Search Jobs"
          handleSearch={handleSearch}

        />
      </View>
      <FlatList
        data={filteredInfo}
        renderItem={renderApplicationItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  con: {
    backgroundColor: "#fff",
    margin: "5%"
  }
  ,
  Search: {
    marginBottom: "5%",
    padding:"5%",
    paddingBottom:0
  },
  container: {
    flex: 1,
    padding: 16,
     marginBottom: "8%",
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date:{
    paddingRight:"5%"
  },
  closed:{
    paddingRight:"5%"
  },
  jobContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  jobDetails: {
    
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobOwner: {
    color: '#555',
    marginBottom: 8,
  },
  jobDescription: {
    color: '#777',
    marginBottom: 8,
  },
  seeMoreButton: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  seeMoreButtonText: {
    color: '#fff',
  },
  seeMore: {
    color: materialTheme.COLORS.BUTTON_COLOR,
    // paddingRight: 3,
    fontWeight: "300",
    // fontFamily:"san-serif"

  }
  ,

  card: {
    flex: 1,
    // margin: "5%"
  },

  TitleCont: {
    marginVertical: 0,
    // backgroundColor:"#fff",

    height: "25%",


  },
  textTitle: {
    paddingTop: "11%",
    width: '100%', // Set the width to 100%
    fontSize: 18,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center',
    color: materialTheme.COLORS.BUTTON_COLOR,
    //  flex:1,
    //  justifyContent:"center",
    // alignItems:"center"
  },
  titleBackground: {
    height: "100%",

    borderRadius: 60,
    // Add any additional styles for the TitleCont component
  },
});


export default Notification;