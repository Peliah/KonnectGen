import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
// import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Analytics from '../Screens/Analytics';
import Dashboard from '../Screens/Dashboard';
import Settings from '../Screens/Settings';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } 

          return <Icon name={iconName} size={size} color={color} />;
        },
        "tabBarActiveTintColor": "#0074d9",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [
            {
            "display": "flex",
            // "margin":10,
            height:60,
            paddingBottom:5,
            // padding:-12,
            borderRadius:10
            },
            null
        ]
      })}
      >
      {/* <Text>TabNavigation</Text> */}
      <Tab.Screen name='Dashboard' component={Dashboard}/>
      {/* <Tab.Screen name='Analytics' component={Analytics}/> */}
      <Tab.Screen name='Settings' component={Settings}/>
    </Tab.Navigator>
  )
}

export default TabNavigation

// const styles = StyleSheet.create({})