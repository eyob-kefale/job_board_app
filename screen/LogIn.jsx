import { Block ,Text} from 'galio-framework';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Images from '../constants/Images';
import materialTheme from '../constants/Theme';
import { FIREBASE_AUTH } from '../FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading]=useState(false);
  const auth=FIREBASE_AUTH;
  // jobdetails
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


// userProfile

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


// const handleLogIn=()=>{
//   navigation.navigate("UserProfile",{user});
// }


const handleLogIn=async()=>{
  setLoading(true);
  try{
    const response = await signInWithEmailAndPassword(auth,email,password);
    navigation.navigate("NavBar");

  }catch(error){
    alert("Sign in failed: "+error.message);

  }finally{
    setLoading(false);
  }
}



  const handleRegistration = () => {
    // Add your registration logic here
    // console.log('Registration submitted:', { Email,password });
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
        value={email}
        onChangeText={text => setEmail(text)}
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
             <Text style={styles.signUp} >
                sign up
              </Text>
            </TouchableOpacity>
          </Block>

      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
signUp:{
  color: materialTheme.COLORS.BUTTON_COLOR,
  size:15
},
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
