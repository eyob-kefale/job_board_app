import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import defaultImagee from '../../assets/job1.jpg';
import { } from 'react-native';
import Textarea from 'react-native-textarea/src/Textarea';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { collection, doc, setDoc } from 'firebase/firestore';
import materialTheme from '../../constants/Theme'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../FireBaseConfig';
import { useUser } from '../../common/context/UserContext';
import { serverTimestamp } from 'firebase/firestore';
import DatePicker from "expo-datepicker";
import { Entypo } from "@expo/vector-icons";
const CreateJobListing = ({ route, navigation }) => {
  const { userEmail } = useUser();
  const [date, setDate] = useState(new Date().toString());
  // console.log("create job   "+userEmail);
  const [image, setImage] = useState("");
  const [defaultImage, setDefaultImage] = useState(defaultImagee);
  const [file, setFile] = useState('');
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requirements: '',
    skills: '',
    professions: '',
    education: '',
    image: '',
  });

// date create date formate
// Assuming you have a Firestore timestamp (serverTimestamp) stored in a variable
// const firestoreTimestamp = serverTimestamp();

// // Convert Firestore timestamp to JavaScript Date object
// const jsDate = firestoreTimestamp.toDate();

// // Format the JavaScript Date object to the desired date format (year/month/day)
// const formattedDate = jsDate.toLocaleDateString('en-US'); // You can adjust the locale based on your preference


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
      setJobDetails({ ...jobDetails, image: uri });

      console.log("Image URI:", uri, "aaaaaaaa");
      console.log("File Blob:", blob);
    }
  };

  // insert in to jobLists begin
  const handleSaveChanges = async (event) => {
    event.preventDefault();

    if (!image) {
      console.log("No file selected");
      return;
    }

    try {



      const parts = image.split('/');

      // Get the last part of the array, which contains the filename
      const filename = parts[parts.length - 1];

      const storageRef = storage;
      const filePath = 'jobLists/' + filename;

      // // Upload the file to Firebase Storage
      const fileRef = ref(storageRef, filePath);
      const snapshot = await uploadBytes(fileRef, file, { contentType: 'image/jpeg' });
      console.log('Uploaded an image to Firebase Storage!');

      // Get the download URL of the uploaded file
      const url = await getDownloadURL(fileRef);
      console.log('Got the download URL:', url);

      // Store the download URL and category name in Firestore
      const categoriesRef = collection(db, 'jobLists');
      const docRef = doc(categoriesRef);
      const newJobLists = {
        jobId: docRef.id,
        title: jobDetails.title,
        description: jobDetails.description,
        requirements: jobDetails.requirements,
        skills: jobDetails.skills,
        professions: jobDetails.professions,

        img: url,
        education: jobDetails.education,
        employer: userEmail,

        createdDate: serverTimestamp(),
        endDate:date
      };


      await setDoc(doc(categoriesRef), newJobLists);


      console.log('Jobs added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding Jobs: ', error);
    }
  };

console.log(date)
  //insert into jobLists end

  return (

    <ScrollView>

      <View style={styles.container}>
        <View style={styles.imgCont}>
          <Ionicons style={styles.ImagePickerButton} onPress={pickImage} name="image-sharp" size={24} />


          {!image && <Image source={defaultImage} style={styles.image} />}
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

            onChangeText={(text) => setJobDetails({ ...jobDetails, description: text })}
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
          <View style={styles.datePickerContainer}>
          <DatePicker
            date={date}
            onChange={(date) => setDate(date)}
            icon={<Entypo name="chevron-right" size={40} color="#689CA3" />}
            minimumDate={new Date()}  // Set minimum date to today
            maximumDate={new Date(2025, 11, 31)}  // Set maximum date to the end of 2025
          />
          </View>

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
  datePickerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
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

    marginLeft: "90%",
    top: "90%",

  },
  image: {
    marginBottom: "10%",
    width: "100%",
    height: 250,
    // borderRadius: 60,
    resizeMode: "cover",
  },
  imgCont: {
    flex: 1,
    alignItems: 'center',


    //  justifyContent: 'center' 
  }
});


export default CreateJobListing;
