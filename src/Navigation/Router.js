import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import {AuthContext} from './../context/AuthContext'

const Router = () => {
    const {isLoading, userToken} =useContext(AuthContext)
    if (isLoading){
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>
    }
  return (
  <>
    {userToken !== null ? <AppStack/> : <AuthStack/>}
  </>
  )
}

export default Router