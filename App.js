import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./app/store";
import { CreateUser } from './app/components/index'
import { ListPrivate } from './app/components'

// create stack
const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListPrivate">
          <Stack.Screen name="ListPrivate" component={ListPrivate} />
          {/* <Stack.Screen name="Register" component={CreateUser} /> */}
          {/* <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapContainer} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
