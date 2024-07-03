import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, StyleSheet, Text, BackHandler } from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Client from '../../api/Client';

const GeneratorMaintenanceForm = (props) => {
    const [maintenanceName, setMaintenanceName] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    console.log(props.gen)
    // const [showDatePicker, setShowDatePicker] = useState(false);
    const postMaintenance = async() => {
        try{
          const token = await AsyncStorage.getItem('userToken');
          console.log("token: "+token);
          const response = await Client.post(
            '/maintenance',
            { genId:  props.gen.generator.genId._id, Motif: maintenanceName, date:maintenanceDate},
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          {props.onClose}
        } catch (error) {
          // Handle errors
          console.error(error + ' Why 400');
        }
      }

    const handleAddMaintenance = () => {
        // You can use maintenanceName and maintenanceDate here to handle the data.
        // For example, send this data to an API or perform any other action.
        // Then, close the modal.
        props.onClose();
      };
    
  useEffect(() => {
    const backAction = () => {
      props.onClose(); // Close the modal when the back button is pressed
      return true; // Prevent default back action
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => backHandler.remove(); // Cleanup the event listener
  
  }, []);

  return (
    <Modal visible={props.visible} animationType="slide" transparent onBackdropPress={props.onClose}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
        <Text style={styles.label}>Maintenance Name:</Text>
          <TextInput
            placeholder="Enter Motif"
            onChangeText={(text) => setMaintenanceName(text)}
            value={maintenanceName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Date"
            onChangeText={(text) => setMaintenanceDate(text)}
            value={maintenanceDate}
            style={styles.input}
          />
          
          <TouchableOpacity onPress={postMaintenance} style={styles.btn}>
            <Text style={{color:'#fff'}}>Add Maintenace</Text>
          </TouchableOpacity>
          {/* <FormButton onPress={console.log("hi")} title="Add Maintenance" /> */}
          <TouchableOpacity title="Cancel" onPress={props.onClose} style={styles.btnclose}>
            <Text style={{color:'#fff'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Vertically center the modal
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  btn: {
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor:'#0074d9',
    width:'80%',
    // fontFamily:'mrt-bold'
  },
  btnclose: {
    height: 45,
    borderRadius: 15,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
    width:'80%',
    marginTop:10
    // fontFamily:'mrt-bold'
  },
});

export default GeneratorMaintenanceForm;
