// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SectionList,
//   SafeAreaView,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import Search from "../../common/Search";
// import { useNavigation } from '@react-navigation/native';
// import materialTheme from '../../constants/Theme';
// import { collection, getDocs, limit, query, where } from 'firebase/firestore';
// import { db } from '../../FireBaseConfig';
// import { useEffect } from 'react';
// import { Block } from "galio-framework";
// import { useUser } from "../../common/context/UserContext";
// // import {FontAwesome} from 'react-native-vector-icons '
// import { Ionicons } from "@expo/vector-icons";
// // import JobListing from "../JobListing";

// const { width, height } = Dimensions.get('window');



// const dynamicStyles = {
//   // avatarSize: width * avatarSizeRatio,
//   notificationItemMarginBottom: height * 0.02,
//   notificationItemPadding: width * 0.04,
//   borderRadius: width * 0.02,
//   titleFontSize: width * 0.05,
//   descriptionFontSize: width * 0.035,
// };



// const ViewEmployeeApplication = ({ route }) => {
//   const { role, userEmail } = useUser();
//   const { email, docId } = route.params;
//   const [posts, setPosts] = useState([]);
//   // console.log("asvsg ", id);
//   const [ifApplied, setIfApplied] = useState(false);
//   const [showMoreMap, setShowMoreMap] = useState({});
//   const navigation = useNavigation();

//   const toggleShowMore = (index) => {
//     setShowMoreMap((prevShowMoreMap) => ({
//       ...prevShowMoreMap,
//       [index]: !prevShowMoreMap[index],
//     }));
//   };



//   // Fetch job data
  
//   const [user, setUser] = useState([]);
//   //const jobListsCollectionRef = query(collection(db, 'application'),where('email','==',email),where('docId','==',docId));
//   const q = query(collection(db, "application"), where('jobId','==',docId),where('email','==',email));
//   useEffect(() => {
//  //   console.log("jobListsCollectionRef", jobListsCollectionRef);
//     // const userProfile=query(collection(db,"user"),where("email","==",email));
//     const getJoblists = async () => {

//       const querySnapshot = await getDocs(q);
//       const postData = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           age: data.age,
//           coverLetter: data.coverLetter,
//           createdDate: data.createdDate.toDate(),
//           email: data.email,
//           fileUrl: data.fileUrl,
//           firstName: data.firstName,
//           jobId: data.jobId,
//           lastName: data.lastName,
//           profession: data.profession,
//         };
//       });
//       // Set the state once with the entire array
//       setPosts(postData);
//       console.log("posts", posts)

//     };
    
    
//     console.log("posts   ",posts)
//     getJoblists();
    
//   }, []);
  
//   const renderJobItem = ({ item, index }) => (
//     <TouchableOpacity >
//       <Block style={styles.addPosts}>
//         <Text style={styles.MyJobs}>employee application </Text>
//         {/* {(role == "employer") && (item.employer == userEmail) && (
//           <TouchableOpacity
//             onPress={() => onEditPress(item.docId)}
//           >
//             <Ionicons name="ios-create" style={styles.editbtn} size={30} color={"#000"} />

//           </TouchableOpacity>
//         )} */}
//       </Block>
//       <View key={index} style={styles.jobItem}>
//         {/* <Image source={{ uri: user.profileImage }} style={styles.image} resizeMode="cover" /> */}
//         <Text style={styles.title}>{item.firstName} {item.lastName}</Text>

//         <Text style={styles.title}>{item.email}</Text>
//         <Text style={styles.description}>
//           {item.profession}
//         </Text>
//         <Block>
//           <Text style={styles.title}>Cover Letter</Text>
//           <Text >{item.coverLetter}</Text>
//         </Block>
//         <Block>
//           <Text style={styles.title}>Age</Text>
//           <Text >{item.age}</Text>
//         </Block>

//         <Block>
//           <Text style={styles.title}>Applied Date</Text>
//           <Text >{item.createdDate}</Text>
//         </Block>
//         <Block>
//           <Text style={styles.title}>Resume</Text>
//           {/* <FontAwesome name={download} size={24} /> */}
//           {/* <TouchableOpacity onPress={downloadDocument}>
//             <Text>Download Document</Text>
//           </TouchableOpacity> */}
//         </Block>
//         {/* {role == "employee" && !ifApplied && (
//           <TouchableOpacity onPress={() => onApplyPress(item.id)} style={styles.applyButton}>
//             <Text style={styles.applyButtonText}>Apply</Text>
//           </TouchableOpacity>
//         )}
//         {(role == "employer") && (item.employer == userEmail) && (
//           <TouchableOpacity
//             onPress={() => onViewApplicantsPress(item.employer)}
//             style={styles.applyButton}>
//             <Text style={styles.applyButtonText}>View Applicants</Text>
//           </TouchableOpacity>
//         )} */}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.allItems}>
//       <Text>my applicants</Text>
//       {posts && posts.length > 0 ? (
//         posts.map((item) => (
//           <div key={item.email}>{/* Render your item data here */}</div>
//         ))
//       ) : (
//         <Text>No employee applications found</Text>
//       )}

