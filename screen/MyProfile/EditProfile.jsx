import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

const EditProfile = ({ route, navigation }) => {
  const { user } = route.params;
  const [editedUser, setEditedUser] = useState(user);

  const handleSaveChanges = () => {
    // Implement logic to save changes to the user profile
    // For simplicity, this example updates the user state directly.
    // In a real app, you might want to make an API call or use state management.
    navigation.navigate('UserProfile', { user: editedUser });
  };

  return (
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

        {/* Add other input fields for editing user details */}
        {/* For example: email, skills, education, profession, aboutMe, etc. */}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </Block>
    </View>
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
    backgroundColor: theme.COLORS.SUCCESS,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
