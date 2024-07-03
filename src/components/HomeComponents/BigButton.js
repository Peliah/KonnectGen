import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import Client from './../../api/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BigButton = ({ generator, SerialNo}) => {
  const { authData } = useContext(AuthContext);
  const [isOn, setIsOn] = useState(false);
  const [running, setRunning] = useState(false);
  const [duration, setDuration] = useState(null);
  const [time, setTime] = useState(0);

  console.log("This is my serial ")

  useEffect(() => {
    fetchCurrentSerial();
  }, []);

  const fetchCurrentSerial = async () => {
    try {
      const response = await Client.get(`/serial/${generator.genId.GenKonnectID}`);
      console.log("serial numberssss ", response.data[0].SerialNo)
      const SerialNumber = response.data[0].SerialNo

      fetchCurrentState(SerialNumber)
    } catch (error) {
      // Handle errors
    }
  };

  const fetchCurrentState = async (SerialNumber) => {
    try {
      const response = await Client.get(`/getchange/${SerialNumber}`);
      console.log("stataes", response.data.state)
      setIsOn(response.data.state);
      console.log(isOn)
      if (response.data.state === 1) {
        // If the generator is running, calculate the duration
        console.log("hiiii ",generator.genId.updatedAt)
        // calculateDuration(generator.genId.updatedAt);
      }
    } catch (error) {
      // Handle errors
    }
  };

  // const calculateDuration = (updatedAt) => {
  //   const intervalId = setInterval(() => {
  //     const updatedTime = new Date(updatedAt).getTime();
  //     console.log("Updated Time",updatedTime);
  //     const currentTime = new Date().getTime();
  //     const diff = currentTime - updatedTime;

  //     // Calculate hours, minutes, and seconds from the difference
  //     const hours = Math.floor(diff / 3600000);
  //     const minutes = Math.floor((diff % 3600000) / 60000);
  //     const seconds = Math.floor((diff % 60000) / 1000);

  //     // Format the duration as a string
  //     const durationString = `${hours}h ${minutes}m ${seconds}s`;

  //     // Update the duration state
  //     setDuration(durationString);
  //   }, 1000); // Update every second

  //   // Clean up the interval on unmount or when the generator stops running
  //   return () => clearInterval(intervalId);
  // };

  const toggleSwitch = async () => {
    const apiValue = isOn ? 0 : 1;
    setIsOn(!isOn);
    isOn ? reset() : startStop();
    try {
      const token = await AsyncStorage.getItem('userToken');
      const myItem = await AsyncStorage.getItem('authData');
      const response = await Client.post(
        '/change',
        { state: apiValue, genId: generator.genId._id },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error + ' Why 400');
    }
  };

  // const startStop = () => {
  //   setRunning(!running);
  // };

  // const reset = () => {
  //   setRunning(false);
  //   setTime(0);
  //   setDuration(null);
  // };

  // const formatTime = (seconds) => {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  // };

  return (
    <View style={styles.toggleButtonGroup}>
      <TouchableOpacity onPress={toggleSwitch} style={styles.toggleButton}>
        <Icon name="power" size={100} color={isOn ? '#0074d9' : 'grey'} />
      </TouchableOpacity>
      
      <Text style={[styles.timer, isOn ? styles.toggleOn : styles.toggleOff]}>
        {isOn && duration && (
        <Text style={[styles.timer, styles.toggleOn]}>Duration: {duration}</Text>
      )}
      </Text>
      {/* <Text style={[styles.timer, isOn ? styles.toggleOn : styles.toggleOff]}>{formatTime(time)}</Text> */}
      <View style={styles.status}>
        <Text>Status</Text>
        <View style={styles.connected}>
          <Text>{isOn ? 'Is Running' : 'Not Running'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 250,
    height: 250,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  toggleOn: {
    color: '#0074d9',
  },
  toggleOff: {
    color: 'grey',
  },
  toggleButtonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 40,
    fontWeight: '400',
    margin: 20,
  },
  status: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  connected: {
    borderRadius: 30,
    backgroundColor: '#0074d9',
    padding: 15,
    paddingHorizontal: 40,
  },
});

export default BigButton;
