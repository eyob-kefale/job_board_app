// ... (other imports)

import { Block } from 'galio-framework';
import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const { height, width } = Dimensions.get('screen');

const JobListing = ({ route }) => {
  const { jobDetails } = route.params;
  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (index) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [index]: !prevShowMoreMap[index],
    }));
  };

  const onApplyPress = (title) => {
    // Implement logic for handling the "Apply" button press
    console.log('Apply button pressed for job:', title);
    // You can add your navigation logic or any other actions here
  };

  const renderJobItem = ({ item, index }) => (
    <Block key={index} style={styles.jobItem}>
      <Image source={item.imgUrl} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        {showMoreMap[index] ? item.description : `${item.description.substring(0, 100)}...`}
      </Text>
      {item.description.length > 100 && (
        <TouchableOpacity onPress={() => toggleShowMore(index)} style={styles.showMoreButton}>
          <Text>{showMoreMap[index] ? 'Show Less' : 'Show More'}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onApplyPress(item.title)} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </Block>
  );

  return (
    <FlatList
      data={jobDetails}
      renderItem={renderJobItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1} // Set the number of columns to 1
      contentContainerStyle={styles.card}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
  },
  jobItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  showMoreButton: {
    alignSelf: 'flex-end',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  applyButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default JobListing;
