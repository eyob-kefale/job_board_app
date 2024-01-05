// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
// import { Block, Text, theme } from 'galio-framework';

// import { } from 'react-native';
// import Textarea from 'react-native-textarea/src/Textarea';
// import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';
// import materialTheme from '../../constants/Theme'

// import { db } from '../../FireBaseConfig';

// import { doc, getDoc, collection, updateDoc, getDocs } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { serverTimestamp } from 'firebase/firestore';
// import { useEffect } from 'react';

// const EditJobs = ({ route, navigation }) => {
//   const { docId } = route.params;
//   const [posts, setPosts] = useState([]);
//   const [editedUser, setEditedUser] = useState([]);
//   const [image, setImage] = useState(null);
//   const [file, setFile] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const jobListsCollectionRef = collection(db, 'jobLists');
//     const jobQuery = query(jobListsCollectionRef, where('jobId', '==', docId));

//     const getJoblists = async () => {
//       try {
//         const data = await getDocs(jobQuery);
//         console.log('employeryy ', data.docs[0].data());
//         setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         console.log('employeryy', data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       } catch (error) {
//         console.error('Error fetching job lists: ', error);
//       }
//     };

//     getJoblists();
//   }, [docId]);

//   useEffect(() => {
//     setEditedUser(posts[0] || {});
//   }, [posts]);


// // useEffect(() => {
// //   setEditedUser(posts[0] || {});
// // }, [posts]);


//   // picking image from file
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       const response = await fetch(uri);
//       const blob = await response.blob();

//       setFile(blob);
//       setImage(uri);
//       setEditedUser({ ...editedUser, image: uri });

//       console.log("Image URI:", uri, "aaaaaaaa");
//       console.log("File Blob:", blob);
//     }
//   };
//   console.log(editedUser,"----- docId  -------",posts);


//   //start updating user profile
//   const handleUpdate = async (event) => {
//     event.preventDefault();

//     try {
//       if (!image) {
//         console.error('Image is undefined');
//         return;
//       }

//       const parts = image.split('/');

//       // Get the last part of the array, which contains the filename
//       const filename = parts[parts.length - 1];



//       const storageRef = getStorage();
//       const filePath = 'job/' + filename;

//       // Upload the file to Firebase Storage
//       const fileRef = ref(storageRef, filePath);
//       const snapshot = await uploadBytes(fileRef, file, { contentType: 'image/jpeg' });
//       console.log('Uploaded a file to Firebase Storage!');

//       // Get the download URL of the uploaded file
//       const url = await getDownloadURL(fileRef);
//       let urlImage = file;
//       if (a) {
//         urlImage = url;
//       }
//       console.log('Got the download URL:', url);


//       // Update the document with the new data and file URL
//       const categoriesRef = collection(db, 'jobLists');
//       const docRef = doc(categoriesRef, docId); // replace 'document-id' with the ID of the document you want to update
//       // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() }; 
//         console.log(docId);
//       // Ensure all fields are defined
//       const userData = {
//         title:editedUser[0]?.title||'',
//         description: editedUser[0]?.description || '',
//         education: editedUser[0]?.education || '',
//         professions: editedUser[0]?.professions || '',
//         requirements: editedUser[0]?.requirements || '', // Make sure this field is handled properly
//         skills: editedUser[0]?.skills || '',
//         img: url,
//         updatedDate: serverTimestamp(),
//       };

//       await updateDoc(docRef, userData);
//       // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };

//       console.log('Category updated successfully!');
//       navigation.navigate('EmployeerProfile', { posts: { ...editedUser } });
//       // window.location.reload();
//       // navigation.goBack();

//     } catch (error) {

//       console.error('Error updating category: ', error);
//     }
//   };

//   console.log('Category updated successfully! ',editedUser[0]);
//   // end updating user profile


//   return (

//     <ScrollView>

//     <View style={styles.container}>
//     <View style={styles.imgCont}>
//         <Ionicons style={styles.ImagePickerButton} onPress={pickImage} name="image-sharp" size={24} />
//         {image && <Image source={{ uri: image }} style={styles.image} />}
//           {
//             !image && (
//               editedUser[0].img ? (
//                 <Image source={require("../../assets/default.jpeg")} style={styles.image} />
//               ) : (
//                 <Image source={require("../../assets/default.jpeg")} style={styles.image} />
//               )
//             )
//           }
//       </View>
//       <Block style={styles.detailsContainer}>
//         <Text h5 style={styles.sectionTitle}>
//           Title:
//         </Text>
//         <Textarea
//           containerStyle={styles.textareaContainer}
//           style={styles.input}
//           value={editedUser[0].title}
//           onChangeText={(text) => {
//             setEditedUser((prevUser) => ({
//               ...prevUser,
//               [0]: { ...prevUser[0], title: text },
//             }));
//           }}
//         />

