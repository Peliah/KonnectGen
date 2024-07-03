import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const FormButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
            onPress={onPress}
            style={styles.btn}
          >
            <Text style={{ fontSize: 18, color: '#fff' }}>{title}</Text>
          </TouchableOpacity>
  )
}

export default FormButton

const styles = StyleSheet.create({
    btn: {
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#0074d9',
        width:'100%'
        // fontFamily:'mrt-bold'
      },
})