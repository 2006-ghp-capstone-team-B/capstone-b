import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import MapInput from "./components/MapInput.js";
import MapContainer from "./components/MapContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// create stack
const Stack = createStackNavigator();

import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";

function HomeScreen() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapContainer} />
      </Stack.Navigator>
    </NavigationContainer>
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
