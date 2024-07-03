import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Login'
import React from 'react'
import Register from '../Screens/Register'

const AuthStack = () => {

    const Stack = createNativeStackNavigator()

  return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ { headerShown: false} }>
              <Stack.Screen name="Login"  component={Login} />
              <Stack.Screen name="Register"  component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
  )
}

export default AuthStack