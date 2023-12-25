import React from "react";
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';

import materialTheme from '../../constants/Theme';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../FireBaseConfig';
import { useEffect } from 'react';
import { useState } from "react";
import { useUser } from "../../common/context/UserContext";
const UserProfile = ({ route, navigation }) => {
  const { user } = route.params;
  
  const { userEmail,docId } = useUser();
// console.log(user);
const [id, setId] = useState([]);

//  console.log(userEmail,"plm ",docId," emailllll");
//  usertid=user[0].id;
  //start fetching from jobLists
  const [userProfile, setUser] = useState([]);

  const userCollectionRef = query(collection(db, 'user'), where("email", "==",userEmail), limit(10));


  useEffect(() => {
    const getUserprofile = async () => {
      try {
        const querySnapshot = await getDocs(userCollectionRef);
        const userData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          user: doc.user,
          id: doc.id, // Access the document ID directly here
        }));
        setUser(userData);
        //  console.log("idddddddd ", userData.map(user => user.id));
        setId(prevId => [...prevId, ...userData.map(user => user.id)]);
    //      id = userData.map(user => user.id);
    // console.log("idddddddd ", id);

      } catch (error) {
        console.error('Error fetching user profile: ', error);
      }
      
    };
    getUserprofile();
    const intervalId = setInterval(() => {
      getUserprofile();
    }, 2000);
  
    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  
    
  }, []);
  

  //end fetching from jobLists

  const renderItem = ({ item,index }) => (
    <View key={index} style={styles.socialLink}>
      <Ionicons name={item.icon} size={24} color={theme.COLORS.INFO} />
      <Text style={styles.socialLinkText}>{item.label}</Text>
    </View>
  );

  const handleEditProfile = () => {
    // console.log("idddddddd ", id);
    // Navigate to the EditProfile screen
    navigation.navigate('EditProfile', { userProfile,userIds: id  });

  };
  // const myApplications = () => {
  //   // Navigate to the EditProfile screen
  //   navigation.navigate('MyApplication', { user });

  // };

  const screenWidth = Dimensions.get('window').width;
  const dynamicMarginLeft = screenWidth * 0.1;

  return (

    <ScrollView style={styles.container}>
      {userProfile.map((userP) => (
        <>
        
          <View style={styles.subCont}>
            <Image style={styles.bgImage} source={require("../../assets/job1.jpg")}></Image>

            <Block style={styles.imgcont}>
              <Block style={styles.profileImageContainer}>
                {!userP.profileImage && <Image source={require("../../assets/default.jpeg")} style={styles.profileImage} />}
                {userP.profileImage && <Image source={{ uri: userP.profileImage }} style={styles.profileImage} />}
                <View style={styles.dptCont}>
                  <Text style={styles.dpt}>
                    {userP.department}

                  </Text>

                </View>
              </Block>
              <Block style={styles.editCont}>

                <Block style={styles.header}>
                  <Text style={styles.emailCont}>
                  <Entypo style={styles.nameIcon} name="man"></Entypo>
                  <Text p style={styles.title}>
                    {userP.firstName} {userP.lastName}
                  </Text>

                  </Text>
                  <Block style={styles.emailCont}>
                  <MaterialCommunityIcons style={styles.emailIcon} name="email"></MaterialCommunityIcons>
                  <Text style={styles.email}>{userP.email}</Text>
                  </Block>

                </Block>
                <TouchableOpacity onPress={handleEditProfile}>
                  <Ionicons name="ios-create" style={styles.editbtn} size={30} color={"#000"} />
               
                </TouchableOpacity>
              </Block>
            </Block>
          </View>

          <ScrollView style={styles.detailsContainer}>
            {userP.skills && (
              <>
                <Text h5 style={styles.sectionTitle}>
                  Skills:
                </Text>
                <Text style={styles.desc}>{userP.skills}</Text>

              </>
            )}
            {userP.education && (
              <>
                <Text h5 style={styles.sectionTitle}>
                  Educational Details:
                </Text>
                <Text style={styles.desc}>{userP.education}</Text>
              </>
            )}
            {userP.profession && (
              <>
                <Text h5 style={styles.sectionTitle}>
                  Profession:
                </Text>
                <Text style={styles.desc}>{userP.profession}</Text>
              </>
            )}
            {userP.aboutMe && (
              <>
                <Text h5 style={styles.sectionTitle}>
                  About Me:
                </Text>
                <Text style={styles.desc}>{userP.aboutMe}</Text>
              </>
            )}
            {/* <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="ios-create" size={24} color={"#fff"} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.MyApplicationButton} onPress={myApplications}>
          <Ionicons name="list" size={24} color={"#001B79"} />
          <Text style={styles.editButtonText}>My Applications</Text>
        </TouchableOpacity> */}
            <Block style={styles.sectionTitleContainer}>
              {/* <Text h5 style={styles.sectionTitle}>
                Social Links:
              </Text> */}
              {/* <FlatList
                data={user.socialLinks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
              /> */}
            </Block>

          </ScrollView>
        </>
))}
      {/* <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>{user.isFollowing ? "Unfollow" : "Follow"}</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  editbtn: {
   marginRight:'10%',
   marginBottom:'37%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
   
    color: materialTheme.COLORS.BUTTON_COLOR,
   
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: theme.COLORS.WHITE,
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,

    borderColor: "#001B79",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: "60%",
    // marginLeft: "5%",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },


  container: {
    // backgroundColor: "#EBE3D5",
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    marginTop: "5%",

  },

  editCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to the left and right edges
    alignItems: 'center', // Center items vertically
  },

  desc: {
    color: "#000",
    marginBottom: 20,
    textAlign: "justify"
  },
  header: {
    marginBottom: 20,
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


  rating: {
    color: theme.COLORS.WARNING,
    fontSize: 20,
    marginBottom: 8,
  },
  profileImageContainer: {
    flexDirection: "row",

  },
  dptCont: {
    flex: 1,
    padding: 16,
    paddingVertical: 50
    // alignItems: 'center',
    // justifyContent: 'center',
  }
  ,
  dpt: {
    width: '100%', // Set the width to 100%
    fontSize: 18,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center',
    color: materialTheme.COLORS.BUTTON_COLOR


  }
  ,
  title: {
    width: '100%', // Set the width to 100%
    fontSize: 15,
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "normal",


    color: "#000",
    marginBottom: 8,
    marginLeft:8
  },
  email: {
    fontSize: 15,
    
    fontFamily: "serif",
    fontStyle: "italic",
    fontWeight: "normal",
    marginTop:8
  },
  emailCont:{
    flexDirection:"row",

  }
  ,
  emailIcon:{
    marginTop:"5%",
    color:materialTheme.COLORS.BUTTON_COLOR,
    // marginRight:"5%"
  }
  ,
  nameIcon:{
    marginTop:"5%",
    paddingRight:"15%",
    color:materialTheme.COLORS.BUTTON_COLOR,
  }
  ,

  profileImage: {

    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  detailsContainer: {
    color: "#000",
    marginTop: 20,
    height: "100%",
    marginLeft: "5%",

  },
  sectionTitleContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 13,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,

  },
  socialLinkText: {
    marginLeft: 8,
  },
  followButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfile;

