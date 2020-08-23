import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { globalStyles } from '../../styles/globalStyles';
// import MapInput from "../MapInput.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/users";

/*  
This will be our initial screen where people can log in/ sign up.
If user wants to stay logged in, we can add logic here to directly skip onto the "user home" (Home component)
*/

export default function Home() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const loadAllUsers = () => {
    dispatch(getAllUsers());
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text> Hello from HOME!!!!!!!!!!!!!</Text>
      {/* <Text>{users}</Text> */}
    </View>
  );
}