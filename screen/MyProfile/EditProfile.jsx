import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { ScrollView } from 'react-native';

const EditProfile = ({ route, navigation }) => {
  const { user } = route.params;

  const [editedUser, setEditedUser] = useState(user);
  const [editedEmail, setEditedEmail] = useState(user);
  const [editedDept, setEditedDept] = useState(user);
  const [editedSkills, setEditedSkills] = useState(user);
  const [editedEducationalDetail, setEditedEducationalDetail] = useState(user);
  const [editedprofession, setEditedprofession] = useState(user);
  const [editedAboutMe, setEditedAboutMe] = useState(user);


  const handleSaveChanges = () => {
    // Implement logic to save changes to the user profile
    // For simplicity, this example updates the user state directly.
    // In a real app, you might want to make an API call or use state management.
    navigation.navigate('UserProfile', { user: editedUser });
  };

  return (
    <ScrollView>

    <View style={styles.container}>
      <Block style={styles.detailsContainer}>
        <Text h5 style={styles.sectionTitle}>
          Name:
        </Text>
        <TextInput
          style={styles.input}
          value={editedUser.name}
          onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
        />

        <Text h5 style={styles.sectionTitle}>
          Email:
        </Text>
        <TextInput
          style={styles.input}
          value={editedEmail.email}
          onChangeText={(text) => setEditedEmail({ ...editedEmail, email: text })}
        />

        <Text h5 style={styles.sectionTitle}>
          Department:
        </Text>
        <TextInput
          style={styles.input}
          value={editedDept.department}
          onChangeText={(text) => setEditedDept({ ...editedDept, department: text })}
        />

        <Text h5 style={styles.sectionTitle}>
          Educational Details:
        </Text>
        <TextInput
          style={styles.input}
          value={editedEducationalDetail.education}
          onChangeText={(text) => setEditedEducationalDetail({ ...editedEducationalDetail, EducationalDetail: text })}
        />

        <Text h5 style={styles.sectionTitle}>
          Skills:
        </Text>
        <TextInput
          style={styles.input}
          value={editedSkills.skills.join(", ")}
          onChangeText={(text) => setEditedSkills({ ...editedSkills, skills: text })}
        />

        <Text h5 style={styles.sectionTitle}>
          About Me:
        </Text>
        <TextInput
          style={styles.input}
          value={editedAboutMe.aboutMe}
          onChangeText={(text) => setEditedAboutMe({ ...editedAboutMe, aboutMe: text })}
        />

        {/* Add other input fields for editing user details */}
        {/* For example: email, skills, education, profession, aboutMe, etc. */}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </Block>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  detailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.COLORS.INFO,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: "10%",
    marginBottom:"7%",
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
