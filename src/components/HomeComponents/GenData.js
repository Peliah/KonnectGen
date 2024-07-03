import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GenData = ({genData}) => {
    console.log("button: ", genData)
  return (
    <View style={styles.container}>
        <View>
            {/* <Text>Fuel Status:  <Text>{genData.genId.fuel}</Text>%</Text>
            <Text>Oil Status:  <Text>{genData.genId.fuel}</Text>%</Text> */}
            <Text>Fuel Status:  <Text>{}</Text>%</Text>
            <Text>Oil Status:  <Text>{}</Text>%</Text>
        </View>
        <View>
            {/* <Text>Energy Consumption:  <Text>20</Text>KV</Text>
            <Text>Power Output:  <Text>{genData.genId.PowerOutPut}</Text></Text> */}
            <Text>Energy Consumption:  <Text>20</Text>KV</Text>
            <Text>Power Output:  <Text>{}</Text></Text>
        </View>
    </View>
  )
}

export default GenData

const styles = StyleSheet.create({
    container:{
        flex:.15,
        backgroundColor:'#fff',
        width:'90%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-evenly',
        borderRadius:10,
        marginBottom:10,
        elevation:3,
        alignItems:'center'
    }
})