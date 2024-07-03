import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Screens/Home';
import { AuthContextProvider } from './src/context/AuthContext';
import * as Font from 'expo-font'
import Router from './src/Navigation/Router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  useEffect(() =>{
    async function loadFont(){
      await Font.loadAsync({
        'mrt-bold': require('./src/assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
        'mrt-regular': require("./src/assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
        'mrt-medium': require("./src/assets/fonts/Montserrat/static/Montserrat-Medium.ttf")
      })
      // Text.defaultProps.style.fontFamily
      setFontLoaded(true)
      console.log('font Loaded')
    }
    loadFont()

  }, [])
  
  return (
    <AuthContextProvider>
        <Router/>
    </AuthContextProvider>
  );
}

