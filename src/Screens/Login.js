import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, Platform, ScrollView, TextInput, TouchableOpacity,Image } from 'react-native'
import React, {useContext, useState} from 'react'
import { isValidEmail, isValidObjField, updateError } from '../components/Method'
import FormButton from '../components/formComponents/FormButton'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Client from '../api/Client'

const Login = ({navigation}) => {

  const {login, setAuthData, authData, setUserToken, userToken, setIsGen, isGen} = useContext(AuthContext)
  //importing the image
  const niceImage = require('./../assets/images/Lightbulb-bro.png')
  const [userInfo, setUserInfo] = useState({
    Email:'',
    Password:'',
  })

  const [error, setError] = useState('')
  const { Email, Password } = userInfo;
  //on text change
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  //form validation
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);

    if (!isValidEmail(Email)) return updateError('Invalid Email!', setError);

    if (!Password.trim() || Password.length < 5)
      return updateError('Password is too short!', setError);

    return true;
  };

  const submitFormDemo = async () => {

    if (isValidForm()) {
      
            console.log('Form Submitted')
            login()
            setAuthData(userInfo)

            console.log(authData)
            
    }
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const response = await Client.post('/Login', { ...userInfo });
        
        if (response.status === 200) {
          console.log('Form Submitted');
          console.log(userInfo.Password);
          console.log(userInfo.Email);
          console.log(response.data);
  
          setAuthData(response.data);
          setUserToken(response.data.accesstoken);
          setIsGen(response.data.good.Active);
  
          // Store the authentication data and token in AsyncStorage
          AsyncStorage.setItem('authData', JSON.stringify(response.data));
          AsyncStorage.setItem('userToken', response.data.accesstoken);
        } else {
          console.log('Login failed:', response.data); // Handle login failure
        }
      } catch (error) {
        if (error.response) {
          console.log('Server responded with:', error.response.data);
          console.log('Status code:', error.response.status);
        } else if (error.request) {
          console.log('Request made but no response received:', error.request);
        } else {
          console.log('Error setting up the request:', error.message);
        }
      }
    }
  };
  

  return (
    <KeyboardAvoidingView enabled={true}  style={styles.container}>

        
        <View style={{marginBottom:20}}>
          <Image source={niceImage}  style={{width:300, height:300}}/>
          {/* <NicerImage/> */}
        </View>

        {/* Inputs */}
        <View style={styles.fields}>
          
          <TextInput placeholder='Email' value={Email} style={styles.input} onChangeText={value => handleOnChangeText(value, 'Email')} autoCapitalize='none'/>
          <View style={styles.loginLabel}>
            {/* <Text style={{ fontWeight: 'bold' }}>Email</Text> */}
            {error ? (<Text style={{ color: 'red', fontSize: 10 }}>{error}</Text>) : null}
          </View>
          
          <TextInput placeholder='Password' value={Password} style={styles.input} onChangeText={value => handleOnChangeText(value, 'Password')} secureTextEntry autoCapitalize='none'/>
          <View style={styles.loginLabel}>
            {/* <Text style={{ fontWeight: 'bold' }}>Password</Text> */}
            {error ? (<Text style={{ color: 'red', fontSize: 10 }}>{error}</Text>) : null}
          </View>
          <View style={{marginVertical:15}}>
            <FormButton onPress={submitForm} title={'Login'}/>
          </View>
          
          {/* Submit button */}
        <Text style={[styles.signup,]} onPress={()=>{navigation.push('Register')}}>
          Don't have an account? <Text style={{color:'#0074d9'}}>Register here!</Text>
        </Text>
        </View>

      {/* </ScrollView> */}
     
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    // width:'80%'
  },
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
  // btn: {
  //   height: 45,
  //   borderRadius: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor:'#0074d9',
  //   fontFamily:'mrt-bold'
  // },
  fields:{
    // alignItems:'center',
    width:'80%',

  },
  signup:{
    margin:10,
    fontSize:13
  }
})