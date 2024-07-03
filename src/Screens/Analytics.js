import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import HomePageModal from './../components/HomeComponents/HomePageModal'
// import Graphs from '../components/AnalyticsComponent/Graphs'
import GraphScreen from '../components/AnalyticsComponent/GraphScreen'
import Client from '../api/Client'
import Icon from 'react-native-vector-icons/Ionicons';


// const Analytics = ({route}) => {
const Analytics = () => {
// const {generator}=route.params
// const generatorId=generator.genId._id
  // const monitoring = async ()=>{
  //   try {
  //     const response = Client.get(`/Monitor/${generatorId}`)
  //     console.log(response.data)
  //   } catch (error) {
  //     if (error.response) {
  //       console.log('Server responded with:', error.response.data);
  //       console.log('Status code:', error.response.status);
  //     } else if (error.request) {
  //       console.log('Request made but no response received:', error.request);
  //     } else {
  //       console.log('Error setting up the request:', error.message);
  //     }
  //   }
  // }


    useEffect(()=>{
    //  monitoring()
    //  const intervalId = setInterval(()=>{
    //   // console.log(generator)
    //   monitoring();
    //  }, 1000)

    //  return ()=>{clearInterval(intervalId)}
    setHistoryData(dummyHistoryData);
    },[])

    const dummyHistoryData = [
      {
        _id: '1',
        date: '2023-08-01',
        duration: '4 hours',
        fuelUsed: 3, // in litres
      },
      {
        _id: '2',
        date: '2023-08-05',
        duration: '5 hours',
        fuelUsed: 4.5, // in litres
      },
      {
        _id: '3',
        date: '2023-08-10',
        duration: '6 hours',
        fuelUsed: 4, // in litres
      },
    ];
    const [historyData, setHistoryData] = useState([]);

    return (
      <View style={styles.container}>
        <View style={styles.analyticsHeader}>
          <Text>Analytics</Text>
          <TouchableOpacity onPress={()=>{consol.log("hi")}}>
            <Icon name={'print-outline'} size={25}/>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBody}>
          <View style={styles.topHalf}>
            <View style={styles.thView}>
              <Text style={styles.thText}>Real time analytics</Text>
            </View>
            {/* <GraphScreen/> */}

          </View>
          <View style={styles.bottomHalf}>
            <View style={styles.thView}>
              <Text style={styles.thText}>History</Text>
              <Icon name='analytics-outline' size={25}/>
            </View>
            <FlatList
              data={historyData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                // <View>
                //   <Text>Date: {item.date}</Text>
                //   <Text>Duration: {item.duration}</Text>
                //   <Text>Fuel Used: {item.fuelUsed} litres</Text>
                // </View>
                <>
                <TouchableOpacity style={styles.contactCon}>
                {/* <TouchableOpacity style={styles.contactCon} onPress={() => navigation.navigate('Home', { generator: item.genId })}> */}
                  {/* <Text>GenList</Text> */}
                  <View style={styles.contactConLeft}>
                    <Icon name='flash' color={'#F9AE08'} size={30} />
                    <View style={styles.contactDat}>
                      <Text style={styles.name}>Date: {item.date}</Text>
                      <Text style={styles.name}>Duration: {item.duration}</Text>
                      <Text style={styles.name}>Fuel Used: {item.fuelUsed}l</Text>
                      {/* <Text style={styles.name}>{item.name}</Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              </>
              )}
            />

          </View>
          {/* <View>
            <Graphs/>
          </View> */}
        </View>
      </View>
    )
  }

export default Analytics

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
      },
      containerBody:{
        padding:16,
        flexDirection:'column'
      },
      modals:{
        // alignItemsalignItems:'center'
        // flex:1,
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent: 'space-evenly',
        // marginVertical:10,
        // color:'blue',
    // backgroundColor:'blue',
    // justifyContent:'center'
    paddingBottom:20
      },
      analyticsHeader:{
        paddingTop:60,
        paddingBottom:20,
        backgroundColor:"#fff",
        paddingHorizontal: 15,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        elevation: 5,
      },
      topHalf:{
        height:'40%',
        backgroundColor:"#F9AE08"

      },
      bottomHalf:{
        height:'60%',
        // backgroundColor:"#fff"
      },
      thView:{
        paddingVertical:10,
        elevetion:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      thText:{
        fontSize:16,
        paddingVertical:10,
        fontWeight:'400'
      },
      contactCon: {
        flexDirection: 'row',
        alignItems:'center',
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
        alignItems:'center',
      },
      contactDat: {
        paddingLeft:30,
        // alignItems:'center',
        justifyContent:'center',
        
      },
})