//         <Text h5 style={styles.sectionTitle}>
//          Description:
//         </Text>
//         <Textarea
//           containerStyle={styles.textareaContainer}
//           style={styles.input}
//           value={editedUser[0].description}
//           onChangeText={(text) => {
//             setEditedUser((prevUser) => ({
//               ...prevUser,
//               [0]: { ...prevUser[0], description: text },
//             }));
//           }}
//         />

//         <Text h5 style={styles.sectionTitle}>
//           Requirements:
//         </Text>
//         <Textarea
//           containerStyle={styles.textareaContainer}
//           style={styles.input}
//           value={editedUser[0].description}
//           onChangeText={(text) => {
//             setEditedUser((prevUser) => ({
//               ...prevUser,
//               [0]: { ...prevUser[0], requirements: text },
//             }));
//           }}
//         />



//         <Text h5 style={styles.sectionTitle}>
//           Skills:
//         </Text>
//         <Textarea
//           containerStyle={styles.textareaContainer}
//           style={styles.input}
//           value={editedUser[0].skills}
//           onChangeText={(text) => {
//             setEditedUser((prevUser) => ({
//               ...prevUser,
//               [0]: { ...prevUser[0], skills: text },
//             }));
//           }}
//         />
//         <Text h5 style={styles.sectionTitle}>
//           Profession:
//         </Text>
//         <Textarea
//           containerStyle={styles.textareaContainer}
//           style={styles.input}
//           value={editedUser[0].professions}
//           onChangeText={(text) => {
//             setEditedUser((prevUser) => ({
//               ...prevUser,
//               [0]: { ...prevUser[0], professions: text },
//             }));
//           }}
//         />
//         <Text h5 style={styles.sectionTitle}>
//           Educaton:
//         </Text>
//         <Textarea

//           containerStyle={styles.textareaAboutContainer}
//           style={styles.input}
//           value={editedUser[0].education}
//           onChangeText={(text) => {
//             setEditedUser((prevUser) => ({
//               ...prevUser,
//               [0]: { ...prevUser[0], education: text },
//             }));
//           }}
//         />

//         <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       </Block>

//     </View>

//   </ScrollView>


//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: "#fff",
//       flex: 1,
//       padding: 16,
//       marginTop: "5%",

//     },
//     detailsContainer: {
//       // marginTop: 20,
//     },
//     sectionTitle: {
//       color: '#000',
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginLeft: 10
//       // marginBottom: 8,
//       // marginTop: 13,
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: theme.COLORS.INFO,
//       borderRadius: 8,
//       padding: 8,
//       // marginBottom: 16,
//     },
//     textareaContainer: {
//       height: 70,
//       padding: 5,
//       // marginBottom: 16,
//     },
//     textareaAboutContainer: {
//       height: 150,
//       padding: 5,
//     }
//     ,
//     saveButton: {
//       backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
//       padding: 12,
//       borderRadius: 8,
//       marginTop: "10%",
//       marginBottom: "7%",
//       alignItems: 'center',
//     },
//     saveButtonText: {
//       color: '#fff',
//       fontSize: 16,
//     },

//     ImagePickerButton: {

//       marginLeft: "90%",
//       top:"90%",

//     },
//     image:{ 
//       marginBottom:"10%",
//       width: "100%",
//       height: 250,
//       // borderRadius: 60,
//       resizeMode: "cover",
//     },
//     imgCont:{
//        flex: 1,
//        alignItems: 'center',


//       //  justifyContent: 'center' 
//     }
// });


// export default EditJobs;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { } from 'react-native';
import Textarea from 'react-native-textarea/src/Textarea';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import materialTheme from '../../constants/Theme'

import { db } from '../../FireBaseConfig';

