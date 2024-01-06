// // import React from 'react';
// // import { View, Text, Button } from 'react-native';
// // import messaging, { firebase } from '@react-native-firebase/messaging';
// // import { useUser } from '../../common/context/UserContext';

// import { TouchableOpacity } from "react-native";

// // const Notification = () => {
// //   const notificationToken = useUser(); // Replace with the user's notification token
// //   console.log("notificationtoken ",notificationToken.notification)
// //   const handleSendNotification = async () => {
// //     if (notificationToken.notification) {
// //       try {
// //         const response = await messaging().sendToDevice(notificationToken.notification, {
// //           notification: {
// //             title: "You've got mail! 📬",
// //             body: "Hey, you've received a new notification!",
// //           },
// //         });

// //         console.log('Notification sent:', response);
// //       } catch (error) {
// //         console.error('Error sending notification:', error);
// //       }
// //     }
// //   };

// //   return (
// //     <View>
// //       <Text>Notification Component</Text>
// //       <Button title="Send Notification" onPress={handleSendNotification} />
// //     </View>
// //   );
// // };

// // export default Notification;
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import {  Platform } from 'react-native';
// import { Text } from "react-native-elements";
// import { useEffect } from "react";
// import { useUser } from "../../common/context/UserContext";
// const Notification=()=>{
// const {notification}=useUser();
//   async function schedulePushNotification() {
  
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           to:notification,
//           title: "You've got mail! 📬",
//           body: 'Here is the notification body',
//           data: { data: 'goes here' },
//           sound: "default",
//         },
//         trigger: { seconds: 2 },
//       });

 
//   }
//   return(
//     <TouchableOpacity onPress={async()=>await schedulePushNotification()}><Text>
//     click  </Text></TouchableOpacity>
//   )
// }

// export default Notification;


// // exports.sendNotification = async (req, res) => {
// //   console.log(req.params.id);
// //   console.log(req.body);
// //   const currentUser = await User.findById(req.params.id);
// //   const { msg } = req.body;
// //   console.log(currentUser);
// //   const pushToken = currentUser.pushToken;
// //   const expo = new Expo();
// //   if (pushToken) {
// //     const chunks = expo.chunkPushNotifications([
// //       {
// //         to: pushToken,
// //         title: "You've got mail! 📬",
// //         sound: "default",
// //         body: msg,
// //       },
// //     ]);

// //     const sendChunks = async () => {
// //       chunks.forEach(async (chunk) => {
// //         try {
// //           const tickets = await expo.sendPushNotificationsAsync(chunk);
// //         } catch (error) {
// //           console.log("Error sending chunk", error);
// //         }
// //       });
// //     };

// //     await sendChunks();
// //     res.status(201).json({
// //       status: "success",
// //       data: {
// //         msg: "success",
// //       },
// //     });
// //   }
// // };



import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Text } from "react-native-elements";
import { useEffect } from "react";
import { useUser } from "../../common/context/UserContext";

const Notification = () => {
  const { notification, role,userDocId } = useUser();

  useEffect(() => {
    // Check if the user is logged in and has a specific role (modify this condition accordingly)
    if (role === 'employer' && notification) {
      sendNotification();
    }
    // if (role === 'employee' && notification) {
    //   sendNotification();
    // }
  }, [role, notification,userDocId]);

  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          to: notification,
          title: "You've got mail! 📬"+role,
          body: 'new job',
          data: {
            data: 'goes here',
            icon: '🌟', // Add your desired icon or use emojis
            date: new Date().toLocaleDateString(), // Add the current date
          },
          sound: "default",
        },
        trigger: { seconds: 2 },
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return (
    <Text>Notification component</Text>
  );
}

export default Notification;
