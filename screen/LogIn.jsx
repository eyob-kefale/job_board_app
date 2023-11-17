
// import React from 'react';
// import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
// import { Block, Text, theme } from 'galio-framework';


// import materialTheme from '../constants/Theme';

// const LogIn = ({navigation}) => {
//   // You can add your login logic here

//   return (
//     <View style={styles.container}>
//       <Block flex space="between" style={styles.padded}>
//         <Block flex space="evenly" style={{ zIndex: 2 }}>
//           <Block>
//             <Block>
//               <Text color="black" size={30}>
//                 Log In
//               </Text>
//             </Block>
//             <Block>
//               <TextInput style={styles.input} placeholder="Username" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//               />
//             </Block>
//           </Block>
//           <Block center>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate("Register")}>
//               <Text color="white" size={16}>
//                 LOGIN
//               </Text>
//             </TouchableOpacity>
//           </Block>
//         </Block>
//       </Block>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.COLORS.WHITE,
//   },
//   padded: {
//     paddingHorizontal: theme.SIZES.BASE * 4,
//     position: 'relative',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     height: 40,
//     paddingLeft: 10,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
//     width: '100%',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
// });

// export default LogIn;






import { Block ,Text} from 'galio-framework';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Images from '../constants/Images';
import materialTheme from '../constants/Theme';

const LogIn = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  
  const jobDetails = [
    {
    title: 'Software Developer',
    imgUrl:require("../assets/job1.jpg"),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl:require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl:require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl:require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl:require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl:require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
  {
    title: 'Software Developer',
    imgUrl:require("../assets/job1.jpg"),
    description: 'Tech Co',
    experienceRequired: '3 years',
    // Add more details as needed
  },
];



const handleLogIn=()=>{
  navigation.navigate("JobListing",{jobDetails});
}




  const handleRegistration = () => {
    // Add your registration logic here
    console.log('Registration submitted:', { userName,password });
    navigation.navigate("Register");
    // You can send the data to a server for further processing
  };




  return (
    <View style={styles.container}>
        <Block style={styles.form}>
      <Text style={styles.title}>LogIn</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={text => setUserName(text)}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Block center>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleLogIn }>
             <Text color="white" size={16}>
                LogIn
              </Text>
            </TouchableOpacity>
          </Block>

          <Block  center>
          <Text style={styles.sign}  color="black" size={12}>
                If you haven't an account
              </Text>
            <TouchableOpacity
             
              onPress={handleRegistration }>
             <Text color="blue" size={11}>
                sign up
              </Text>
            </TouchableOpacity>
          </Block>

      </Block>
    </View>
  );
};

const styles = StyleSheet.create({

 btn: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    width: '100%',
    padding: 15,
    paddingHorizontal:127,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:10
  },
 
  
    container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  form:{
    marginTop:20,
    paddingHorizontal:40,

}, 

sign:{
paddingBottom:8
},

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default LogIn;
