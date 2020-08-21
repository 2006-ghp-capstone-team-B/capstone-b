import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { Text, View, ActivityIndicator } from "react-native";
import styles from '../styles/globalStyles';
// import MapInput from "../MapInput.js";
import {useDispatch, useSelector} from 'react-redux'
import {getAllUsers} from '../store/users'

export default function Home(){

    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const loadAllUsers = () => {
        dispatch(getAllUsers())
    }

    useEffect(() => {
        loadAllUsers()
      }, [])


    return (
            <View>
                <Text>{users}</Text>
            </View>

    )

}

