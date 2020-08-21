  
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import MapInput from "./components/MapInput.js";
import MapContainer from "./components/MapContainer";

import Home from './screens/Home'
import {Provider} from 'react-redux'
import store from './store'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>We're trying to display map</Text>
      <StatusBar style="auto" />
      <MapContainer />
      <Provider store={store}>
        <Home/>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});

// This will be our initial screen where people can log in/ sign up. 
// If user wants to stay logged in, we can add logic here to directly skip onto the "user home" (Home component)