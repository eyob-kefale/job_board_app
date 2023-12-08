import React from "react";
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Dimensions } from "react-native";
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
const jobDetails = [
  {
    title: "Software Developer",
    imgUrl: require("../assets/job1.jpg"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    experienceRequired: "3 years",
    // Add more details as needed
  },
  {
    title: "Software Developer",
    imgUrl: require("../assets/job1.jpg"),
    description: "Tech Co",
    experienceRequired: "3 years",
    // Add more details as needed
  },
  {
    title: "Software Developer",
    imgUrl: require("../assets/job1.jpg"),
    description: "Tech Co",
    experienceRequired: "3 years",
    // Add more details as needed
  },
  {
    title: "Software Developer",
    imgUrl: require("../assets/job1.jpg"),
    description: "Tech Co",
    experienceRequired: "3 years",
    // Add more details as needed
  },
  {
    title: "Software Developer",
    imgUrl: require("../assets/job1.jpg"),
    description: "Tech Co",
    experienceRequired: "3 years",
    // Add more details as needed
  },
  {
    title: "Software Developer",
    imgUrl: require("../assets/job1.jpg"),
    description: "Tech Co",
    experienceRequired: "3 years",
    // Add more details as needed
  },
  {
    title: "Software Developer",
    imgUrl: require("../assets/job1.jpg"),
    description: "Tech Co",
    experienceRequired: "3 years",
    // Add more details as needed
  },
];
const EmployeerProfile = ({ navigation }) => {
  //   const { user } = route.params;
  const [searchTerm, setSearchTerm] = useState("");
  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const onApplyPress = (title) => {
    // Implement logic for handling the "Apply" button press
    console.log("Apply button pressed for job:", title);
    // You can add your navigation logic or any other actions here
  };


  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredInfo = jobDetails.filter((info) =>
    info.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderJobItem = ({ item, index }) => (
    <View key={index} style={styles.jobItem}>
      <Image source={item.imgUrl} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {showMoreMap[index]
          ? item.description
          : `${item.description.substring(0, 100)}...`}
      </Text>
      {item.description.length > 100 && (
        <TouchableOpacity
          onPress={() => toggleShowMore(index)}
          style={styles.showMoreButton}
        >
          <Text>{showMoreMap[index] ? "Show Less" : "Show More"}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => onApplyPress(item.title)}
        style={styles.applyButton}
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
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

  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subCont}>
        <Image style={styles.bgImage} source={require("../assets/job1.jpg")}></Image>

        <Block style={styles.imgcont}>
          <Block style={styles.profileImageContainer}>
            <Image source={user.profileImage} style={styles.profileImage} />

            <View style={styles.dptCont}>
              <Text style={styles.dpt}>
                {user.department}
              </Text>

            </View>
          </Block>

          <Block style={styles.header}>
            <Text p style={styles.title}>
              {user.name}
            </Text>
            <Text style={styles.email}>{user.email}</Text>

          </Block>
        </Block>
      </View>
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.jobLists}>
          {/* <View>
            <Text style={styles.text}>Recent Job Posts </Text>
          </View> */}
          <FlatList
            data={filteredInfo}
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
    color: "#3498db",


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

    width: 120,
    height: 120,
    borderRadius: 60,
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
    backgroundColor: "#3498db",
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

