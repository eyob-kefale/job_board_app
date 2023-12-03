import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
// Import the icon library you are using

const Search = ({ searchTerm, placeholder, handleSearch }) => {


  return (
    <View style={styles.inputContainer}>
      <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        underLineColorAndroid="transparent"
        placeholderTextColor="grey"
        style={styles.input}
        placeholder={placeholder}

        value={searchTerm}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = {
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 4,
    marginBottom: 8
  },
  icon: {
    marginRight: 8,
  },
  input: {

    flex: 1,
    fontWeight: '700',
    paddingVertical: 10,
    backgroundColor: '#fff',

  },
};

export default Search;
