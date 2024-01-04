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
const [ifApplied,setIfApplied]=useState(false);
  const [showMoreMap, setShowMoreMap] = useState({});
  const navigation = useNavigation();

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const onViewApplicantsPress = (docId) => {
    navigation.navigate("applicants", { docId });
  };
  const handleEmployerProfile=(id)=>{
    console.log("employer-id ",id);
      navigation.navigate("EmployeerProfile",{id});
  }
  

  const onApplyPress = async(docId,endDate) => {
    const fetchFromApplication = query(collection(db, "application"), where("jobId", "==", docId),where('email','==',userEmail));
    try {
      const data = await getDocs(fetchFromApplication);

      const today = new Date()

      const today2 = today.toLocaleDateString();
      const todayArray = today2.split('/');
      const reverseTodayArray = todayArray.reverse();
      const reversedToday = reverseTodayArray.join('/');
      // console.log(today2," todddd ",reversedToday)
  
  
  console.log("today2 ",today2);
  
      if (reversedToday > endDate) {
        //console.log(endDate," picked ")
        alert("closed ");
        // Handle the case where the picked date is in the past
        return;
      }
      
      // Check if data.docs is defined before mapping over it
      if (data.docs && data.docs.length > 0) {
        setIfApplied(true);
        alert("already applied");
        return;
      }
      else{
        setIfApplied(false);
      }
    } catch (error) {
      console.log(error)
    }

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
    // check if applied

 
    
  }, [id]);

  const renderJobItem = ({ item, index }) => (
<>
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
        <TouchableOpacity onPress={() => handleEmployerProfile(item.employer)}>

        <Text style={styles.title}>{item.employer}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Title</Text>
        <Text style={styles.detail}>{item.title}</Text>

        <Text style={styles.title}>Description</Text>
        <Text style={styles.detail}>
          {item.description}
        </Text>
        <Block>
          <Text style={styles.title}>Requirements</Text>
          <Text style={styles.detail}>{item.requirements}</Text>
        </Block>
        <Block>
          <Text style={styles.title}>Education Background</Text>
          <Text style={styles.detail}>{item.education}</Text>
        </Block>

        <Block>
          <Text style={styles.title}>Skills</Text>
          <Text style={styles.detail}>{item.skills}</Text>
        </Block>
        <Block>
          <Text style={styles.title}>Professions</Text>
          <Text style={styles.detail}>{item.professions}</Text>
        </Block>
        {role == "employee" && !ifApplied && (
          <TouchableOpacity onPress={() => onApplyPress(item.id,item.endDate)} style={styles.applyButton}>
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
</>
   
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
  allItems:{
    marginHorizontal:"5%",
    marginBottom:"5%"
  },

  editbtn: {

    color: materialTheme.COLORS.BUTTON_COLOR,

  },
  addPosts: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%",
  },
  MyJobs: {
    color: materialTheme.COLORS.BUTTON_COLOR,
    fontSize: 20,
    fontWeight: "200",
  },
  editbtn: {
    color: materialTheme.COLORS.BUTTON_COLOR,
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
    fontWeight: "bold",
  },
  jobItem: {
    // ... (Your existing styles)
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
    color: materialTheme.COLORS.BUTTON_COLOR, // Adjust text color
  },

  detail:{
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify",
    color: "#555", // Adjust text color
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },


});


export default SingleJob;