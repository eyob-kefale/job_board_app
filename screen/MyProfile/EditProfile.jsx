import React, { useState } from 'react';
import { View, StyleSheet, ScrollView,Button,Image, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import {  } from 'react-native';
import Textarea from 'react-native-textarea/src/Textarea';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
const EditProfile = ({ route, navigation }) => {
  const { user } = route.params;
  // const [image, setImage] = useState(null);
  // const [ExistingImage, setExistingImage] = useState(user);

  const [image, setImage] = useState(null);
  const [editedUser, setEditedUser] = useState(user);
  const [editedEmail, setEditedEmail] = useState(user);
  const [editedDept, setEditedDept] = useState(user);
  const [editedSkills, setEditedSkills] = useState(user);
  const [editedEducationalDetail, setEditedEducationalDetail] = useState(user);
  const [editedprofession, setEditedprofession] = useState(user);
  const [editedAboutMe, setEditedAboutMe] = useState(user);


  const handleSaveChanges = () => {
    // Implement logic to save changes to the user profile
    // For simplicity, this example updates the user state directly.
    // In a real app, you might want to make an API call or use state management.
    navigation.navigate('UserProfile', { user: { ...editedUser, profileImage: image } });
  };
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.imgCont}>
          <Ionicons style={styles.ImagePickerButton} onPress={pickImage} name="image-sharp" size={24} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {!image && user.profileImage && <Image source={user.profileImage} style={styles.image} />}
        </View>
        <Block style={styles.detailsContainer}>
          <Text h5 style={styles.sectionTitle}>
            Name:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedUser.name}
            onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
          />

          <Text h5 style={styles.sectionTitle}>
            Email:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedEmail.email}
            onChangeText={(text) => setEditedEmail({ ...editedEmail, email: text })}
          />

          <Text h5 style={styles.sectionTitle}>
            Department:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedDept.department}
            onChangeText={(text) => setEditedDept({ ...editedDept, department: text })}
          />

          <Text h5 style={styles.sectionTitle}>
            Educational Details:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedEducationalDetail.education}
            onChangeText={(text) => setEditedEducationalDetail({ ...editedEducationalDetail, education: text })}
          />

          <Text h5 style={styles.sectionTitle}>
            Skills:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedSkills.skills.join(", ")}
            onChangeText={(text) => setEditedSkills({ ...editedSkills, skills: text })}
          />
          <Text h5 style={styles.sectionTitle}>
            Profession:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            value={editedprofession.profession}
            onChangeText={(text) => setEditedprofession({ ...editedprofession, skills: text })}
          />
          <Text h5 style={styles.sectionTitle}>
            About Me:
          </Text>
          <Textarea

            containerStyle={styles.textareaAboutContainer}
            style={styles.input}
            value={editedAboutMe.aboutMe}
            onChangeText={(text) => setEditedAboutMe({ ...editedAboutMe, aboutMe: text })}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </Block>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  
    marginLeft: "30%",
    top:"80%",
  },
  image:{ 

    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  
  },
  imgCont:{
     flex: 1,
     alignItems: 'center', 
    //  justifyContent: 'center' 
  }
});


export default EditProfile;
