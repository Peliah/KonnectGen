import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'


const GenList = ({generator}) => {
  return (
    <TouchableOpacity>
         {/* <Text>GenList</Text> */}
         <Icon name='flash' color={'#0074d9'}/>
         <View style={styles.contactDat}>
             <Text style={styles.name}>{generator.name}</Text>
             {/* <Text style={styles.phoneNumber}>
             {item.phone}
             </Text> */}
         </View>
         <View>
             <Icon name='ellipsis-vertical-outline' size={25}/>
         </View>
    </TouchableOpacity>
  )
}

export default GenList

const styles = StyleSheet.create({
    contactCon: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d9d9d9",
        backgroundColor:'#fff'
      },
      imgCon: {},
      placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "#d9d9d9",
        alignItems: "center",
        justifyContent: "center",
      },
      contactDat: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 5,
      },
      txt: {
        fontSize: 18,
      },
      name: {
        fontSize: 16,
      },
      phoneNumber: {
        color: "#888",
      },
    });
