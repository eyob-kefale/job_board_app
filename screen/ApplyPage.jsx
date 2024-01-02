// import { theme } from 'galio-framework';
// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import materialTheme from '../constants/Theme';
// import { useNavigation } from '@react-navigation/native';




// import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
// import { db, storage } from "../FireBaseConfig";
// import { useUser } from '../common/context/UserContext';
// import { serverTimestamp } from 'firebase/firestore';
// // import * as DocumentPicker from 'expo-document-picker';
// import * as DocumentPicker from 'expo-document-picker';
// import { Button } from 'react-native-elements';
// import { getStorage, ref } from '@firebase/storage';
// const ApplyPage = ({ route }) => {
//   const [firstName, setFirstName] = useState('');
//   const [LastName, setLastName] = useState('');
//   const [age, setAge] = useState('');
//   const [profession, setProfession] = useState('');
//   const [coverLetter, setCoverLetter] = useState('');
//   const [fileUri, setFileUri] = useState(null); // Added state for file URI
//   const [file, setFile] = useState(null);
//   const [doc, setDoc] = useState(null);
//   const [apply, setApply] = useState([]);
//   const { docId } = route.params;
//   const { userEmail, userDocId } = useUser();
//   console.log(docId, "why");
//   const navigation = useNavigation();
//   // console.log("ffff",userDocId);
//   const handleSubmit = () => {
//     // Implement logic to submit the application
//     //console.log('Application submitted:', { firstName,LastName, email, resume, coverLetter });
//   };

//   // Request permissions before using the picker
//   const requestPermissions = async () => {
//     const { status } = await DocumentPicker.requestPermissionsAsync();
//     if (status !== 'granted') {
//       console.log('DocumentPicker permissions not granted');
//       // Handle permission denial
//       return;
//     }
//   };
//   const pickDocument = async () => {
//     try {
//       let result = await DocumentPicker.getDocumentAsync({
//         type: '*/*', // Allow any file type
//       });

//       // if (!result.uri) {
//       //   console.log('User cancelled document selection');
//       //   return;
//       // }

//       // Set the selected file
//       const uri = result.assets[0].uri;
//       const response = await fetch(uri);
//       const blob = await response.blob();

//       setFile(blob);
//       setFileUri(blob);
//       setDoc(uri);
//       // Use the file as needed, e.g., display its path or contents
//       console.log('Selected file:', uri);

//     } catch (error) {
//       console.error('Error picking document:', error);
//     }
//   };


//   // const handlePickDocument = async () => {

//   //   try {
//   //     const result = await DocumentPicker.getDocumentAsync({});
//   //     // if (result.type === 'success') {
//   //     setFileUri(result.assets[0].uri);
//   //     // console.log(fileUri," result ",result.assets[0].uri)
//   //     // }
//   //   } catch (error) {
//   //     console.error('Error picking document: ', error);
//   //   }
//   // };
//   // insert in to jobLists begin
//   const handleSaveChanges = async (event) => {
//     event.preventDefault();

//     // Validate inputs
//     if (!firstName || !LastName || !age || !profession || !coverLetter || !fileUri) {
//       alert('All fields must be filled out');
//       // You can display an alert or handle the validation error in a way you prefer
//       return;
//     }
//     try {
//       let url = '';
//       if (doc) {

//         const parts = doc.split('/');

//         // Get the last part of the array, which contains the filename
//         const filename = parts[parts.length - 1];



//         const storageRef = getStorage();
//         const filePath = 'user/' + filename;

//         // Upload the file to Firebase Storage
//         const fileRef = ref(storageRef, filePath);
//         const snapshot = await uploadBytes(fileRef, fileUri);
//         console.log('Uploaded a file to Firebase Storage!');

//         // Get the download URL of the uploaded file
//         url = await getDownloadURL(fileRef);
//         let urlImage = fileUri;
//         if (a) {
//           urlImage = url;
//         }
//         console.log('Got the download URL:', url);
//       }


//       // Fetch the current user data
//       const userRef = collection(db, 'user');
//       const docRef = doc(userRef, userDocId);
//       const getdocRef = doc(userRef, userDocId);
//       const docSnapshot = await getDoc(getdocRef);
//       const userData = docSnapshot.data();

//       // Check if the jobId is already in the userData.apply array
//       // Store the download URL and category name in Firestore
//       const categoriesRef = collection(db, 'application');
//       const newJobLists = {
//         firstName,
//         LastName,
//         age,
//         profession,
//         coverLetter,
//         email: userEmail,
//         jobId: docId,
//         fileUrl: url,
//         createdDate: serverTimestamp(),
//       };

//       // Create a document in the 'application' collection
//       setDoc(doc(categoriesRef), newJobLists);

//       // Update the user collection by adding the applied job
//       const updatedApply = [...userData.apply, docId];
//       const updatedUserData = {
//         apply: updatedApply,
//         updatedDate: serverTimestamp(),
//       };

//       // Update the document in the 'user' collection
//       await updateDoc(docRef, updatedUserData);

//       console.log('Application submitted successfully!');
//       navigation.navigate("MyApplication");

//     } catch (error) {
//       console.error('Error submitting application: ', error);
//     }
//   };



//   return (
//     <SafeAreaView style={styles.safeAreaView}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Apply for the Job</Text>
//       </View>

