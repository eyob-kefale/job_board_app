import { theme } from 'galio-framework';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import materialTheme from '../constants/Theme';
const ApplyPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmit = () => {
    // Implement logic to submit the application
    console.log('Application submitted:', { name, email, resume, coverLetter });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Apply for the Job</Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Attach Resume"
            value={resume}
            onChangeText={(text) => setResume(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Write a Cover Letter"
            multiline
            numberOfLines={4}
            value={coverLetter}
            onChangeText={(text) => setCoverLetter(text)}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    margin:"5%"
  },
  header: {
    backgroundColor: '#0766AD',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: theme.COLORS.WHITE,
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    borderColor: "#0766AD",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApplyPage;
