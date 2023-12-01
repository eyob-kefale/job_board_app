import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const avatarSizeRatio = 0.15; // You can adjust the fraction as needed

const notifications = [
  {
    id: '1',
    avatar: 'https://placekitten.com/50/50',
    title: 'Notification 1',
    description: 'This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.This is the first notification description.',
  },
  {
    id: '2',
    avatar: 'https://placekitten.com/50/51',
    title: 'Notification 2',
    description: 'This is the second notification description.',
  },
  {
    id: '3',
    avatar: 'https://placekitten.com/50/50',
    title: 'Notification 3',
    description: 'This is the third notification description.',
  },
  {
    id: '4',
    avatar: 'https://placekitten.com/50/51',
    title: 'Notification 4',
    description: 'This is the fourth notification description.',
  },
  {
    id: '5',
    avatar: 'https://placekitten.com/50/50',
    title: 'Notification 5',
    description: 'This is the fifth notification description.',
  },
  {
    id: '6',
    avatar: 'https://placekitten.com/50/51',
    title: 'Notification 6',
    description: 'This is the sixth notification description.',
  },
];

const dynamicStyles = {
  avatarSize: width * avatarSizeRatio,
  notificationItemMarginBottom: height * 0.02,
  notificationItemPadding: width * 0.04,
  borderRadius: width * 0.02,
  titleFontSize: width * 0.05,
  descriptionFontSize: width * 0.035,
};



const Notification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (text) => {
      setSearchTerm(text);
    };
  
    const filteredInfo = notifications.filter(info => info.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, { marginBottom: dynamicStyles.notificationItemMarginBottom, padding: dynamicStyles.notificationItemPadding }]}
      onPress={() => navigation.navigate('SingleNotification',{notifications,item})}
    >
      <Image source={{ uri: item.avatar }} style={[styles.avatar, { width: dynamicStyles.avatarSize, height: dynamicStyles.avatarSize }]} />
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, { fontSize: dynamicStyles.titleFontSize }]}>{item.title}</Text>
        <Text style={[styles.notificationDescription, { fontSize: dynamicStyles.descriptionFontSize }]}>
          {item.description=`${item.description.substring(0, 100)}...`}
          </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <TextInput
        style={styles.input}
        placeholder="Search office requirement here"
        placeholderTextColor="#000" // Set the text color for placeholder
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredInfo}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: dynamicStyles.notificationItemPadding,
   
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: dynamicStyles.borderRadius,
    // borderBottomWidth: 2,
    // borderBottomColor:"blue"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    borderRadius: dynamicStyles.avatarSize / 2,
    marginRight: dynamicStyles.notificationItemPadding,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: dynamicStyles.titleFontSize,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: dynamicStyles.descriptionFontSize,
  },
  input: {
    marginTop: 24,
    padding: 24,
    marginBottom: 16,
  
    width: '65%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#000', // Set the text color
  },

});

export default Notification;
