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
  return (
    <TouchableOpacity >
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <View></View>
      <Text style={styles.itemText1}>{item.text}</Text>
      <Text style={styles.itemText2}>{item.description}</Text>
      {/* <Text style={styles.itemText}>{item.experienceRequired}</Text> */}
    </View>

    </TouchableOpacity>
  );
};

export default () => {
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

  const [searchTerm, setSearchTerm] = useState("");

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
                    data={section.data}
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
    marginTop:"5%",
    padding: dynamicStyles.notificationItemPadding,
    backgroundColor: "#fff",
    height: "100%"
  },
  itemText1:{
    color: "#000",
    marginTop: 5,
    // fontSize: 18,
    fontFamily: "serif",
   fontStyle: "italic",
   fontWeight: "bold",
   width: '100%'
    // color:"#3498db"
  },
  itemText2:{
    color: "#000",
    marginTop: 5,
    // fontSize: 18,
    fontFamily: "serif",
   fontStyle: "italic",
   
    
    // color:"#3498db"
  },
  text:{
    paddingTop:"10%",
    paddingBottom:"2%",
    width: '100%', // Set the width to 100%
    fontSize: 18,
    fontFamily: "serif",
    // fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'left',
    color:"#3498db"
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


