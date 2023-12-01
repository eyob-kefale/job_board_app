// import React from "react";
// import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
// import { Block, Text, theme } from "galio-framework";
// import { Ionicons } from '@expo/vector-icons';

// const UserProfile = ({ route, navigation }) => {
//   const { user } = route.params;

//   const renderItem = ({ item }) => (
//     <View style={styles.socialLink}>
//       <Ionicons name={item.icon} size={24} color={theme.COLORS.INFO} />
//       <Text style={styles.socialLinkText}>{item.label}</Text>
//     </View>
//   );

//   const handleEditProfile = () => {
//     // Navigate to the EditProfile screen
//     navigation.navigate('EditProfile', { user });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Block style={styles.profileImageContainer}>
//         <Image source={user.profileImage} style={styles.profileImage} />
//       </Block>

//       <Block style={styles.header}>
//         <Text p style={styles.title}>
//           {user.name}
//         </Text>
//         <Text style={styles.desc}>{user.email}</Text>
      
//       </Block>

//       <ScrollView style={styles.detailsContainer}>
//         <Text h5 style={styles.sectionTitle}>
//           Skills:
//         </Text>
//         <Text style={styles.desc}>{user.skills.join(", ")}</Text>

//         <Text h5 style={styles.sectionTitle}>
//           Educational Details:
//         </Text>
//         <Text style={styles.desc}>{user.education}</Text>

//         <Text h5 style={styles.sectionTitle}>
//           Profession:
//         </Text>
//         <Text style={styles.desc}>{user.profession}</Text>

//         <Text h5 style={styles.sectionTitle}>
//           About Me:
//         </Text>
//         <Text style={styles.desc}>{user.aboutMe}</Text>
//       </ScrollView>
//       <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
//         <Ionicons name="ios-create" size={24} color={theme.COLORS.SUCCESS} />
//         <Text style={styles.editButtonText}>Edit Profile</Text>
//       </TouchableOpacity>
//       <Block style={styles.sectionTitleContainer}>
//         <Text h5 style={styles.sectionTitle}>
//           Social Links:
//         </Text>
//         <FlatList
//           data={user.socialLinks}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           horizontal
//         />
//       </Block>

      

//       {/* <TouchableOpacity style={styles.followButton}>
//         <Text style={styles.followButtonText}>{user.isFollowing ? "Unfollow" : "Follow"}</Text>
//       </TouchableOpacity> */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
  
  // editButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: theme.COLORS.WHITE,
  //   padding: 12,
  //   borderRadius: 8,
  //   borderWidth: 1,
  //   borderColor: theme.COLORS.SUCCESS,
  //   marginTop: 16,
  //   marginLeft: "5%",
  // },
  // editButtonText: {
  //   color: theme.COLORS.SUCCESS,
  //   fontSize: 16,
  //   marginLeft: 8,
  // },

  // container: {
  //   backgroundColor: "#fff",
  //   flex: 1,
  //   padding: 16,
  // },
  // desc: {
  //   color: "#000",
  //   marginBottom: 20,
  //   textAlign:"justify"
  // },
  // header: {
  //   marginBottom: 20,
  // },
  // title: {
  //   color: "#000",
  //   marginBottom: 8,
  // },
  // rating: {
  //   color: theme.COLORS.WARNING,
  //   fontSize: 20,
  //   marginBottom: 8,
  // },
  // profileImageContainer: {},
  // profileImage: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: 60,
  //   resizeMode: "cover",
  // },
  // detailsContainer: {
  //   color: "#000",
  //   marginTop: 20,
  //   marginLeft: "5%",
  // },
  // sectionTitleContainer: {
  //   marginTop: 20,
  //   marginBottom:30,
  // },
  // sectionTitle: {
  //   color: "#000",
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 8,
  //   marginTop: 13,
  // },
  // socialLink: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginRight: 16,
    
  // },
  // socialLinkText: {
  //   marginLeft: 8,
  // },
  // followButton: {
  //   backgroundColor: "#3498db",
  //   padding: 12,
  //   borderRadius: 8,
  //   marginTop: 16,
  //   marginBottom:30,
  //   alignItems: 'center',
  // },
  // followButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  // },
// });

// export default UserProfile;


import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-picker';

const UserProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [profileImage, setProfileImage] = useState(user.profileImage);

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

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        setProfileImage(response.uri);
        // You may want to upload the selected image to your server or perform other actions.
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer} onPress={handleChoosePhoto}>
      <Image source={{ uri: `${profileImage}` }} style={styles.profileImage} />

        <Ionicons name="ios-camera" size={24} color={theme.COLORS.SUCCESS} style={styles.cameraIcon} />
      </TouchableOpacity>

      <Block style={styles.header}>
        <Text p style={styles.title}>
          {user.name}
        </Text>
        <Text style={styles.desc}>{user.email}</Text>
      </Block>

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
        <Text style={styles.desc}>{user.profession}</Text>

        <Text h5 style={styles.sectionTitle}>
          About Me:
        </Text>
        <Text style={styles.desc}>{user.aboutMe}</Text>
      </ScrollView>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Ionicons name="ios-create" size={24} color={theme.COLORS.SUCCESS} />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

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
  );
};

const styles = StyleSheet.create({
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.WHITE,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.COLORS.SUCCESS,
    marginTop: 16,
    marginLeft: "5%",
  },
  editButtonText: {
    color: theme.COLORS.SUCCESS,
    fontSize: 16,
    marginLeft: 8,
  },

  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  desc: {
    color: "#000",
    marginBottom: 20,
    textAlign:"justify"
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: "#000",
    marginBottom: 8,
  },
  rating: {
    color: theme.COLORS.WARNING,
    fontSize: 20,
    marginBottom: 8,
  },
  profileImageContainer: {},
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  detailsContainer: {
    color: "#000",
    marginTop: 20,
    marginLeft: "5%",
  },
  sectionTitleContainer: {
    marginTop: 20,
    marginBottom:30,
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
    marginBottom:30,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 12,
    padding: 4,
  },
});

export default UserProfile;