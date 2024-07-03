import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import BottomSheetModal from '../components/DashboardComponents/BottomSheetModal'
import Header from '../components/HomeComponents/Header'
import BigButton from '../components/HomeComponents/BigButton'
import GenData from '../components/HomeComponents/GenData'
import Icon from 'react-native-vector-icons/Ionicons'
import Client from '../api/Client'

const Home = ({route}) => {
  const [serial, setSerial]= useState()
  const {generator} = route.params;

  useEffect(() => {
    const delay = 1000; // Adjust the delay time in milliseconds as needed
  
    const fetchData = async () => {
      try {
        // Fetch your data here
        const response = await Client.get(`/serial/${generator.genId.GenKonnectID}`);
        console.log("stataes", response.data[0].SerialNo);
        const serialNumber = response.data[0].SerialNo
        setSerial(serialNumber);
        console.log("final serial ", serialNumber);
      } catch (err) {
        // Handle errors
      }
    };
  
    const delayFetchData = () => {
      setTimeout(() => {
        fetchData();
      }, delay);
    };
  
    delayFetchData();
  }, []);
  
  
  return (
    <View style={styles.contain} >
      <Header iconName='arrow-back-outline' iconName2={'ellipsis-vertical-outline'} generator_route={generator} />
      <View style={styles.modals}>
        <Text>{generator.name}</Text>
        <Text>{generator._id}</Text>
      </View>
      <View style={styles.container}>
        <BigButton generator={generator}/>
      </View>
      <GenData genData={generator} SerialNo={serial}/>
        
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:15,
    // paddingTop:10
  },
  contain:{
    flex:1,
    // backgroundColor: '#f9ea08',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modals:{
    // flex:1,
    // flexDirection:'row',
    alignItems:'center',
    // justifyContent: 'space-between',
    marginVertical:10,
    // color:'blue',

  }
});
