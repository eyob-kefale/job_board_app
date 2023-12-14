import { Block ,Text} from 'galio-framework';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

import materialTheme from '../constants/Theme';

const Register = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Add your registration logic here
    // console.log('Registration submitted:', { firstName, lastName, email, password });
    navigation.navigate("LogIn");
    // You can send the data to a server for further processing
  };

  return (
    <View style={styles.container}>
        <Block style={styles.form}>
      <Text style={styles.title}>Registration Form</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
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
              onPress={handleRegistration }>
             <Text color="white" size={16}>
                Register
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
    
  },
 
    form:{
marginTop:20,
paddingHorizontal:30,

 }, 
    container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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

export default Register;
