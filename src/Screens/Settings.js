import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import FormButton from '../components/formComponents/FormButton'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {
  const { logout, authData} = useContext(AuthContext);
  // const [authData, setAuthData] = useState({})
  // const firstname = authData.good.Firstname
  // console.log({authData})

  
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const useData = await AsyncStorage.getItem('authData');
         console.log("Stored Auth data "+useData);
         if(useData){
          const parseData = JSON.parse(useData)
         console.log("Parsed Auth data ",parseData.good.Email);
        //  authData = parseData.good.First_name
        //  setAuthData(parseData.good.Username)
         console.log(firstname)
        }
      }catch(error){
        console.error('Error Fetching data ', error);
      }
    }
    fetchData()
  },[])

  return (
    <View style={styles.container}>

      <View style={styles.analyticsHeader1}>
        <Icon size={25} name='log-out-outline' color={'#fff'} onPress={()=>{logout()}}/>
        
      </View>
      <View style={styles.analyticsHeader}>
        <View style={[styles.userImg, {color:'#FFF'}]}>
            <Icon name='person' size={50}  color={'#FFF'}/>
          </View>

          <View>
            {/* <Text style={[styles.settingsText, , {color:'#FFF'}]}>{authData.Username}</Text> */}
            {/* <Text>{authData.firstName}</Text> */}
            <Text style={{color:'#FFF'}}>{'telephone'}</Text>
            {/* <Text>{authData.telephone}</Text> */}
        </View>
      </View>

      <ScrollView style={styles.container2}>
        {/* <View style={styles.accountView}>

          <TouchableOpacity  style={styles.settingsTouch1}>
            <Text style={styles.settingsText}>John Doe</Text>
            <Text style={styles.settingsText2}>Tap here to change name</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.settingsTouch1}>
            <Text style={styles.settingsText}>example@email.com</Text>
            <Text style={styles.settingsText2}>Tap to change email</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.settingsTouch1}>
            <Text style={styles.settingsText}>+237 650810984</Text>
            <Text style={styles.settingsText2}>Tap here to change number</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.settingsView}>
          <TouchableOpacity style={styles.settingsTouch}>
            <Icon name='notifications-outline' size={20} />
            <Text style={styles.settingsText}>Notification and Sounds</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.settingsTouch} onPress={()=>{navigation.navigate("Schedules")}}>
            <Icon name='calendar-outline' size={20} />
            <Text style={styles.settingsText}>Schedules</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.settingsTouch} >
            <Icon name='language-outline' size={20} />
            <Text style={styles.settingsText}>Language</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsTouch} >
            <Icon name='print-outline' size={20} />
            <Text style={styles.settingsText}>Generate Report</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
        {/* <TouchableOpacity style={styles.logoutbtn} onPress={()=>{logout()}} title={'Logout'}>
            <Text style={{color:'#FFF'}}>
                Logout
            </Text>
        </TouchableOpacity> */}
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  analyticsHeader: {
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: "#0074d9",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:30,
    // elevation: 5,
  },
  analyticsHeader1: {
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: "#0074d9",
    paddingHorizontal: 15,
    flexDirection: "row",
    // alignItems: "flex-start",
    justifyContent:'flex-end',
    paddingHorizontal:30,
    elevation: 5,
  },
  userImg: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor:'#FFF',
    padding: 10,
    marginRight: 20,
  },
  container2: {
    flex: 1,
    marginTop:20
    // backgroundColor: '#fff',
  },
  accountView: {
    // padding: 20,
  },
  settingsView: {
    // padding: 20,
    // backgroundColor: '#f5f5f5',
    // marginTop: 10,
    paddingHorizontal:10
  },
  settingsTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor:'gray',
    borderBottomWidth:.5
  },
  settingsTouch1: {
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  settingsText: {
    fontSize: 16,
    fontWeight:'400',
    paddingLeft:10,
    color:'black'
  },
  settingsText2: {
    fontSize: 14,
    color: 'gray',
  },
  logoutbtn:{
    backgroundColor:'#0074d9',
    alignItems:'center',
    justifyContent:'center',
    padding:15,
    width:'80%',
    alignSelf:'center',
    borderRadius:10,
    marginBottom:10
  }
});
