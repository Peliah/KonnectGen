import React, { useEffect, useState } from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { BackHandler } from 'react-native';
import Client from '../api/Client';

const Share = ({ navigation, route }) => {
  const {generator} = route.params
  console.log("share:", generator)

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement your suggestion logic here based on the query
    // For example, filter data based on the query
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredData);
  };

  const handleSelectItem = (item) => {
    // Handle the selected suggestion here, e.g., navigate to a details screen
    console.log('Selected Item:', item);
    setSearchQuery('');
    setSuggestions([]); // Clear suggestions after selection
  };
  useEffect(() => {
    fetchUserSuggestions();
    const backAction = () => {
      navigation.goBack(); // Navigate back to the previous screen
      return true; // Return true to indicate that you've handled the back button
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Remove the back button listener when unmounting
  }, [navigation]); // Make sure to include navigation in the dependency array

  const fetchUserSuggestions = async () => {
    try {
      const response = await Client.get(`/searchacc`, {
        params: {
          search: searchQuery,
        },
        headers: {
          'Content-Type': 'application/json',
          // You can add any required headers, such as authentication tokens, here
        },
      });

      if (response.status === 200) {
        // Store the user suggestions in state
        setSuggestions(response.data);
      } else {
        // Handle errors here, e.g., response.status
        console.error('Search request failed:', response.status);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during search:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
       style={styles.input}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectUser(item)}>
            <Text style={styles.suggestionItem}>{item.First_name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedUser && (
        <TouchableOpacity onPress={handleShareGenerator} style={styles.shareButton}>
          <Text style={{ color: '#fff' }}>Share Generator</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
  },
  suggestionItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Share;
