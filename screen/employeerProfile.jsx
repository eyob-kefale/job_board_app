import React from "react";
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Dimensions } from "react-native";
import materialTheme from '../constants/Theme';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../FireBaseConfig';
import { useEffect } from 'react';
import { useUser } from "../common/context/UserContext";
const { width, height } = Dimensions.get('window');
const dynamicStyles = {
  // avatarSize: width * avatarSizeRatio,
  notificationItemMarginBottom: height * 0.02,
  notificationItemPadding: width * 0.04,
  borderRadius: width * 0.02,
  titleFontSize: width * 0.05,
  descriptionFontSize: width * 0.035,
};
const user = {
  name: 'Eyob Kefale',
  email: 'jobkefale@gmail.com',
  department: 'Software Engineer',
  profileImage: require("../assets/employeer.jpeg"),
  skills: ['React Native', 'JavaScript', 'UI/UX Design'],
  education: 'Bachelor of Computer Science, Example University',
  profession: 'Software Engineer',
  aboutMe: 'Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.',
};

const EmployeerProfile = ({route, navigation }) => {
  //fetch from context
  const { userEmail } = useUser();
  const {id}=route.params;
  // console.log("employer id ",id);
  //   const { user } = route.params;
  const [searchTerm, setSearchTerm] = useState("");
  const [showMoreMap, setShowMoreMap] = useState({});

  const onShowMorePress = (id) => {
    // console.log("SingleJob ",id)
      navigation.navigate("SingleJob",{id});
    
  };
//fetch from jobLists
const [employerProfile, setemployerProfile] = useState([]);

const userProfileCollectionRef = query(collection(db, 'user'),where('email','==',id));
const [employerId, setemployerId] = useState([]);

useEffect(() => {
  const getEmployerProfile = async () => {
    try {
      const data = await getDocs(userProfileCollectionRef);

      // Check if data.docs is defined before mapping over it
      if (data.docs && data.docs.length > 0) {
        const employerIds = data.docs.map((doc) => doc.id);
        setemployerId((prevId) => [...prevId, ...employerIds]);

        // Set the employerProfile state with the data and include IDs
        setemployerProfile(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        console.error('No documents found');
      }
    } catch (error) {
      console.error('Error fetching job lists: ', error);
    }
  };

  getEmployerProfile();
}, []);




//fetch from jobLists
const [post, setpost] = useState([]);

const postCollectionRef = query(collection(db, 'jobLists'),where('employer','==',id));
const [jobId, setJobId] = useState([]);

useEffect(() => {
  const getEmployerPost = async () => {
    try {
      const data = await getDocs(postCollectionRef);

      // Check if data.docs is defined before mapping over it
      if (data.docs && data.docs.length > 0) {
        const jobIds = data.docs.map((doc) => doc.id);
        setJobId((prevId) => [...prevId, ...jobIds]);

        // Set the post state with the data and include IDs
        setpost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        console.error('No documents found');
      }
    } catch (error) {
      console.error('Error fetching job lists: ', error);
    }
  };

  getEmployerPost();
}, []);


 


const handleEditJobs = (employerProfile) => {
  // console.log("ffggfgfgg "+employerProfile);
  // Navigate to the EditProfile screen with the item as a parameter
  navigation.navigate('EditJobs', { employerProfile,jobId });

};





  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const onApplyPress = (title) => {
    // Implement logic for handling the "Apply" button press
    // console.log("Apply button pressed for job:", title);
    // You can add your navigation logic or any other actions here
  };


  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  // const filteredInfo = employerProfile.filter((info) =>
  //   info.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
 
  const renderJobItem = ({ item, index }) => (
    <TouchableOpacity>

    <View key={index} style={styles.jobItem}>
      <Image source={{ uri: item.img}} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {item.description.substring(0, 100)}
      </Text>
      {/* {item.description.length > 100 && (
        <TouchableOpacity
          onPress={() => toggleShowMore(index)}
          style={styles.showMoreButton}
        >
          <Text>{showMoreMap[index] ? "Show Less" : "Show More"}</Text>
        </TouchableOpacity>
      )} */}
      <TouchableOpacity
       onPress={() => onShowMorePress(item.jobId)}

        style={styles.applyButton}
      >
        <Text style={styles.applyButtonText}>Show More</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.socialLink}>
      <Ionicons name={item.icon} size={24} color={theme.COLORS.INFO} />
      <Text style={styles.socialLinkText}>{item.label}</Text>
    </View>
  );

  const handleEditProfile = () => {
    // Navigate to the EditProfile screen
    navigation.navigate('EditProfile', { user });
//{uri:employerProfile[0].profileImage}
  };
// console.log("employerProfile",employerProfile)
//console.log("employerProfile of index 0",employerProfile[0].profileImage)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subCont}>
        <Image style={styles.bgImage} source={user.profileImage}></Image>
         {employerProfile && employerProfile.length > 0 &&(
            
        <Block style={styles.imgcont}>
          <Block style={styles.profileImageContainer}>
           
            <Image source={{uri:employerProfile[0].profileImage}} style={styles.profileImage} />

            <View style={styles.dptCont}>
              <Text style={styles.dpt}>
                {employerProfile[0].department}
              </Text>

            </View>
          </Block>

          <Block style={styles.header}>
            <Text p style={styles.title}>
              {employerProfile[0].firstName} {employerProfile[0].lastName}
            </Text>
            <Text style={styles.email}>{employerProfile[0].email}</Text>

          </Block>
        </Block>
           ) }
      </View>
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.jobLists}>
          {/* <View>
            <Text style={styles.text}>Recent Job employerProfile </Text>
          </View> */}
          <FlatList
            data={post}
            renderItem={renderJobItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
      </ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  jobLists: {
    height: "30%",
    // borderRadius: 8,
    // marginRight: 16,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    // padding: "2%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  bgImage: {
    padding: 0,
    height: 250,
    width: "100%",
    borderRadius: 15,
    borderWidth: 4,
  },

  subCont: {
    flex: 1,
    marginBottom: "40%"
    //  backgroundColor:"#543"
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.WHITE,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#001B79",
    marginTop: 16,
    // marginLeft: "5%",
  },

  imgcont: {
    // marginTop:"5%",
    marginLeft: "5%",
    width: "100%",
    position: 'absolute', // Position the container
    top: "90%", // Center vertically
    // left: "50%", // Center horizontally
    transform: [
      { translateX: -10 }, // Adjust based on the width of the profile image
      { translateY: -30 }, // Adjust based on the height of the profile image
    ],
    zIndex: 1,
    //  backgroundColor:"#123"
  },


  profileImageContainer: {
    flexDirection: "row",

  },
  dptCont: {
    flex: 1,
    padding: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  dpt: {
    width: '100%', // Set the width to 100%
    fontSize: 18,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center',
    color: materialTheme.COLORS.BUTTON_COLOR,


  }
  ,
  title: {
    width: '100%', // Set the width to 100%
    fontSize: 20,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "normal",


    color: "#000",
    marginBottom: 8,
  },
  email: {
    fontSize: 20,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "normal",
  }
  ,

  profileImage: {

    width: 90,
    height: 90,
    borderRadius: 45,
    resizeMode: "cover",
  },
  detailsContainer: {
    color: "#000",
    // marginTop: 20,
    height: "100%",
    // marginLeft: "5%",

  },

  container: {
    // flex: 1,
    // backgroundColor: '#fff',

    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    marginTop: "5%",
  },

  jobItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  horizontalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify",
  },

  showMoreButton: {
    alignSelf: "flex-end",
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  applyButton: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },


});

export default EmployeerProfile;

