import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const FormInput = ({placeholder, value, error}) => {
  return (
    <View>
      <TextInput placeholder={placeholder} value={value} style={styles.input} secureTextEntry autoCapitalize='none'/>
          <View style={styles.loginLabel}>
            {/* <Text style={{ fontWeight: 'bold' }}>Password</Text> */}
            {error ? (<Text style={{ color: 'red', fontSize: 10 }}>{error}</Text>) : null}
          </View>
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
    loginLabel:{
    flexDirection:'row',
    justifyContent:'flex-end',
    // marginBottom:5,
    marginBottom: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: '#0074d9',
    // height: 35,
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 20,
    paddingVertical:5,
    // width:'80%'
  },
})