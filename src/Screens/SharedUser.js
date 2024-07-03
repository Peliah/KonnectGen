import { StyleSheet, Text, View, Image, Modal } from 'react-native'
import React from 'react'

const SharedUsers = () => {
    const construction = require('./../assets/images/Underconstruction-bro.png')
  return (
    <View style={styles.container}>
       <Image source={construction}  style={{width:300, height:300}}/>
    </View>

  )
}

export default SharedUsers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        // paddingTop:10
      },
})