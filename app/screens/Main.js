import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from 'react-native-vector-icons';
import CreateUser from './CreateUser'
import {Dashboard, ListHousehold, ListPrivate} from "../components"
import {StyleSheet} from "react-native"

const BottomTab = createBottomTabNavigator();

export default function Main() {
  return (
      <NavigationContainer>
        <BottomTab.Navigator initialRouteName="Dashboard" tabBarOptions={{ activeTintColor: '#e91e63', }}>
        <BottomTab.Screen name="Dashboard" component={Dashboard} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />
        <BottomTab.Screen name="Private" component={ListPrivate} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard" color={color} size={size} />
          ),
        }} />
        <BottomTab.Screen name="Signup" component={CreateUser} options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }} />
        <BottomTab.Screen name="Household" component={ListHousehold} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group"  color={color} size={size} />
          ),
        }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: '15%',
    marginTop: '10%'
  },
  header: {
    color: "white",
    fontSize:  60,
    textAlign: "center",
    marginTop: 50
  },
  button: {
    backgroundColor: 'white',
    color: '#3A59FF',
    width: "65%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '18%',
    padding: "2%",
    fontSize:  33,
    marginTop: '10%'
  },
  style: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 15
  },
});
