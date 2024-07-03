import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Client from '../api/Client';
import Icon from 'react-native-vector-icons/Ionicons';
import GeneratorMaintenanceForm from '../components/AnalyticsComponent/GeneratorMaintenanceForm';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const Schedules = ({route, navigation}) => {
  const [maintenacelist, setMaintenanceList] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const gen = route.params;

  console.log("generator Schedule log", gen.generator.genId._id)

  const fetchData = async (selectedDate) => {
    try {
      console.log(selectedDate)
      // Fetch your data here
      const response = await Client.get(`/listmaintenance/${gen.generator.genId._id}/${selectedDate}`);
      console.log(response.data)
      setMaintenanceList(response.data)
    } catch (error) {
      if (error.response) {
        console.log('Server responded with:', error.response.data);
        console.log('Status code:', error.response.status);
        Alert.alert('Notice', `${error.response.data}`);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error setting up the request:', error.message)
      }
    }
  }

  
  

  

  useEffect(() => {
    // fetchData(selectedDate)
    const backAction = () => {
      navigation.goBack(); // Navigate back to the previous screen
      return true; // Return true to indicate that you've handled the back button
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Remove the back button listener when unmounting
  }, [navigation]);
  const [selectedDate, setSelectedDate] = useState('');

  // Sample list of maintenance tasks
  const maintenanceTasks = [
    'Change oil filter',
    'Inspect spark plugs',
    'Check coolant levels',
    'Replace air filter',
    // Add more tasks here
  ];

  // Function to handle date selection on the calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    fetchData(selectedDate)
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.containericon}>
            <TouchableOpacity style={{}} onPress={()=>navigation.goBack()}>
                <Icon name={'arrow-back-outline'} color={'grey'} size={25}  />
            </TouchableOpacity>
        </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' },
          }}
        />
      </View>
      <View style={styles.tasksContainer}>
        <Text style={styles.heading}>Maintenance Tasks for {selectedDate}</Text>
        {selectedDate ? (
          <View>
            {/* {maintenanceTasks.map((task, index) => (
              <TouchableOpacity key={index} style={styles.taskItem}>
                <Text>{task}</Text>
              </TouchableOpacity>
            ))} */}
            {maintenacelist ? (
        maintenacelist.map((task, index) => (
          <TouchableOpacity key={index} style={styles.taskItem}>
            <Text>{task.Motif}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No maintenance tasks for this date</Text>
      )}
          </View>
        ) : (
          <Text>Select a date to view tasks</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleModal}>
        <Icon name="add-outline" size={32} color={'#FFF'}/>
      </TouchableOpacity>
      <GeneratorMaintenanceForm
        visible={isModalVisible}
        onClose={toggleModal}
        gen={gen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:30
  },
  calendarContainer: {
    // flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  tasksContainer: {
    marginTop: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    flex:1,
    position: 'absolute',
    bottom: 20, // Adjust this value to control the vertical position
    right: 20, // Adjust this value to control the horizontal position
    backgroundColor: '#0074d9', // Change the background color as needed
    padding: 10,
    borderRadius: 30,
  },
  containericon:{
    // paddingTop:45,
        paddingBottom:10,
        // backgroundColor:"#fff",
        // paddingHorizontal: 15,
  }
});

export default Schedules;
