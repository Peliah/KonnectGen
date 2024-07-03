import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import Client from '../api/Client';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SelectOrRegister = () => {
  const { isGen, authData, setIsGen } = useContext(AuthContext);
  const navigation = useNavigation();
  const niceImage = require('./../assets/images/Create-cuate.png');

  const [userInfo, setUserInfo] = useState({
    serial: '',
    name: '',
    fuel: '',
    baseTemp: '',
    PowerOutPut: '',
  });

  const { serial, name, fuel, baseTemp, PowerOutPut } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // Implement your form validation logic here
    return true;
  };

  const handleRegisterDevice = async () => {
    if (isValidForm()) {
      const token = await AsyncStorage.getItem('userToken');

      // const token = await AsyncStorage.getItem('userToken');
      console.log(token);
      // Client.defaults.headers.common['token'] = `Bearer ${token}`;
      try {
        const response = await Client.post('/siadash', { ...userInfo },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        console.log('Form Submitted');
        console.log(userInfo.serial);
        console.log(userInfo.name);
        console.log(userInfo.fuel);
        console.log(userInfo.baseTemp);
        console.log(userInfo.PowerOutPut);
        console.log(response.data);
        setIsGen(true);
      } catch (error) {
        if (error.response) {
          console.log('Server responded with:', error.response.data);
          console.log('Status code:', error.response.status);
        } else if (error.request) {
          console.log('Request made but no response received:', error.request);
        } else {
          console.log('Error setting up the request:', error.message);
        }
      }
    }
    // console.log('done');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Register Your Generator</Text>
        <Image source={niceImage} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Device Serial Number"
          onChangeText={(value) => handleOnChangeText(value, 'serial')}
          value={serial}
        />
        <TextInput
          style={styles.input}
          placeholder="Device Name"
          onChangeText={(value) => handleOnChangeText(value, 'name')}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Generator Fuel tank"
          onChangeText={(value) => handleOnChangeText(value, 'fuel')}
          value={fuel}
        />
        <TextInput
          style={styles.input}
          placeholder="Generator base temperature"
          onChangeText={(value) => handleOnChangeText(value, 'baseTemp')}
          value={baseTemp}
        />
        <TextInput
          style={styles.input}
          placeholder="Generator power output"
          onChangeText={(value) => handleOnChangeText(value, 'PowerOutPut')}
          value={PowerOutPut}
        />
        <View style={styles.buttonContainer}>
          <Button title="Register Device" onPress={handleRegisterDevice} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0074d9',
    padding: 10,
    width: '80%',
    marginBottom: 15,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default SelectOrRegister;