//       {/* Form */}
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Your First Name"
//             value={firstName}
//             onChangeText={text => setFirstName(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Your Last Name"
//             value={LastName}
//             onChangeText={text => setLastName(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Your Age"
//             value={age}
//             onChangeText={text => setAge(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Your Profession"
//             value={profession}
//             onChangeText={text => setProfession(text)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Write some description about the job"
//             multiline
//             numberOfLines={4}
//             value={coverLetter}
//             onChangeText={text => setCoverLetter(text)}
//           />
//           {/* File Picker Button */}
//           {/* <TouchableOpacity style={styles.filePickerButton} onPress={handlePickDocument}>
//             <Text style={styles.filePickerButtonText}>Pick Document</Text>
//           </TouchableOpacity> */}
//           {/* File Picker Button */}
//           <TouchableOpacity style={styles.filePickerButton} onPress={pickDocument}>
//             <Text style={styles.filePickerButtonText}>Pick Document</Text>
//           </TouchableOpacity>

//           {/* Submit Button */}
//           <TouchableOpacity style={styles.submitButton} onPress={handleSaveChanges}>
//             <Text style={styles.submitButtonText}>Submit Application</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaView: {
//     flex: 1,
//     margin: "5%"
//   },
//   header: {
//     backgroundColor: "#A2129A",
//     paddingVertical: 20,
//     alignItems: 'center',
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   formContainer: {
//     marginTop: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   submitButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: theme.COLORS.WHITE,
//     backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
//     borderColor: "#0766AD",
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     marginTop: 16,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   filePickerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: theme.COLORS.BUTTON_COLOR,
//     borderColor: '#0766AD',
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     marginTop: 16,
//   },
//   filePickerButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ApplyPage;



import { theme } from 'galio-framework';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import materialTheme from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from "../FireBaseConfig";
import { useUser } from '../common/context/UserContext';
import { uploadBytes, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as DocumentPicker from 'expo-document-picker';
import { serverTimestamp } from 'firebase/firestore';

const ApplyPage = ({ route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState('');
  const [fileUri, setFileUri] = useState(null);
  const [file, setFile] = useState(null);
  const [docUri, setDocUri] = useState(null);
  const { docId } = route.params;
  const { userEmail, userDocId } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await DocumentPicker.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('DocumentPicker permissions not granted');
      }
    };

    requestPermissions();
  }, []);


  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      // console.log('Selected file index: ',result.assets[0].uri);
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();

      setFile(blob);
      setFileUri(uri);
      setDocUri(uri);

      upload(blob, file);
      // console.log('Selected blob:', blob);
      // console.log('Selected response:', response);
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };


  const upload = (result, file) => {
    const name = file._data.name;
    const storageRef = ref(storage, `allFiles/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        if(progress==100){
          alert("document upload success")
        }
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setResume(downloadURL);
        });
      }
    );
  }



  const handleSaveChanges = async (event) => {
    event.preventDefault();




    if (!firstName || !lastName || !age || !profession || !coverLetter || !resume) {
      alert('All fields must be filled out');
      return;
    }

    try {

      const userRef = collection(db, 'user');
      const docRef = doc(userRef, userDocId);
      const getDocRef = doc(userRef, userDocId);
      const docSnapshot = await getDoc(getDocRef);
      const userData = docSnapshot.data();


      // start update jobPosts applicant field
      const jobRef = collection(db, 'jobLists');
      const docJobRef = doc(jobRef, docId);
      const getJobDocRef = doc(jobRef, docId);
      const docJobSnapshot = await getDoc(getJobDocRef);
      const jobData = docJobSnapshot.data();
     

      const categoriesRef = collection(db, 'application');
      const newJobLists = {
        firstName,
        lastName,
        age,
        profession,
        coverLetter,
        email: userEmail,
        jobId: docId,
        fileUrl: resume,
        createdDate: serverTimestamp(),
      };

      
// update user
      const updatedApply = [...userData.apply, docId];
      const updatedUserData = {
        apply: updatedApply,
        updatedDate: serverTimestamp(),
      };

      console.log(userEmail,"job update ",jobData.applicants)
      console.log(docId,"user update ",userData.apply)
      // update jobLists
      const updatedJobApply = [...jobData.applicants, userEmail];
      const updatedJobData = {
        applicants: updatedJobApply,
        updatedDate: serverTimestamp(),
      };
      await updateDoc(docRef, updatedUserData);
      await updateDoc(getJobDocRef, updatedJobData);

      // set to application collection
      setDoc(doc(categoriesRef), newJobLists);
      //end update jobPosts applicant field



      console.log('Application submitted successfully!');
      navigation.navigate("MyApplication");

    } catch (error) {
      console.error('Error submitting application: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Apply for the Job</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Age"
            value={age}
            onChangeText={text => setAge(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Profession"
            value={profession}
            onChangeText={text => setProfession(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Write some description about the job"
            multiline
            numberOfLines={4}
            value={coverLetter}
            onChangeText={text => setCoverLetter(text)}
          />
          <TouchableOpacity style={styles.filePickerButton} onPress={pickDocument}>
            <Text style={styles.filePickerButtonText}>Pick Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSaveChanges}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    margin: "5%"
  },
  header: {
    backgroundColor: "#A2129A",
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    borderColor: "#0766AD",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.BUTTON_COLOR,
    borderColor: '#0766AD',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  filePickerButtonText: {
    color: '#090909',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApplyPage;










