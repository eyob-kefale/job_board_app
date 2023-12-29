import React from 'react';
import { ImageBackground } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import materialTheme from '../../constants/Theme'
import { firebase } from 'firebase/app'; // Make sure to import 'firebase/app' to get the 'firebase' namespace

import { FieldPath } from 'firebase/firestore';
import { collection, getDocs, query, where, arrayContains, getDoc, doc } from 'firebase/firestore';
import { db } from '../../FireBaseConfig';
import { useUser } from '../../common/context/UserContext';
import { useEffect } from 'react';
import { useState } from 'react';
const Applicants = ({route}) => {
  const {jobId}=route.params;
  const { userEmail, userDocId } = useUser();
  const [appliedJobs, setAppliedJobs] = useState([]);
 
  // const jobApplications = [
  //   {
  //     jobId: 1,
  //     jobTitle: 'Software Developer',
  //     jobOwner: 'Tech Co',
  //     jobImage: require('../../assets/job1.jpg'),
  //     jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  //   },
  //   {
  //     jobId: 1,
  //     jobTitle: 'Software Developer',
  //     jobOwner: 'Tech Co',
  //     jobImage: require('../../assets/job1.jpg'),
  //     jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  //   },
  //   {
  //     jobId: 1,
  //     jobTitle: 'Software Developer',
  //     jobOwner: 'Tech Co',
  //     jobImage: require('../../assets/job1.jpg'),
  //     jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  //   },
  //   {
  //     jobId: 1,
  //     jobTitle: 'Software Developer',
  //     jobOwner: 'Tech Co',
  //     jobImage: require('../../assets/job1.jpg'),
  //     jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  //   },
  //   // Add more job applications as needed
  // ];
  const navigation = useNavigation();
  const handleMyApplocation = (id,jobId) => {
    navigation.navigate("SingleJob",{id,jobId});
    // navigation.navigate("EmployeerProfile",{id});
  }
  // const handleSeeMore = (jobId) => {
  //   // Handle navigation to see more details about the job (you can implement this based on your navigation structure)
  //   // For example, you can use React Navigation to navigate to a detailed job view.
  //   // console.log(`See more for job ${jobId}`);
  // };

const handleEmployerProfile=(user)=>{
  console.log("employer-id ",user);
    navigation.navigate("UserProfile",{user});
}


  // Function to fetch jobs based on user's applied job IDs
  const fetchAppliedJobs = async (applicantIds) => {
    try {

      const jobListsCollectionRef = collection(db, 'user');
      const queryRef = query(jobListsCollectionRef, where('uid', 'array-contains', applicantIds));
      // console.log("jobs ")
      // const querySnapshot = await getDocs(queryRef);


      // // Extract and return the job data
      // // const jobs = querySnapshot.cs.map((c) => ({ ...c.data(), id: doc.id }));
      // setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const users = [];
      for (const applicantId of applicantIds) {
        const docRef = doc(jobListsCollectionRef, applicantId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists) {
          users.push(docSnapshot.data());
        }
      }
    
      return users;
    } catch (error) {
      console.error('Error fetching applied user: ', error);
      return [];
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      // console.log(userDocId)
      // Assuming you have the user document with the 'apply' field containing job IDs
     const jobRef=doc(db,'jobLists',jobId);

      // const userRef = doc(db, 'user', userDocId);

      // Fetch the user document
      const jobDocSnapshot = await getDoc(jobRef);
      const jobData = jobDocSnapshot.data();

      // console.log("userData ", userData.apply);
      // Fetch jobs based on the 'apply' field in the user document
      if(jobData.applicants){
        // console.log("aplicants qw",jobData.applicants);
        const appliedJobsData = await fetchAppliedJobs(jobData.applicants);
        // console.log("appliedJobsData ", appliedJobsData);
        // Now, 'appliedJobsData' contains an array of jobs that the user has applied to
        setAppliedJobs(appliedJobsData);
        // console.log("aplicants ",appliedJobs);
      }

    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
  
    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);

    
  }, [userDocId]);
  // Now, 'appliedJobs' contains an array of jobs that the user has applied to
  // console.log('Applied Jobs:', appliedJobs);
  // console.log(appliedJobs, "gghhhhhhhhhhhhhhhh");


  const renderApplicationItem = ({ item, index }) => (

    <View key={index} style={styles.container}>

      <View key={item.id} style={styles.jobContainer}>
        <Image source={{uri:item.profileImage}} style={styles.jobImage} />
        <View style={styles.jobDetails}>
          <Text style={styles.firstName}>{item.title}</Text>
          <TouchableOpacity  onPress={() => handleEmployerProfile(item.email)}>
            <Text style={styles.jobOwner}>{item.email}</Text>

          </TouchableOpacity>
          <Text numberOfLines={3} style={styles.jobDescription}>
            {item.profession}
          </Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => handleMyApplocation(item.id,jobId)}>
            <Text style={styles.seeMoreButtonText}>See Applications</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
  return (

    <View style={styles.card}>
      <View style={styles.TitleCont}>
        <ImageBackground
          style={styles.titleBackground}
          source={require("../../assets/job1.jpg")} // Replace with the actual path to your image
        >
          <Text style={styles.textTitle}>
            My users
          </Text>
        </ImageBackground>
      </View>
      {appliedJobs && (
  <FlatList
    data={appliedJobs}
    renderItem={renderApplicationItem}
    keyExtractor={(item, index) => index.toString()}
    numColumns={1}
  />
)}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: "5%",
  },
  jobContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  jobDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobOwner: {
    color: '#555',
    marginBottom: 8,
  },
  jobDescription: {
    color: '#777',
    marginBottom: 8,
  },
  seeMoreButton: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  seeMoreButtonText: {
    color: '#fff',
  },

  card: {
    flex: 1,
    margin: "5%"
  },

  TitleCont: {
    marginVertical: "5%",
    // backgroundColor:"#fff",

    height: "25%",


  },
  textTitle: {
    paddingTop: "11%",
    width: '100%', // Set the width to 100%
    fontSize: 18,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center',
    color: materialTheme.COLORS.BUTTON_COLOR,
    //  flex:1,
    //  justifyContent:"center",
    // alignItems:"center"
  },
  titleBackground: {
    height: "100%",

    borderRadius: 60,
    // Add any additional styles for the TitleCont component
  },
});

export default Applicants;