import React from "react";
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons } from '@expo/vector-icons';

const user = {
    name: 'Eyob Kefale',
    email: 'jobkefale@gmail.com',
    department: 'Software Engineer',
    profileImage: require("../assets/job2.jpg"),
    skills: ['React Native', 'JavaScript', 'UI/UX Design'],
    education: 'Bachelor of Computer Science, Example University',
    profession: 'Software Engineer',
    aboutMe: 'Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.Passionate about creating delightful user experiences with a focus on mobile app development.',
  };
const UserProfile = ({navigation }) => {
//   const { user } = route.params;

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
        <Text h5 style={styles.sectionTitle}>
          Skills:
        </Text>
        <Text style={styles.desc}>{user.skills.join(", ")}</Text>

        <Text h5 style={styles.sectionTitle}>
          Educational Details:
        </Text>
        <Text style={styles.desc}>{user.education}</Text>

        <Text h5 style={styles.sectionTitle}>
          Profession:
        </Text>
        <Text style={styles.desc}>{user.c}</Text>

        <Text h5 style={styles.sectionTitle}>
          About Me:
        </Text>
        <Text style={styles.desc}>{user.aboutMe}</Text>
     
     
      <Block style={styles.sectionTitleContainer}>
        <Text h5 style={styles.sectionTitle}>
          Social Links:
        </Text>
        <FlatList
          data={user.socialLinks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </Block>

      </ScrollView>

      {/* <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>{user.isFollowing ? "Unfollow" : "Follow"}</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

   const styles = StyleSheet.create({
        bgImage:{
      padding:0,
      height:250,
      width:"100%",
      borderRadius: 15,
      borderWidth: 4,
        },
      
        subCont:{
     flex:1,
     marginBottom:"40%"
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
        editButtonText: {
          color:  "#001B79",
          fontSize: 16,
          marginLeft: 8,
        },
      
        container: {
          // backgroundColor: "#EBE3D5",
          backgroundColor: "#fff",
          flex: 1,
          padding: 16,
          marginTop:"5%",
      
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
          width:"100%",
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
          marginTop: 20,
          height:"100%",
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

