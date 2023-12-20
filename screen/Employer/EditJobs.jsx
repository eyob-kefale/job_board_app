import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { } from 'react-native';
import Textarea from 'react-native-textarea/src/Textarea';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import materialTheme from '../../constants/Theme'

import { db } from '../../FireBaseConfig';

import { doc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore';

const EditJobs = ({ route, navigation }) => {
  const { posts } = route.params;
  const modifyId = posts[0].title;
console.log(posts);
  // const [image, setImage] = useState(null);
  // const [ExistingImage, setExistingImage] = useState(user);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState('');
  const [editedUser, setEditedUser] = useState(posts);

  const [a, setA] = useState(false);
  


  // const handleSaveChanges = () => {
  //   // Implement logic to save changes to the user profile
  //   // For simplicity, this example updates the user state directly.
  //   // In a real app, you might want to make an API call or use state management.
  //   navigation.navigate('UserProfile', { userProfile: { ...editedUser, profileImage: image } });
  //   //navigation.goBack(); // Navigate back to the job list screen after creating the job
  // };


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

      console.log("Image URI:", uri, "aaaaaaaa");
      console.log("File Blob:", blob);
    }
  };



  //start updating user profile
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {

      const parts = image.split('/');

      // Get the last part of the array, which contains the filename
      const filename = parts[parts.length - 1];



      const storageRef = getStorage();
      const filePath = 'user/' + filename;

      // Upload the file to Firebase Storage
      const fileRef = ref(storageRef, filePath);
      const snapshot = await uploadBytes(fileRef, file, { contentType: 'image/jpeg' });
      console.log('Uploaded a file to Firebase Storage!');

      // Get the download URL of the uploaded file
      const url = await getDownloadURL(fileRef);
      let urlImage = file;
      if (a) {
        urlImage = url;
      }
      console.log('Got the download URL:', url);

    
      // Update the document with the new data and file URL
      const categoriesRef = collection(db, 'jobLists');
      const docRef = doc(categoriesRef, modifyId); // replace 'document-id' with the ID of the document you want to update
      // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };

      // Ensure all fields are defined
      const userData = {
        description: editedUser[0]?.description || '',
        education: editedUser[0]?.education || '',
        professions: editedUser[0]?.professions || '',
        requirements: editedUser[0]?.requirements || '', // Make sure this field is handled properly
        skills: editedUser[0]?.skills || '',
        img: url,
        updatedDate: serverTimestamp(),
      };

      await updateDoc(docRef, userData);
      // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };

      console.log('Category updated successfully!');
      navigation.navigate('EmployeerProfile', { posts: { ...editedUser } });
      // window.location.reload();
      // navigation.goBack();
     
    } catch (error) {
 
      console.error('Error updating category: ', error);
    }
  };


  // end updating user profile


  return (

    <ScrollView>
    
    <View style={styles.container}>
    <View style={styles.imgCont}>
        <Ionicons style={styles.ImagePickerButton} onPress={pickImage} name="image-sharp" size={24} />
     
      
        {!image && <Image source={{ uri:editedUser[0].img}} style={styles.image}/>}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <Block style={styles.detailsContainer}>
        <Text h5 style={styles.sectionTitle}>
          Title:
        </Text>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.input}
          value={editedUser[0].title}
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
          onChangeText={(text) => {
            setEditedUser((prevUser) => ({
              ...prevUser,
              [0]: { ...prevUser[0], description: text },
            }));
          }}
        />

        <Text h5 style={styles.sectionTitle}>
          Requirements:
        </Text>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.input}
          value={editedUser[0].description}
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
          Profession:
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
        <Text h5 style={styles.sectionTitle}>
          Educaton:
        </Text>
        <Textarea

          containerStyle={styles.textareaAboutContainer}
          style={styles.input}
          value={editedUser[0].education}
          onChangeText={(text) => {
            setEditedUser((prevUser) => ({
              ...prevUser,
              [0]: { ...prevUser[0], education: text },
            }));
          }}
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
      backgroundColor: "#fff",
      flex: 1,
      padding: 16,
      marginTop: "5%",
     
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
      backgroundColor: '#3498db',
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
    
      marginLeft: "90%",
      top:"90%",
      
    },
    image:{ 
      marginBottom:"10%",
      width: "100%",
      height: 250,
      // borderRadius: 60,
      resizeMode: "cover",
    },
    imgCont:{
       flex: 1,
       alignItems: 'center',
    
  
      //  justifyContent: 'center' 
    }
});


export default EditJobs;
