import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Analytics from '../Screens/Analytics'
import TabNavigation from './TabNavigation'
import SelectOrRegister from '../Screens/SelectOrRegister'
import Dashboard from '../Screens/Dashboard'
import Settings from '../Screens/Settings'
import Schedules from '../Screens/Schedules'
import Share from '../Screens/Share'
import Header from '../components/HomeComponents/Header'
import BottomSheetModal from '../components/DashboardComponents/BottomSheetModal'


const AppStack = () => {
    const Stack = createNativeStackNavigator()

    // const {isGen} = useContext(AuthContext)

    return (
          <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown:false, }} >
                <Stack.Screen name='Tab' component={TabNavigation}/>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Share" component={Share}/>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Analytics" component={Analytics} />
                <Stack.Screen name="RegisterDevice" component={SelectOrRegister}/>
                <Stack.Screen name="Settings" component={Settings}/>
                <Stack.Screen name="Schedules" component={Schedules}/>
                <Stack.Screen name="Header" component={Header}/>
                <Stack.Screen name="BottomSheetModal" component={BottomSheetModal}/>
              </Stack.Navigator>
          </NavigationContainer>

    )
}

export default AppStack