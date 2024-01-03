// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth,getReactNativePersistence } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "@firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLibdR23OxpPC1bu8XxmFFEB8mdfpzTDQ",
  authDomain: "job-board-3093a.firebaseapp.com",
  projectId: "job-board-3093a",
  storageBucket: "job-board-3093a.appspot.com",
  messagingSenderId: "720629171501",
  appId: "1:720629171501:web:69a382f755cafbf705bfa4",
  measurementId: "G-LYN6H3MZPS"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);
export const storage = getStorage(FIREBASE_APP);

// const auths = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(AsyncStorage)
// })