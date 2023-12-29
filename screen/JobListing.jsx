import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Search from "../common/Search";
import { useNavigation } from '@react-navigation/native';
import materialTheme from '../constants/Theme';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../FireBaseConfig';
import { useEffect } from 'react';
import { useUser } from "../common/context/UserContext";
import { Block } from "galio-framework";

const { width, height } = Dimensions.get('window');



const dynamicStyles = {
  // avatarSize: width * avatarSizeRatio,
  notificationItemMarginBottom: height * 0.02,
  notificationItemPadding: width * 0.04,
  borderRadius: width * 0.02,
  titleFontSize: width * 0.05,
  descriptionFontSize: width * 0.035,
};

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  const onShowMorePress = (id) => {
    // console.log("SingleJob ",id)
    navigation.navigate("SingleJob", { id });

  };
  return (
    <TouchableOpacity onPress={() => onShowMorePress(item.jobId)}>
      <View style={styles.item}>
        <Image
          source={{
            uri: item.img,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <View></View>
        <Text style={styles.itemText1}>{item.title}</Text>
        {/* <Text style={styles.itemText2}>{item.description}</Text> */}
        {/* <Text style={styles.itemText}>{item.experienceRequired}</Text> */}
      </View>

    </TouchableOpacity>
  );
};

export default () => {
  const navigation = useNavigation();
  const { role, userEmail } = useUser();
  const onShowMorePress = (id) => {
    // console.log("SingleJob ",id)
    navigation.navigate("SingleJob", { id });

  };

  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const onApplyPress = async (docId, endDate) => {
    // check if apply before
    const fetchFromApplication = query
      (collection(db, "application"),
        where("jobId", "==", docId),
        where("email", "==", userEmail),
      );
    try {
      const data = await getDocs(fetchFromApplication);

      // Check if data.docs is defined before mapping over it
      if (data.docs && data.docs.length > 0) {
        alert("already applied")
        return;
      }
    } catch (error) {
      console.log(error)
    }
    // checking the expeired date
    const today = new Date()

    const today2 = today.toLocaleDateString();
    const todayArray = today2.split('/');
    const reverseTodayArray = todayArray.reverse();
    const reversedToday = reverseTodayArray.join('/');
    // console.log(today2," todddd ",reversedToday)


    if (reversedToday > endDate) {
      //console.log(endDate," picked ")
      alert("closed ");
      // Handle the case where the picked date is in the past
      return;
    }
    //console.log(reversedToday," picked ",endDate)
    navigation.navigate("ApplyPage", { docId });

  };



  //start fetching from jobLists
  const [posts, setPosts] = useState([]);
  const [jobId, setJobId] = useState([]);
  const jobListsCollectionRef = query(collection(db, 'jobLists'), limit(10));


  const fetchJobLists = async () => {
    try {
      const data = await getDocs(jobListsCollectionRef);

      // Check if data.docs is defined before mapping over it
      if (data.docs && data.docs.length > 0) {
        const jobIds = data.docs.map((doc) => doc.id);
        setJobId((prevId) => [...prevId, ...jobIds]);

        // Set the posts state with the data and include IDs
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        console.error('No documents found');
      }
    } catch (error) {
      console.error('Error fetching job lists: ', error);
    }
  };

  useEffect(() => {
    // Initial data fetch when the component mounts
    fetchJobLists();

    // Setting up interval to refetch data every 2000ms (2 seconds)
    const intervalId = setInterval(() => {
      fetchJobLists();
    }, 2000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const onEditPress = (docId) => {
    // console.log("()(0(0 ",posts)
    navigation.navigate("EditJobs", { posts, docId });

  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredInfo = posts.filter((info) =>
    info.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderJobItem = ({ item, index }) => (


    <View key={index} style={styles.jobItem}>
      <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />
      <TouchableOpacity onPress={() => onShowMorePress(item.jobId)}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        {showMoreMap[index]
          ? item.description
          : `${item.description.substring(0, 100)}... `}
        <Text style={styles.seeMore} onPress={() => onShowMorePress(item.jobId)}>See More</Text>
      </Text>







      {role == "employee" && (
        <TouchableOpacity
          onPress={() => onApplyPress(item.id, item.endDate)}
          style={styles.applyButton}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>)}

      {/* {(role=="employer") &&(item.employer==userEmail) &&(
     <TouchableOpacity
       onPress={() => onEditPress(item.jobId)}
        style={styles.applyButton}
      >
        <Text style={styles.applyButtonText}>Edit</Text>
      </TouchableOpacity>)} */}
    </View>

  );
  return (

    <View style={styles.allItems}>
      <Search
        searchTerm={jobDetails}
        placeholder="Search office requirement here"
        handleSearch={handleSearch}
      />

      <ScrollView >

        <View style={styles.container}>
          <SafeAreaView>
            <SectionList
              contentContainerStyle={{ paddingHorizontal: 10 }}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS}
              renderSectionHeader={({ section }) => (
                <>
                  <Text style={styles.sectionHeader}>{section.title}</Text>

                  <FlatList
                    horizontal
                    data={posts}
                    renderItem={({ item }) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                </>
              )}
              renderItem={({ item, section }) => {
                return null;

                // return <ListItem item={item} />;
              }}
            />
          </SafeAreaView>
          <View>
            <Text style={styles.text}>Recent Job Posts </Text>
          </View>
          <FlatList
            data={filteredInfo}
            renderItem={renderJobItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
      </ScrollView>
    </View>
  );
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
const SECTIONS = [
  {
    // title: 'Made for you',
    // horizontal: true,
    data: [
      {
        key: "1",
        text: "Software ",
        uri: "https://picsum.photos/id/1/200",
        description: "Tech Co",
        experienceRequired: "3 years",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/10/200",
        description: "Tech Co",
        experienceRequired: "3 years",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
        description: "Tech Co",
        experienceRequired: "3 years",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1006/200",
        description: "Tech Co",
        experienceRequired: "3 years",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1008/200",
        description: "Tech Co",
        experienceRequired: "3 years",
      },
    ],
  },
];

const styles = StyleSheet.create({
  allItems: {
    marginTop: "5%",
    padding: dynamicStyles.notificationItemPadding,
    backgroundColor: "#fff",
    height: "100%"
  },
  itemText1: {
    color: "#000",
    marginTop: 5,
    // fontSize: 18,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
    width: '100%'
    // color:"#3498db"
  },
  itemText2: {
    color: "#000",
    marginTop: 5,
    // fontSize: 18,
    fontFamily: "serif",
    fontStyle: "italic",


    // color:"#3498db"
  },
  text: {
    paddingTop: "10%",
    paddingBottom: "2%",
    width: '100%', // Set the width to 100%
    fontSize: 18,
    fontFamily: "serif",
    // fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'left',
    // color:"#3498db"
    color: materialTheme.COLORS.BUTTON_COLOR,
  }
  ,
  container: {
    // flex: 1,
    // backgroundColor: '#fff',

    height: "30%",
    // borderRadius: 8,
    // marginRight: 16,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: "2%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {

    fontWeight: "800",
    fontSize: 18,
    color: "#000",
    marginTop: 1,
    marginBottom: 15,
  },
  item: {
    marginHorizontal: 1,

    // marginBottom: 20,
  },
  itemPhoto: {
    // width: 200,
    // height: 200,
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },

  card: {
    // backgroundColor:"#BB9CC0",
    padding: 16,
    marginBottom: 70,
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
  seeMore: {
    color: materialTheme.COLORS.BUTTON_COLOR,

    fontWeight: "300",
    // fontFamily:"san-serif"

  }
  ,

  showMoreButton: {
    alignSelf: "flex-end",
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  applyButton: {
    // backgroundColor: "#3498db",
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


