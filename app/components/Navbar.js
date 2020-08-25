import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from 'react-native-vector-icons';
import ListPrivate from './ListPrivate'
import CreateUser from '../screens/CreateUser'
import ListHousehold from './ListHousehold'
import Dashboard from "./Dashboard"

const BottomTab = createBottomTabNavigator();

export default function Navbar() {
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
