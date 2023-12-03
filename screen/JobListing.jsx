// ... (other imports)
import React, { useState } from 'react';
import { Dimensions, Image, TextInput } from 'react-native';
import { View, Text,ScrollView, StyleSheet, TouchableOpacity, FlatList,SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import Search from '../common/Search';


const { height, width } = Dimensions.get('screen');

const JobListing = ({ route }) => {
  const { jobDetails } = route.params; 
  const SECTIONS = [
    {
      title: 'Made for you',
      horizontal: true,
      data:[
        {
          title: 'Software Developer',
          imgUrl: require("../assets/job1.jpg"),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          experienceRequired: '3 years',
          // Add more details as needed
        },
        {
          title: 'Software Developer',
          imgUrl: require("../assets/job1.jpg"),
          description: 'Tech Co',
          experienceRequired: '3 years',
          // Add more details as needed
        },
        {
          title: 'Software Developer',
          imgUrl: require("../assets/job1.jpg"),
          description: 'Tech Co',
          experienceRequired: '3 years',
          // Add more details as needed
        },
        {
          title: 'Software Developer',
          imgUrl: require("../assets/job1.jpg"),
          description: 'Tech Co',
          experienceRequired: '3 years',
          // Add more details as needed
        },
        {
          title: 'Software Developer',
          imgUrl: require("../assets/job1.jpg"),
          description: 'Tech Co',
          experienceRequired: '3 years',
          // Add more details as needed
        },
        {
          title: 'Software Developer',
          imgUrl: require("../assets/job1.jpg"),
          description: 'Tech Co',
          experienceRequired: '3 years',
          // Add more details as needed
        },
        {
          title: 'Software Developer',
          imgUrl: require("../assets/job1.jpg"),
          description: 'Tech Co',
          experienceRequired: '3 years',
          // Add more details as needed
        },
      ]
      
    },
    // ...
  ]; 
 
  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const onApplyPress = (title) => {
    // Implement logic for handling the "Apply" button press
    console.log('Apply button pressed for job:', title);
    // You can add your navigation logic or any other actions here
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredInfo = jobDetails.filter(info => info.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderJobItem = ({ item, index }) => (
    <View key={index} style={styles.jobItem}>
      <Image source={item.imgUrl} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {showMoreMap[index] ? item.description : `${item.description.substring(0, 100)}...`}
      </Text>
      {item.description.length > 100 && (
        <TouchableOpacity onPress={() => toggleShowMore(index)} style={styles.showMoreButton}>
          <Text>{showMoreMap[index] ? 'Show Less' : 'Show More'}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onApplyPress(item.title)} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>

    </View>
  );


  return (
    <View style={styles.card}>
      <Search
        searchTerm={searchTerm}
        placeholder="Search office requirement here"
        handleSearch={handleSearch}
      />
    


    

      <FlatList
        data={filteredInfo}
        renderItem={renderJobItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
};





const styles = StyleSheet.create({
  card: {
    // backgroundColor:"#BB9CC0",
    padding: 16,
    marginBottom: 70
  },

 
  jobItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  horizontalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify"
  },
  

  showMoreButton: {
    alignSelf: 'flex-end',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  applyButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  




  horizontalJobItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop:50,
    marginBottom: 150,
    marginRight: 10, // Add spacing between horizontal items
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  horizontalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333', // Change text color
  },

  horizontalDescription: {
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'justify',
    color: '#555', // Change text color
  },

  horizontalApplyButton: {
    backgroundColor: '#3498db', // Change button color
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },

  horizontalApplyButtonText: {
    color: '#fff',
    fontSize: 14,
  },

  horizontalImage: {
    width: '100%',
    height: 100, // Adjust image height
    borderRadius: 8,
    marginBottom: 8,
  },





});

export default JobListing;
