import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Block, Text } from "galio-framework";

const UserProfile = ({ route }) => {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <Block style={styles.profileImageContainer}>
        <Image source={user.profileImage} style={styles.profileImage} />
      </Block>

      <Block style={styles.header}>
        <Text p style={styles.title}>
          {user.name}
        </Text>
        <Text style={styles.desc}>{user.email}</Text>
      </Block>

      <Block style={styles.detailsContainer}>
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
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  desc: {
    color: "#000",
  },

  header: {
    color: "#000",

    marginBottom: 20,
  },
  title: {
    color: "#000",
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
    marginLeft: "15%",
  },
  sectionTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 13,
  },
});

export default UserProfile;
// import React from 'react';
// import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform,StatusBar } from 'react-native';
// import { Block, Text, theme } from 'galio-framework';
// import { LinearGradient } from 'expo-linear-gradient';

// import { Icon } from 'react-native-elements';
// import { Images, materialTheme } from '../constants/Images';

// const StatusHeight = StatusBar.currentHeight;
//  const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
// const { width, height } = Dimensions.get('screen');
// const thumbMeasure = (width - 48 - 32) / 3;

// const UserProfile = ({route}) => {
//     const {user}=route.params;
//   return (
//     <Block flex style={styles.profile}>
//       <Block flex>
//         <ImageBackground
//           source={require("../assets/job2.jpg")}
//           style={styles.profileContainer}
//           imageStyle={styles.profileImage}>
//           <Block flex style={styles.profileDetails}>
//             <Block style={styles.profileTexts}>
//               <Text color="white" size={28} style={{ paddingBottom: 8 }}>Eyob Kefale</Text>
//               <Block row space="between">
//                 <Block row>
//                   <Block middle style={styles.pro}>
//                     <Text size={16} color="white">Pro</Text>
//                   </Block>
//                   <Text color="white" size={16} muted style={styles.seller}>Seller</Text>
//                   <Text size={16} color={theme.COLORS.WARNING}>
//                     4.8 <Icon name="" family="GalioExtra" size={14} />
//                   </Text>
//                 </Block>
//                 <Block>
//                   <Text color={theme.COLORS.MUTED} size={16}>
//                     <Icon  family="font-awesome" color={theme.COLORS.MUTED} size={16} />
//                     {` `} Los Angeles, CA
//                   </Text>
//                 </Block>
//               </Block>
//             </Block>
//             <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
//           </Block>
//         </ImageBackground>
//       </Block>
//       <Block flex style={styles.options}>
//         <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>

//         <Text h5 style={styles.sectionTitle}>Skills:</Text>
//         <Text style={styles.desc}>{user.skills.join(', ')}</Text>

//         <Text h5 style={styles.sectionTitle}>Educational Details:</Text>
//         <Text style={styles.desc}>{user.education}</Text>

//         <Text h5 style={styles.sectionTitle}>Profession:</Text>
//         <Text style={styles.desc}>{user.profession}</Text>

//         <Text h5 style={styles.sectionTitle}>About Me:</Text>
//         <Text style={styles.desc}>{user.aboutMe}</Text>

//         </ScrollView>
//       </Block>
//     </Block>
//   );
// };

// const styles = StyleSheet.create({
//     scrollViewContainer: {
//         flex: 1,
//       },
//     profile: {
//         marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
//         marginBottom: -HeaderHeight * 2,
//       },
//       profileImage: {
//         width: width,
//         height: height*0.5
//       },
//       profileContainer: {
//         width: width,
//         height: height / 2,
//       },
//       profileDetails: {
//         paddingTop: theme.SIZES.BASE * 4,
//         justifyContent: 'flex-end',
//         position: 'relative',
//       },
//       profileTexts: {
//         paddingHorizontal: theme.SIZES.BASE * 2,
//         paddingVertical: theme.SIZES.BASE * 2,
//         zIndex: 2
//       },
//       pro: {
//         backgroundColor: theme.COLORS.LABEL,
//         paddingHorizontal: 6,
//         marginRight: theme.SIZES.BASE / 2,
//         borderRadius: 4,
//         height: 19,
//         width: 38,
//       },
//       seller: {
//         marginRight: theme.SIZES.BASE / 2,
//       },
//       options: {
//         position: 'relative',
//         padding: theme.SIZES.BASE,
//         marginHorizontal: theme.SIZES.BASE,
//         marginTop: -theme.SIZES.BASE * 7,
//         borderTopLeftRadius: 13,
//         borderTopRightRadius: 13,
//         backgroundColor: theme.COLORS.WHITE,
//         shadowColor: 'black',
//         shadowOffset: { width: 0, height: 0 },
//         shadowRadius: 8,
//         shadowOpacity: 0.2,
//         zIndex: 2,
//       },
//       thumb: {
//         borderRadius: 4,
//         marginVertical: 4,
//         alignSelf: 'center',
//         width: thumbMeasure,
//         height: thumbMeasure
//       },
//       gradient: {
//         zIndex: 1,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         height: '30%',
//         position: 'absolute',
//       },

//           header: {

//             marginBottom: 20,
//           },
//           title: {

//             marginBottom: 8,
//           },
//           profileImageContainer: {

//           },

//           detailsContainer: {
//            flex:1,
//             marginTop: 20,
//             marginLeft:"15%"
//           },
//           sectionTitle: {

//             fontSize: 18,
//             fontWeight: 'bold',
//             marginBottom: 8,
//             marginTop:13
//           },
// });

// export default UserProfile;
