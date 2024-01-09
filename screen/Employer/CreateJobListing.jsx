import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,

} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import defaultImagee from '../../assets/job1.jpg';
import { } from 'react-native';
import Textarea from 'react-native-textarea/src/Textarea';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import materialTheme from '../../constants/Theme'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../FireBaseConfig';
import { useUser } from '../../common/context/UserContext';
import { serverTimestamp } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
// import DatePicker from "expo-datepicker";
import { Entypo } from "@expo/vector-icons";


import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

const CreateJobListing = ({ route, navigation }) => {
  const { userEmail, notification, role, userDocId } = useUser();
  const [endDate, setEndDate] = useState(new Date().toString());
  const [startDate, setStartDate] = useState(new Date().toString());
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





  // add from src

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDates = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
    console.log("selectedStartDate ", selectedStartDate)
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
    console.log("selectedStartDate ", selectedStartDate)
  };

  // add from src
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

      // console.log("Image URI:", uri, "aaaaaaaa");
      // console.log("File Blob:", blob);
    }
  };

  
  const sendNotification = async () => {
    try {
      // Retrieve all users with the role "employee"
      const employeeUsersRef =query( collection(db, 'user'),where('role', '==', 'employee'));
      const employeeUsersSnapshot = await getDocs(employeeUsersRef);
  
      // Iterate through employee users and send notifications
      employeeUsersSnapshot.forEach(async (userDoc) => {
        console.log("userDoc.data(); ",userDoc.data());
        if(userDoc.data().token){
          const { token } = userDoc.data();

        
          console.log("retoken ",token)
       // console.log("token ",token);
        try {
          console.log("token ",token);
          await Notifications.scheduleNotificationAsync({
            content: {
              to: token,
              title: "New Job Posted! 📬",
              body: 'Check out the latest job opportunity.',
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
      }
      });
    } catch (error) {
      console.error("Error sending notifications to employees:", error);
    }
  };
  // insert in to jobLists begin
  const handleSaveChanges = async (event) => {
    event.preventDefault();
    console.log("selectedStartDate ", selectedStartDate)
    if (!image) {
      alert("No file selected");
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
      // console.log('Uploaded an image to Firebase Storage!');

      // Get the download URL of the uploaded file
      const url = await getDownloadURL(fileRef);
      // console.log('Got the download URL:', url);

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
        applicants: [],
        createdDate: serverTimestamp(),
        startDate: startDate,
        endDate: selectedStartDate
      };


      await setDoc(doc(categoriesRef), newJobLists);


      // notification
      const notificationRef = collection(db, 'notification');
      const docNotificationRef = doc(notificationRef);
      const newNotificationLists = {
        jobId: docNotificationRef.id,
        title: jobDetails.title,
        description: jobDetails.description,
        // requirements: jobDetails.requirements,
        // skills: jobDetails.skills,
        // professions: jobDetails.professions,
        img: url,
        // education: jobDetails.education,
        email: userEmail,
        // applicants: [],
        createdDate: serverTimestamp(),
        startDate: startDate,
        endDate: selectedStartDate
      };


      await setDoc(doc(notificationRef), newNotificationLists);

//notifications

      console.log('Jobs added successfully!');
      // Send notification before navigation
     
        sendNotification();

    


      navigation.navigate("MyJobs");
    } catch (error) {
      console.error('Error adding Jobs: ', error);
    }
  };


 
  // console.log(startDate);
  //insert into jobLists end

  return (

    <ScrollView>

      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imgCont}>
            <Ionicons style={styles.ImagePickerButton} onPress={pickImage} name="image-sharp" size={24} />


            {!image && <Image source={defaultImage} style={styles.image} />}
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>

        </TouchableOpacity>
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
          <View >

            {/* <Text h5 style={styles.sectionTitle}>
              Start Date:
            </Text> */}
            {/* <DatePicker
              date={startDate}
              onChange={(date) => setStartDate(date)}
              icon={<Entypo name="chevron-right" size={40} color="#689CA3" />}
              minimumDate={new Date()}  // Set minimum date to today
              maximumDate={new Date(2025, 11, 3)}  // Set maximum date to the end of 2025
            />

            <Text h5 style={styles.sectionTitle}>
              End Date:
            </Text>
            <DatePicker
              date={endDate}

              onChange={(date) => setEndDate(date)}
              icon={<Entypo name="chevron-right" size={40} color="#689CA3" />}
              minimumDate={new Date()}  // Set minimum date to today
              maximumDate={new Date(2025, 11, 3)}  // Set maximum date to the end of 2025
            /> */}
          </View>


          {/* add from src */}



          {/* end */}
          <View style={{ width: "100%", paddingHorizontal: 22, marginTop: 64 }}>
            <View>
              <Text style={{ fontSize: 18 }}>Select End Date</Text>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPressStartDate}
              >
                <Text>{selectedStartDate}</Text>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              onPress={() => console.log("Subimit data")}
              style={styles.submitBtn}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Submit</Text>
            </TouchableOpacity> */}
          </View>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDates}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* add from src */}

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </Block>

      </View>

    </ScrollView >


  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    // marginTop: "5%",

  },
  datePickerContainer: {
    // flex: 1,
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
    // fontWeight: 'bold',
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
  },













  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});


export default CreateJobListing;
