import React from 'react';
import { ImageBackground } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const MyApplication = () => {
  // Example data for job applications
  const jobApplications = [
    {
      jobId: 1,
      jobTitle: 'Software Developer',
      jobOwner: 'Tech Co',
      jobImage: require('../assets/job1.jpg'),
      jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      jobId: 1,
      jobTitle: 'Software Developer',
      jobOwner: 'Tech Co',
      jobImage: require('../assets/job1.jpg'),
      jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      jobId: 1,
      jobTitle: 'Software Developer',
      jobOwner: 'Tech Co',
      jobImage: require('../assets/job1.jpg'),
      jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      jobId: 1,
      jobTitle: 'Software Developer',
      jobOwner: 'Tech Co',
      jobImage: require('../assets/job1.jpg'),
      jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    // Add more job applications as needed
  ];

  const handleSeeMore = (jobId) => {
    // Handle navigation to see more details about the job (you can implement this based on your navigation structure)
    // For example, you can use React Navigation to navigate to a detailed job view.
    console.log(`See more for job ${jobId}`);
  };
  const renderApplicationItem = ({ item, index }) => (
    <View key={index} style={styles.container}>

      <View key={item.jobId} style={styles.jobContainer}>
        <Image source={item.jobImage} style={styles.jobImage} />
        <View style={styles.jobDetails}>
          <Text style={styles.jobTitle}>{item.jobTitle}</Text>
          <TouchableOpacity>
          <Text style={styles.jobOwner}>Company: {item.jobOwner}</Text>

          </TouchableOpacity>
          <Text numberOfLines={3} style={styles.jobDescription}>
            {item.jobDescription}
          </Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => handleSeeMore(item.jobId)}>
            <Text style={styles.seeMoreButtonText}>See More</Text>
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
          source={require("../assets/job1.jpg")} // Replace with the actual path to your image
        >
          <Text style={styles.textTitle}>
            My Application
          </Text>
        </ImageBackground>
      </View>
      <FlatList
        data={jobApplications}
        renderItem={renderApplicationItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
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
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  seeMoreButtonText: {
    color: '#fff',
  },

  card: {
    flex:1,
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
    color: "#3498db",
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

export default MyApplication;
