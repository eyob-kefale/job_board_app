import { theme } from 'galio-framework';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import materialTheme from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, setDoc,updateDoc } from 'firebase/firestore';
import { db, storage } from '../FireBaseConfig';
import { useUser } from '../common/context/UserContext';
import { serverTimestamp } from 'firebase/firestore';
const ApplyPage = ({route}) => {
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [apply,setApply]=useState([]);
  const { docId }=route.params;
  const { userEmail,userDocId } = useUser(); 
console.log(docId,"why");
  const navigation = useNavigation();
// console.log("ffff",userDocId);
  const handleSubmit = () => {
    // Implement logic to submit the application
    //console.log('Application submitted:', { firstName,LastName, email, resume, coverLetter });
  };


// insert in to jobLists begin
const handleSaveChanges = async (event) => {
  event.preventDefault();


  try {

      // Store the download URL and category name in Firestore
      const categoriesRef = collection(db, 'application');

      const newJobLists = {
          firstName,
          LastName,
          age,
          profession,
          coverLetter,
           email:userEmail,
           jobId:docId,
          createdDate: serverTimestamp(), 
      };


      await setDoc(doc(categoriesRef), newJobLists);
      setApply(docId);
// update the use collection by adding applied jobs
  // Update the document with the new data and file URL
   // Update the document with the new data and file URL
   const userRef = collection(db, 'user');
   const docRef = doc(userRef, userDocId); // replace 'document-id' with the ID of the document you want to update
   // const newData = { name: category, photo: urlImage, updatedDate: serverTimestamp() };
  
   const getdocRef = doc(userRef, userDocId);

    // Fetch the current user data
    const docSnapshot = await getDoc(getdocRef);
    const userData = docSnapshot.data();
  
   const updatedApply = [...userData.apply, docId];
   // Ensure all fields are defined
   const updatedUserData = {
    apply:updatedApply,
     updatedDate: serverTimestamp(),
   };

   await updateDoc(docRef, updatedUserData);

      console.log('applicant apply successfully!');
      navigation.navigate("MyApplication");
  } catch (error) {
      console.error('Error adding Jobs: ', error);
  }
};


  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Apply for the Job</Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
           <TextInput
            style={styles.input}
            placeholder="Your Last Name"
            value={LastName}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Age"
            value={age}
            onChangeText={(text) => setAge(text)}
          />
             <TextInput
            style={styles.input}
            placeholder="Your Profession"
            value={profession}
            onChangeText={(text) => setProfession(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Write some description about the job"
            multiline
            numberOfLines={4}
            value={coverLetter}
            onChangeText={(text) => setCoverLetter(text)}
          />

          {/* Submit Button */}
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
    margin:"5%"
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
    // backgroundColor: theme.COLORS.WHITE,
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
});

export default ApplyPage;
