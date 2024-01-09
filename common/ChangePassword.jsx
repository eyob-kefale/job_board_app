import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useUser } from './context/UserContext';
import materialTheme from '../constants/Theme'
import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../FireBaseConfig';
// import { getAuth } from "firebase/auth";

const ChangePassword = ({ navigation }) => {
    const [password, setNewPassword] = useState('');
    const [newpassword, setNewnewPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    // const [user, setUser] = useState('');
    const { userEmail } = useUser();
    
    const auth = getAuth();
    const user = auth.currentUser;
// console.log("getAuthgetAuth ",user)
//     const userDoc = query(collection(db, 'user'), where('email', '==', userEmail));
//     useEffect(() => {
//         const fetchUser = async () => {
//             const fetchUserDoc = await getDocs(userDoc);
//             setUser(fetchUserDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         }

//         fetchUser()
//     }, [user])
// console.log("change password ",user);
    const changePassword = async () => {
        console.log(userEmail);
        if(repassword==newpassword){

            const credential = EmailAuthProvider.credential(userEmail, password);
    
            try {
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newpassword);
                alert('Password updated successfully');
                navigation.navigate('LogIn');
            } catch (error) {
                console.error('Error updating password', error.message);
                alert('Incorrect. Please reLogIn first.');
            }
        }else{
            alert('password mismatch ');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Change Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Current Password"
                    secureTextEntry
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry
                    onChangeText={(text) => setNewnewPassword(text)}
                //   keyboardType="phone-pad"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Retype The New Password"
                    secureTextEntry
                    onChangeText={(text) => setRePassword(text)}
                //   keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.addButton} onPress={changePassword}>
                    <Text style={styles.addButtonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: materialTheme.COLORS.BUTTON_COLOR,
        alignSelf: 'center',
    },
    inputContainer: {
        marginBottom: 16,
        marginTop: '10%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    addButton: {
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChangePassword;