import { doc, getDoc, collection, updateDoc, getDocs, where, query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore';
import DatePicker from 'expo-datepicker';
import { Entypo } from "@expo/vector-icons";
const EditJobs = ({ route, navigation }) => {
  const { posts, docId } = route.params;
  //  const modifyId = userProfile[0].email;

  // console.log("edddd", docId, " docId ");
  // const [image, setImage] = useState(null);
  // const [ExistingImage, setExistingImage] = useState(user);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState('');
  const [editedUser, setEditedUser] = useState(posts);
  const [date, setDate] = useState(new Date().toString());
  const [a, setA] = useState(false);


  // picking image from file
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();

      setFile(blob);
      setImage(uri);
      setEditedUser({ ...editedUser, image: uri });

      // console.log("Image URI:", uri, "aaaaaaaa");
      // console.log("File Blob:", blob);
    }
  };



  //start updating user profile
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      let url = '';
      if (image) {

        const parts = image.split('/');

        // Get the last part of the array, which contains the filename
        const filename = parts[parts.length - 1];



        const storageRef = getStorage();
        const filePath = 'job/' + filename;

        // Upload the file to Firebase Storage
        const fileRef = ref(storageRef, filePath);
        const snapshot = await uploadBytes(fileRef, file, { contentType: 'image/jpeg' });
        console.log('Uploaded a file to Firebase Storage!');

        // Get the download URL of the uploaded file
        url = await getDownloadURL(fileRef);
        let urlImage = file;
        if (a) {
          urlImage = url;
        }
        console.log('Got the download URL:', url);
      }



      // Update the document with the new data and file URL
      const categoriesRef = collection(db, 'jobLists');
      const _query = query(categoriesRef, where('jobId', '==', docId));
      const querySnapshot = await getDocs(_query);// replace 'document-id' with the ID of the document you want to update
      // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };
      var profileImages = editedUser[0].img;
      if (image) {
        profileImages = url;
      }

      if (!querySnapshot.empty) {
        // Assuming there's only one document with the specified jobId; modify as needed
        const docRef = querySnapshot.docs[0].ref;
        // Ensure all fields are defined
        const userData = {
          title: editedUser[0]?.title || '',
          description: editedUser[0]?.description || '',
          education: editedUser[0]?.education || '',
          employer: editedUser[0]?.employer || '', // Make sure this field is handled properly
          professions: editedUser[0]?.professions || '',
          skills: editedUser[0]?.skills || '',
          requirements: editedUser[0]?.requirements || '',
          img: profileImages,
          endDate: date,
          updatedDate: serverTimestamp(),
        };

        await updateDoc(docRef, userData);
      }

      // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };

      // console.log('Category updated successfully! ',docRef);
      // navigation.navigate('SingleJob');
      // window.location.reload();
       navigation.goBack();

    } catch (error) {

      console.error('Error updating category: ', error);
    }
  };


  // end updating user profile


  return (

    <ScrollView>

      <View style={styles.container}>
        <View style={styles.imgCont}>
          <TouchableOpacity onPress={pickImage}>

            <Ionicons style={styles.ImagePickerButton} name="image-sharp" size={24} />

            {image && <Image source={{ uri: image }} style={styles.image} />}
            {
              !image && (
                editedUser[0].img ? (
                  <Image source={{ uri: editedUser[0].img }} style={styles.image} />
                ) : (
                  <Image source={require("../../assets/default.jpeg")} style={styles.image} />
                )
              )
            }
          </TouchableOpacity>
        </View>
        <Block style={styles.detailsContainer}>
          <Text h5 style={styles.sectionTitle}>
            Title
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser[0].title}
            // onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], title: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Description:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser[0].description}
            // onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], description: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Education:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}

            value={editedUser[0].education}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], education: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Employer:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            editable={false}
            style={styles.input}
            value={editedUser[0].employer}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], employer: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Requirements:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser[0].requirements}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], requirements: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Skills:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}

            value={editedUser[0].skills}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], skills: text },
              }));
            }}
          />
          <Text h5 style={styles.sectionTitle}>
            Professions:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser[0].professions}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], professions: text },
              }));
            }}
          />
          <DatePicker
            date={date}
            onChange={(date) => setDate(date)}
            icon={<Entypo name="chevron-right" size={40} color="#689CA3" />}
            minimumDate={new Date()}  // Set minimum date to today
            maximumDate={new Date(2025, 11, 31)}  // Set maximum date to the end of 2025
          />



          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </Block>

      </View>

    </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: "5%",
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  detailsContainer: {
    // marginTop: 20,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
    // marginBottom: 8,
    // marginTop: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.COLORS.INFO,
    borderRadius: 8,
    padding: 8,
    // marginBottom: 16,
  },
  textareaContainer: {
    height: 70,
    padding: 5,
    // marginBottom: 16,
  },
  textareaAboutContainer: {
    height: 150,
    padding: 5,
  }
  ,
  saveButton: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    padding: 12,
    borderRadius: 8,
    marginTop: "10%",
    marginBottom: "7%",
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  ImagePickerButton: {

    marginLeft: "30%",
    top: "80%",
  },
  image: {

    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",

  },
  imgCont: {
    flex: 1,
    alignItems: 'center',
    //  justifyContent: 'center' 
  }
});


export default EditJobs;
