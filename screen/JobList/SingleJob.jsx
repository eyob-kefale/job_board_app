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
import Search from "../../common/Search";
import { useNavigation } from '@react-navigation/native';
import materialTheme from '../../constants/Theme';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../FireBaseConfig';
import { useEffect } from 'react';
import { Block } from "galio-framework";
import { useUser } from "../../common/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
// import JobListing from "../JobListing";

const { width, height } = Dimensions.get('window');



const dynamicStyles = {
  // avatarSize: width * avatarSizeRatio,
  notificationItemMarginBottom: height * 0.02,
  notificationItemPadding: width * 0.04,
  borderRadius: width * 0.02,
  titleFontSize: width * 0.05,
  descriptionFontSize: width * 0.035,
};



const SingleJob = ({ route }) => {
  const { role, userEmail } = useUser();
  const { id } = route.params;
  // console.log("asvsg ", id);

  const [showMoreMap, setShowMoreMap] = useState({});
  const navigation = useNavigation();

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const onViewApplicantsPress = (jobId) => {
    navigation.navigate("applicants", { jobId });
  };
  const onApplyPress = (docId) => {
    navigation.navigate("ApplyPage", { docId });
  };
  const onEditPress = (docId) => {

    navigation.navigate("EditJobs", { posts, docId });

  };

  const onShowMorePress = (docId) => {
    navigation.navigate("ApplyPage", { docId });
  };

  // Fetch job data
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const jobListsCollectionRef = query(collection(db, 'jobLists'), where('jobId', '==', id));

    const getJoblists = async () => {
      try {
        const data = await getDocs(jobListsCollectionRef);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log("employeryy", posts);
      } catch (error) {
        console.error('Error fetching job lists: ', error);
      }
    };

    getJoblists();
  }, [id]);

  const renderJobItem = ({ item, index }) => (
    <TouchableOpacity >
      <Block style={styles.addPosts}>
        <Text style={styles.MyJobs}>Job post </Text>
        {(role == "employer") && (item.employer == userEmail) && (
          <TouchableOpacity
            onPress={() => onEditPress(item.jobId)}
          >
            <Ionicons name="ios-create" style={styles.editbtn} size={30} color={"#000"} />

          </TouchableOpacity>
        )}
      </Block>
      <View key={index} style={styles.jobItem}>
        <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{item.employer}</Text>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.description}
        </Text>
        <Block>
          <Text style={styles.title}>Requirements</Text>
          <Text >{item.requirements}</Text>
        </Block>
        <Block>
          <Text style={styles.title}>Education Background</Text>
          <Text >{item.education}</Text>
        </Block>

        <Block>
          <Text style={styles.title}>Skills</Text>
          <Text >{item.skills}</Text>
        </Block>
        <Block>
          <Text style={styles.title}>Professions</Text>
          <Text >{item.professions}</Text>
        </Block>
        {role == "employee" && (
          <TouchableOpacity onPress={() => onApplyPress(item.id)} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        )}
        {(role == "employer") && (item.employer == userEmail) && (
          <TouchableOpacity
            onPress={() => onViewApplicantsPress(item.id)}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>View Applicants</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.allItems}>

      
      <FlatList
        data={posts}
        renderItem={renderJobItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
};





const styles = StyleSheet.create({

  editbtn: {

    color: materialTheme.COLORS.BUTTON_COLOR,

  },
  addPosts: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%"
  },
  addPostIcon: {
    color: materialTheme.COLORS.BUTTON_COLOR,
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  MyJobs: {
    color: materialTheme.COLORS.BUTTON_COLOR,
    fontSize: 20,
    fontWeight: "200",


  }
  ,
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
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },


});


export default SingleJob;