//       {/* {posts.length === 0 ? (
//         <Text>No employee applications found</Text>
//       ) : (
//         <FlatList
//           data={posts}
//           renderItem={renderJobItem}
//           keyExtractor={(item, index) => index.toString()}
//           numColumns={1}
//         />
//       )} */}
//     </View>
//   );
// };





// const styles = StyleSheet.create({

//   editbtn: {

//     color: materialTheme.COLORS.BUTTON_COLOR,

//   },
//   addPosts: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     margin: "5%"
//   },
//   addPostIcon: {
//     color: materialTheme.COLORS.BUTTON_COLOR,
//     flexDirection: "row-reverse",
//     justifyContent: "flex-end",
//   },
//   MyJobs: {
//     color: materialTheme.COLORS.BUTTON_COLOR,
//     fontSize: 20,
//     fontWeight: "200",


//   }
//   ,
//   allItems: {
//     marginTop: "5%",
//     padding: dynamicStyles.notificationItemPadding,
//     backgroundColor: "#fff",
//     height: "100%"
//   },
//   itemText1: {
//     color: "#000",
//     marginTop: 5,
//     // fontSize: 18,
//     fontFamily: "serif",
//     fontStyle: "italic",
//     fontWeight: "bold",
//     width: '100%'
//     // color:"#3498db"
//   },
//   itemText2: {
//     color: "#000",
//     marginTop: 5,
//     // fontSize: 18,
//     fontFamily: "serif",
//     fontStyle: "italic",


//     // color:"#3498db"
//   },
//   text: {
//     paddingTop: "10%",
//     paddingBottom: "2%",
//     width: '100%', // Set the width to 100%
//     fontSize: 18,
//     fontFamily: "serif",
//     // fontStyle: "italic",
//     fontWeight: "bold",
//     textAlign: 'left',
//     // color:"#3498db"
//     color: materialTheme.COLORS.BUTTON_COLOR,
//   }
//   ,
//   container: {
//     // flex: 1,
//     // backgroundColor: '#fff',

//     height: "30%",
//     // borderRadius: 8,
//     // marginRight: 16,
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: "2%",

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   sectionHeader: {

//     fontWeight: "800",
//     fontSize: 18,
//     color: "#000",
//     marginTop: 1,
//     marginBottom: 15,
//   },
//   item: {
//     marginHorizontal: 1,

//     // marginBottom: 20,
//   },
//   itemPhoto: {
//     // width: 200,
//     // height: 200,
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 16,
//   },

//   card: {
//     // backgroundColor:"#BB9CC0",
//     padding: 16,
//     marginBottom: 70,
//   },

//   jobItem: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },

//   horizontalTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 6,
//   },

//   description: {
//     fontSize: 16,
//     marginBottom: 8,
//     textAlign: "justify",
//   },

//   showMoreButton: {
//     alignSelf: "flex-end",
//     padding: 8,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 4,
//   },
//   applyButton: {
//     // backgroundColor: "#3498db",
//     backgroundColor: materialTheme.COLORS.BUTTON_COLOR,

//     padding: 12,
//     borderRadius: 4,
//     marginTop: 8,
//     alignItems: "center",
//   },
//   applyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   image: {
//     width: "100%",
//     height: 300,
//     borderRadius: 8,
//     marginBottom: 8,
//   },


// });


// export default ViewEmployeeApplication;


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
import materialTheme from '../../constants/Theme';
import { useUser } from "../../common/context/UserContext";
import { FlatList } from "react-native";

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
const [posts, setPosts] = useState([]);

useEffect(() => {
  const jobListsCollectionRef = query(collection(db, 'application'), where('jobId', '==', docId),where('email', '==', email));

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


  
}, [docId]);

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
      <Text style={styles.detail}>{item.firstName} {item.lastName}</Text>
      </Block>

      <Block style={styles.addPosts}>
      <Text style={styles.title}>age</Text>
      <Text style={styles.detail}>{item.age}</Text>
      </Block>


      <Block style={styles.addPosts}>
      <Text style={styles.title}>Profession</Text>
      <Text style={styles.detail}>
        {item.profession}
      </Text>
      </Block>
     
      <Block style={styles.addPosts}>
        <Text style={styles.title}>coverLetter</Text>
      </Block>
        <Text style={styles.coverLetter}>{item.coverLetter}</Text>
      {/* <TouchableOpacity onPress={item.fileUrl}>
        <Text>
          Download
        </Text>
      </TouchableOpacity> */}
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
    marginTop: "5%",
    padding: dynamicStyles.notificationItemPadding,
    backgroundColor: "#fff",
    height: "100%"
  },
  addPosts: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%"
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
  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify",
  },
  coverLetter:{
    fontSize: 16,
    marginBottom: 8,
    textAlign: "justify",
    marginLeft:"5%"
  }
});

export default ViewEmployeeApplication;
