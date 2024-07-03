import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native';
import Header from '../components/HomeComponents/Header';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import GenList from '../components/DashboardComponents/GenList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Client from '../api/Client';
// import BottomSheetModal from '../components/DashboardComponents/BottomSheetModal';
import { useFocusEffect } from '@react-navigation/native';


const Dashboard = ({ navigation }) => {
  const dimension = useWindowDimensions()
  const desert = require('./../assets/images/saguarocactus-amico.png')
 
  const [gens, setGens] = useState([]);
  const [sharedGens, setSharedGens] = useState([])
  
  // const { isGen } = useContext(AuthContext);
  const fetchCurrentState = async () => {
    try {
      const response = await Client.get('/getchange/pelray');
      setIsOn(response.data);
    } catch (error) {
      // Handle errors
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');

          if (token) {
            const response = await Client.get('/listgen', {
              headers: {
                token: `Bearer ${token}`,
              },
            });

            if (response.data && response.data.owned && response.data.owned.length > 0) {
              const genData = response.data.owned[0].GenKonId;
              setGens(genData);
            } else {
              console.log("No data found in response or unexpected response structure.");
            }

            if (response.data && response.data.shared && response.data.shared.length > 0) {
              const genDataShared = response.data.shared[0].GenKonId;
              setSharedGens(genDataShared);
            } else {
              console.log("No data found in response or unexpected response structure.");
            }
          }
        } catch (error) {
          console.error('Error Fetching data ', error);
        }
      };

      // Call your fetchData function when the screen gains focus
      fetchData();
    }, [])
  )
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('userToken');
  //        console.log("token: "+token);
        
  //       if (token) {
  //   fetchCurrentState()


  //         const response = await Client.get('/listgen', {
  //           headers: {
  //             token: `Bearer ${token}`,
  //           },
  //         });
  //         console.log("Response Data:", response.data);
  //         // if (response.data) {
  //         if (response.data && response.data.owned && response.data.owned.length > 0) {
  //           console.log("Respos.data ",response.data.owned[0].GenKonId)
  //           const genData = response.data.owned[0].GenKonId;
  //           setGens(genData);
  //           console.log("My Gens " + genData);
  //         } else {
  //           console.log("No data found in response or unexpected response structure.");
  //         }

  //         if (response.data && response.data.shared && response.data.shared.length > 0) {
  //           const genDataShared = response.data.shared[0].GenKonId;
  //           setSharedGens(genDataShared);
  //           console.log("Shared Gens " + genDataShared);
  //         } else {
  //           console.log("No data found in response or unexpected response structure.");
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error Fetching data ', error);
  //     }
  //   };

  //   fetchData();
  //   console.log(gens)
  //   console.log(sharedGens)
  // }, []);

  const generatorData = [
    {
      "id":  "650c614cc150e0e6f8862e40",
      name: 'IAI Gen',
      "fuel": 123456,
      "baseTemp": 123456,
      "PowerOutPut": "123456",
      "GenKonnectID": {
        "$oid": "650c4f24c150e0e6f8862e34"
      },
      "status": 0,
      "__v": 0
    },{
    "id": "650c4f48c150e0e6f8862e38",
    "fuel": 74523,
    name: 'Neighbour Gen',
    "baseTemp": 96521,
    "PowerOutPut": "123546",
    "GenKonnectID": {
      "$oid": "650c4f24c150e0e6f8862e34"
    },
    "status": 1,
    "__v": 0
  },{
    "id": "650c6182c677b5389c4ef2e6",
    "fuel": 123456,
    name: 'My Gen',
    "baseTemp": 123456,
    "PowerOutPut": "123456",
    "GenKonnectID": {
      "$oid": "650c4f24c150e0e6f8862e34"
    },
    "status": 0,
    "__v": 0
  }];

  const renderItem = ({ item }) => {
    // console.log('Item:', item);
    return (
    <>
      <TouchableOpacity style={styles.contactCon} onPress={() => navigation.navigate('Home', { generator: item })}>
      {/* <TouchableOpacity style={styles.contactCon} onPress={() => navigation.navigate('Home', { generator: item.genId })}> */}
        {/* <Text>GenList</Text> */}
        <View style={styles.contactConLeft}>
          <Icon name='flash' color={'#F9AE08'} size={30} />
          <View style={styles.contactDat}>
            <Text style={styles.name}>{item.genId._id}</Text>
            {/* <Text style={styles.name}>{item.name}</Text> */}
          </View>
        </View>
        <View style={item.genId.state ===1 ? styles.statusColorON: styles.statusColorOff}>
        </View>
      </TouchableOpacity>
      {/* <Text>{item.name}</Text> */}

    </>
    );
  };

  const showModal=()=>{
    console.log("Hey yoo")
  }

  return (
    <>
    <Header />
    <View style={styles.container}>
      <View>

        <View style={{marginVertical:10, marginHorizontal:20, marginBottom: 15}}>
          <Text>
            Owned Generators
          </Text>
        </View>

        {gens.length === 0 ? 
          (
            <View style={{
              // flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom:20,
              backgroundColor:"#fff"
              // padding:15,
              // paddingTop:10
            }}>
              <Image source={desert}  style={{width:300, height:300}}/>
            </View>)
            :
          (
            <FlatList
              data={gens}
              renderItem={renderItem}
              // keyExtractor={(item) => item.id}
              keyExtractor={(item) => item._id}
              style={styles.list}
            />
          )}
        <View style={{marginVertical:10, marginHorizontal:20, marginBottom: 15}}>
          <Text>
            Shared Generators
          </Text>
        </View>
        {sharedGens.length === 0 ? 
          (
            <View style={{
              // flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom:20,
              backgroundColor:"#fff"
              // padding:15,
              // paddingTop:10
            }}>
              <Image source={desert}  style={{width:300, height:300}}/>
            </View>)
            :
          (
            <FlatList
              data={setSharedGens}
              renderItem={renderItem}
              // keyExtractor={(item) => item.id}
              keyExtractor={(item) => item._id}
              style={styles.list}
            />
          )}
      </View>
    </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterDevice')}
      >
        <Icon name="add-outline" size={32} color={'#FFF'}/>
      </TouchableOpacity>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
      contactCon: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 15,
        marginBottom:5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d9d9d9",
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:2
      },
      contactConLeft: {
        flexDirection: 'row',
      },
      contactDat: {
        paddingLeft:30,
        // alignItems:'center',
        justifyContent:'center',
        
      },
      statusColorON:{
        backgroundColor:'#1DEB2A',
        padding:10,
        borderRadius:20
      },
      statusColorOff:{
        backgroundColor:'red',
        padding:10,
        borderRadius:50

      },
      modalOptions:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:9,
        elevation:2,
        alignItems:'center',

      }
})