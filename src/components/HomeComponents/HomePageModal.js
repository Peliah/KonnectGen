import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

const HomePageModal = ({iconName, title}) => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.btnModal}>
            <View style={styles.modalHeader}>
                <View>
                    <Text style={styles.modalHeaderText}>{title}</Text>
                </View>
                <View><Icon name={iconName} size={35}/></View>
            </View>
            <View>

            </View>
            <View style={styles.modalBottom}>
                <View></View>
                <View></View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default HomePageModal

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        // borderRadius:20,
        backgroundColor: '#fff',
        elevation:10,
        width:200,
        height:250,
        padding:20,
        margin:5,
        marginTop:20,
        borderRadius:10,

    },
    viewImg:{
        backgroundColor: '#fff',
        width:110,
        height:110,
        borderRadius:10

    },
    btnModal:{
        backgroundColor:'red',
        width:'100%',
        height:'100%'
        // elevation:5,
        // borderRadius:10,
    },
    modalHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    modalHeaderText:{
        fontSize:25,
        fontWeight:'500',
        
    }
})