import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { isValidEmail, isValidObjField, updateError } from '../components/Method';
import FormButton from '../components/formComponents/FormButton';
import Client from '../api/Client';
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CongratulationsPopup from '../components/formComponents/CongratulationsPopup';

const Register = ({ navigation }) => {
  const {login, setAuthData, authData, setUserToken, userToken, setIsGen, isGen} = useContext(AuthContext)

  const [showCongratulations, setShowCongratulations] = useState(false);

  // Function to navigate to the login screen
  const navigateToLogin = () => {
    setShowCongratulations(false); // Close the popup
    navigation.navigate('Login'); // Navigate to the login screen
  };

  const niceImage = require('./../assets/images/Lightbulb-bro.png');
  const [userInfo, setUserInfo] = useState({
    First_name: '',
    Last_name: '',
    Username: '',
    Email: '',
    Telephone: '',
    confirmPass: '',
    Password: '',
  });

  const [error, setError] = useState('');
  const { First_name,Last_name,Username, Email, Telephone, Password, confirmPass } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    // console.log('Input value:', value); // Add this line
    if (fieldName === 'Telephone') {
      // Remove non-numeric characters from the input
      value = value.replace(/[^0-9]/g, '');
    }
    // console.log('Processed value:', value); // Add this line
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo)) {
      updateError('Required all fields!', setError);
      return false;
    }

    if (!isValidEmail(Email)) {
      updateError('Invalid email!', setError);
      return false;
    }

    if (!Password.trim() || Password.length < 5) {
      updateError('Password is too short!', setError);
      return false;
    }
    if(Password !== confirmPass){
      updateError('Password is incorrect', setError);
      return false;
    }

    return true;
  };

  // const submitForm = async () => {
  //   if (isValidForm()) {
  //     console.log('Form Submitted');
  //     console.log(userInfo.password);
  //     console.log(userInfo.email);
  //   } else {
  //     console.log('Validation failed');
  //   }
  // };

  const submitForm = async () => {
    console.log("hello")
    if (isValidForm()) {
    console.log("hi")
    const numericTelephone = parseInt(Telephone, 10);

      try {
        const response = await Client.post('/register', { ...userInfo, Telephone: numericTelephone, });
        
        if (response.status === 201) {
          console.log('Form Submitted');
          console.log(userInfo.Password);
          console.log(userInfo.Email);
          console.log(response.data);
  
          // setAuthData(response.data);
          // setUserToken(response.data.accesstoken);
          // setIsGen(response.data.good.Active);
  
          // // Store the authentication data and token in AsyncStorage
          // AsyncStorage.setItem('authData', JSON.stringify(response.data));
          // AsyncStorage.setItem('userToken', response.data.accesstoken);
          setShowCongratulations(true);
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={{marginBottom:30}}>
          <Image source={niceImage} style={{ width: 300, height: 300 }} />
        </View>

        <View style={styles.fields}>
          <TextInput
            placeholder="First Name"
            value={First_name}
            style={styles.input}
            onChangeText={(value) => handleOnChangeText(value, 'First_name')}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Last Name"
            value={Last_name}
            style={styles.input}
            onChangeText={(value) => handleOnChangeText(value, 'Last_name')}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Username"
            value={Username}
            style={styles.input}
            onChangeText={(value) => handleOnChangeText(value, 'Username')}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Email"
            value={Email}
            style={styles.input}
            onChangeText={(value) => handleOnChangeText(value, 'Email')}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Telephone"
            value={Telephone}
            style={styles.input}
            onChangeText={(value) => handleOnChangeText(value, 'Telephone')}
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Password"
            value={Password}
            style={[styles.input]}
            onChangeText={(value) => handleOnChangeText(value, 'Password')}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPass}
            style={[styles.input, {marginBottom:30}]}
            onChangeText={(value) => handleOnChangeText(value, 'confirmPass')}
            secureTextEntry
            autoCapitalize="none"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <FormButton onPress={submitForm} title="Register" />
        <Text style={styles.signup} onPress={() => navigation.push('Login')}>
          Already have an account?{' '}
          <Text style={{ color: '#0074d9' }}>Login here!</Text>
        </Text>
        </View>
        <CongratulationsPopup
        visible={showCongratulations}
        onClose={navigateToLogin}
      />

      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // height:'100%',
    // backgroundColor:'black'
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    // textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#0074d9',
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 20,
    paddingVertical: 5,
    width: '100%',
    marginBottom: 20,
  },
  fields: {
    // flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signup: {
    margin: 10,
    fontSize: 13,
  },
});
