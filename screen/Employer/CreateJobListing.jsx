import React, { useState } from 'react';
import { View, StyleSheet, ScrollView,Button,Image, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import defaultImagee from '../../assets/job1.jpg';
import {  } from 'react-native';
import Textarea from 'react-native-textarea/src/Textarea';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../../common/NavBar';
const CreateJobListing = ({ route, navigation }) => {
  // const { user } = route.params;
  // const [image, setImage] = useState(null);
  // const [ExistingImage, setExistingImage] = useState(user);
  // imgUrl:require("../assets/job1.jpg")
   const [image, setImage] = useState("");
   const [defaultImage, setDefaultImage] = useState(defaultImagee);
  // const [editedUser, setEditedUser] = useState(user);
  // const [editedEmail, setEditedEmail] = useState(user);
  // const [editedDept, setEditedDept] = useState(user);
  // const [editedSkills, setEditedSkills] = useState(user);
  // const [editedEducationalDetail, setEditedEducationalDetail] = useState(user);
  // const [editedprofession, setEditedprofession] = useState(user);
  // const [editedAboutMe, setEditedAboutMe] = useState(user);
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requirements: '',
    skills: '',
    professions: '',
    education: '',
    image: '',
  });

  const handleSaveChanges = () => {
    // Implement logic to save changes to the user profile
    // For simplicity, this example updates the user state directly.
    // In a real app, you might want to make an API call or use state management.
     console.log('Job created:', jobDetails);
    navigation.goBack(); // Navigate back to the job list screen after creating the job
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setImage(selectedImage);
      setJobDetails({ ...jobDetails, image: selectedImage });
    }
  };
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // }

  return (
  
    <ScrollView>
    
      <View style={styles.container}>
      <View style={styles.imgCont}>
          <Ionicons style={styles.ImagePickerButton} onPress={pickImage} name="image-sharp" size={24} />
          {/* {image && <Image source={image} style={styles.image} />} */}
          {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
        
          {!image && <Image source={defaultImage} style={styles.image}/>}
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <Block style={styles.detailsContainer}>
          <Text h5 style={styles.sectionTitle}>
            Title:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            onChangeText={text => setJobDetails({ ...jobDetails, title: text })}
          />

          <Text h5 style={styles.sectionTitle}>
           Description:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            
            onChangeText={(text) => setJobDetails({ ...jobDetails, department: text })}
          />

          <Text h5 style={styles.sectionTitle}>
            Requirements:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            onChangeText={(text) => setJobDetails({ ...jobDetails, requirements: text })}
          />

         

          <Text h5 style={styles.sectionTitle}>
            Skills:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
            
            onChangeText={(text) => setJobDetails({ ...jobDetails, skills: text })}
          />
          <Text h5 style={styles.sectionTitle}>
            Profession:
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.input}
           
            onChangeText={(text) => setJobDetails({ ...jobDetails, professions: text })}
          />
          <Text h5 style={styles.sectionTitle}>
            Educaton:
          </Text>
          <Textarea

            containerStyle={styles.textareaAboutContainer}
            style={styles.input}
          
            onChangeText={(text) => setJobDetails({ ...jobDetails, education: text })}
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


export default CreateJobListing;
