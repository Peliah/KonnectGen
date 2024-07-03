import { View, Text } from 'react-native'
import React, {useState, useContext, createContext, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isGen, setIsGen] = useState(false)
    const [authData, setAuthData] = useState()

    

    //login setup
    const login = ()=>{
        setIsLoading(true)
        setUserToken('Hayaaaaaaaaah')
        AsyncStorage.setItem('userToken', 'Hayaaaaaaaaah')
        setIsLoading(false)
        
        // setAuthData()
    }

    //logout setup
    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async() =>{
        try{
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken)
            setIsLoading(false)
        }catch(e){
            console.log(`is logged in error ${e}`)
        }
    }

    useEffect(()=>{
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, setUserToken, authData, setAuthData, isGen, setIsGen}}>
        	{ children }
        </AuthContext.Provider>
    );
}