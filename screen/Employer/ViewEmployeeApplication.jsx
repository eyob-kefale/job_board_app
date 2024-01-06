import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../FireBaseConfig';
import { Block } from "galio-framework";

import { useUser } from "../../common/context/UserContext";
import { FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import materialTheme from '../../constants/Theme';
import * as OpenAnything from 'react-native-openanything';

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
  const { email, docId, aplicansImage } = route.params;
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMoreMap, setShowMoreMap] = useState([]);
  const navigation = useNavigation();

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const [date, setDate] = useState();
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
  }, [posts]);

  const renderJobItem = ({ item, index }) => (
    <ScrollView>
      <Block style={styles.allItems}>
        <TouchableOpacity onPress={() => toggleShowMore(index)}>
          <Image source={{ uri: aplicansImage }} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{item.email}</Text>
        </TouchableOpacity>

       
          <>
            <Block style={styles.addPosts}>
              <Text style={styles.title}>Name:</Text>
              <Text style={styles.description}>{item.firstName} {item.lastName}</Text>
            </Block>

            <Block style={styles.addPosts}>
              <Text style={styles.title}>Age:</Text>
              <Text style={styles.description}>{item.age}</Text>
            </Block>

            <Block style={styles.addPosts}>
              <Text style={styles.title}>Profession:</Text>
              <Text style={styles.description}>{item.profession}</Text>
            </Block>

            <Block style={styles.addPosts}>
              <Text style={styles.title}>Cover Letter:</Text>
            </Block>
              <Text style={styles.coverLetter}>{item.coverLetter}</Text>

            <TouchableOpacity
              style={styles.download}
              title="Open PDF"
              onPress={() => {
                setIsDownloading(true);
                OpenAnything.Pdf(item.fileUrl);
              }}
              disabled={isDownloading}
            >
              <Text style={styles.downloadText}>
                {isDownloading ? 'Downloading...' : 'Download the resume'}
              </Text>
              <FontAwesome name="download" size={38} style={styles.downloadicon} />
            </TouchableOpacity>
          </>
       
      </Block>
    </ScrollView>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderJobItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 8,
  },
  allItems: {
    marginTop: "3%",
    padding: dynamicStyles.notificationItemPadding,
    backgroundColor: "#fff",
  },
  addPosts: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%",
    marginBottom: "1%"
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
