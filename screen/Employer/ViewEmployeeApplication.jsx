import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../FireBaseConfig';
import { Block } from "galio-framework";

import { useUser } from "../../common/context/UserContext";
import { FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import materialTheme from '../../constants/Theme';
import * as OpenAnything from 'react-native-openanything'
const { width, height } = Dimensions.get('window');

const dynamicStyles = {
  notificationItemMarginBottom: height * 0.02,
  notificationItemPadding: width * 0.04,
  borderRadius: width * 0.02,
  titleFontSize: width * 0.05,
  descriptionFontSize: width * 0.035,
};

const ViewEmployeeApplication = ({ route }) => {
  const { role, userEmail } = useUser();
  const { email, docId } = route.params;
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMoreMap, setShowMoreMap] = useState([]);
  const navigation = useNavigation();

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };
  // const jobListsCollectionRef = query(collection(db, "application"), where('jobId', '==', docId), where('email', '==', email));

  // Fetch job data
  // Fetch job data
  const [date,setDate]=useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const jobListsCollectionRef = query(collection(db, 'application'), where('jobId', '==', docId), where('email', '==', email));

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



  }, []);

  const renderJobItem = ({ item, index }) => (
    <>
      <Block style={styles.addPosts}>

        <Text style={styles.MyJobs}>Job Application </Text>
        {/* <Text style={styles.MyJobs}>{item.createdDate} </Text> */}

      </Block>
      <View key={index} style={styles.jobItem}>
        {/* <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" /> */}
        <TouchableOpacity >

          <Text style={styles.title}>{item.email}</Text>
        </TouchableOpacity>

        <Block style={styles.addPosts}>

          <Text style={styles.title}>Name</Text>
        </Block>
        <Text style={styles.coverLetter}>{item.firstName} {item.lastName}</Text>

        <Block style={styles.addPosts}>
          <Text style={styles.title}>age</Text>
        </Block>
        <Text style={styles.coverLetter}>{item.age}</Text>


        <Block style={styles.addPosts}>
          <Text style={styles.title}>Profession</Text>
        </Block>
        <Text style={styles.coverLetter}>
          {item.profession}
        </Text>

        <Block style={styles.addPosts}>
          <Text style={styles.title}>coverLetter</Text>
        </Block>
        <Text style={styles.coverLetter}>{item.coverLetter}</Text>

        <TouchableOpacity
          style={styles.download}
          title="Open PDF"
          onPress={() => {
            setIsDownloading(true);
            OpenAnything.Pdf("https://firebasestorage.googleapis.com/v0/b/job-board-3093a.appspot.com/o/allFiles%2F8496b60e-bc5d-4c6e-9446-579975340c2e.pdf?alt=media&token=e0aa8a05-76de-4a68-82cf-aeb64dd3b4f7");
          }}
          disabled={isDownloading}
        >
          <Text style={styles.downloadText}>
            {isDownloading ? 'Downloading...' : 'Download the resume'}
          </Text>
          <FontAwesome name="download" size={38} style={styles.downloadicon} />
        </TouchableOpacity>
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
  MyJobs: {
    color: materialTheme.COLORS.BUTTON_COLOR,
    fontSize: 20,
    fontWeight: "200",
  },
  allItems: {
    marginTop: "3%",
    padding: dynamicStyles.notificationItemPadding,
    backgroundColor: "#fff",
    height: "100%"
  },
  addPosts: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%",
   marginBottom:"1%"
  },
  download: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "5%"
  },
  downloadicon: {
    marginLeft: 10,
    marginTop: "3%",
    color: materialTheme.COLORS.BUTTON_COLOR,
  },
  downloadText: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "justify",
    marginLeft: "5%",
    color: materialTheme.COLORS.BUTTON_COLOR,
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
    marginBottom: "1%",
    color: materialTheme.COLORS.BUTTON_COLOR,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: "justify",
  },
  coverLetter: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify",
    marginLeft: "5%"
  }
});

export default ViewEmployeeApplication;
