import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const Search = ({searchTerm,placeholder,handleSearch}) => {
    
  return (
    <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#000" // Set the text color for placeholder
    value={searchTerm}
    onChangeText={handleSearch}
  />
  )
}

const styles=StyleSheet.create({
    input: {
        marginTop: 4,
        padding: 24,
        marginBottom: 16,
      
        width: '65%',
        padding: 7,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        color: '#000', // Set the text color
      },
})

export default Search