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

const EditProfile = ({ route, navigation }) => {
  const { userProfile } = route.params;
  const modifyId = userProfile[0].email;

  // const [image, setImage] = useState(null);
  // const [ExistingImage, setExistingImage] = useState(user);

  const [image, setImage] = useState(null);
  const [file, setFile] = useState('');
  const [editedUser, setEditedUser] = useState(userProfile);

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
      const categoriesRef = collection(db, 'user');
      const docRef = doc(categoriesRef, modifyId); // replace 'document-id' with the ID of the document you want to update
      // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };

      // Ensure all fields are defined
      const userData = {
        firstName: editedUser[0]?.firstName || '',
        lastName: editedUser[0]?.lastName || '',
        email: editedUser[0]?.email || '',
        department: editedUser[0]?.department || '', // Make sure this field is handled properly
        education: editedUser[0]?.education || '',
        skills: editedUser[0]?.skills || '',
        profession: editedUser[0]?.profession || '',
        aboutMe: editedUser[0]?.aboutMe || '',
        profileImage: url,
        updatedDate: serverTimestamp(),
      };

      await updateDoc(docRef, userData);
      // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };

      console.log('Category updated successfully!');
      navigation.navigate('UserProfile', { userProfile: { ...editedUser } });
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
          <TouchableOpacity onPress={pickImage}>

            <Ionicons style={styles.ImagePickerButton} name="image-sharp" size={24} />
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {/* {!image && user.profileImage && <Image source={user.profileImage} style={styles.image} />} */}
        </View>
        <Block style={styles.detailsContainer}>
          <Text h5 style={styles.sectionTitle}>
            First Name:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser[0].firstName}
            // onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], firstName: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Last Name:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser[0].lastName}
            // onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], lastName: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Email:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            editable={false}
            value={editedUser[0].email}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], email: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Department:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser[0].department}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], department: text },
              }));
            }}
          />

          <Text h5 style={styles.sectionTitle}>
            Educational Details:
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
            Skills:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}

            value={editedUser[0].skills && editedUser.skills}
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
            value={editedUser[0].profession}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], profession: text },
              }));
            }}
          />
          <Text h5 style={styles.sectionTitle}>
            About Me:
          </Text>
          <Textarea

            containerStyle={styles.textareaAboutContainer}
            style={styles.input}
            value={editedUser[0].aboutMe}
            onChangeText={(text) => {
              setEditedUser((prevUser) => ({
                ...prevUser,
                [0]: { ...prevUser[0], aboutMe: text },
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
    marginTop: "5%",
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


export default EditProfile;
