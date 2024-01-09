// ... (other imports)
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../FireBaseConfig';
import { Block } from 'galio-framework';

const { width, height } = Dimensions.get('window');

const SingleNotification = ({navigation,  route}) => {
  const { id } = route.params;
  // Fetch job data
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const jobListsCollectionRef = query(collection(db, 'notification'), where('jobId', '==', id));

    const getJoblists = async () => {
      try {
        const data = await getDocs(jobListsCollectionRef);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log("employeryy", posts);
      } catch (error) {
        console.error('Error fetching job lists: ', error);
      }
    };
    getJoblists();
    // check if applied

 
    
  }, [id]);

  const handleEmployerProfile=(id)=>{
    console.log("employer-id ",id);
      navigation.navigate("SingleJob",{id});
  }
  

  const renderJobItem = ({ item, index }) => (
    <>
          <Block style={styles.addPosts}>
            <Text style={styles.MyJobs}> </Text>
           
          </Block>
          <View key={index} style={styles.jobItem}>
            <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />
            <TouchableOpacity onPress={() => handleEmployerProfile(item.jobId)}>
    
            <Text style={styles.title}>{item.email}</Text>
            </TouchableOpacity>
    
            <Text style={styles.title}>Title</Text>
            <Text style={styles.detail}>{item.title}</Text>
    
            <Text style={styles.title}>Description</Text>
            <Text style={styles.detail}>
              {item.description}
            </Text>
            <Text style={styles.time}>
            <Text style={styles.closed}>
              The job open in
            </Text>
            <Text>  </Text>
            <Text style={styles.date}>
              {new Date(item.startDate).toLocaleDateString()}
            </Text>
          </Text>

          <Text style={styles.time}>
            <Text style={styles.closed}>
              The job closed in
            </Text>
            <Text>  </Text>
            <Text style={styles.date}>
              {item.endDate}
            </Text>
          </Text>

          </View>
    </>
       
      );
    
      return (
        <View style={styles.allItems}>
    
          
          <FlatList
            data={posts}
            renderItem={renderJobItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"5%",
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
  },
  jobItem: {
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

export default SingleNotification;
