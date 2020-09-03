import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import haversine from 'haversine'
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { Platform, Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, FontAwesome, Fontisto } from 'react-native-vector-icons';
import { Dashboard, UserProfile, Notifications, HouseholdProfile } from "../components"
import MapContainer from "./MapContainer";
import MessageCenter from './MessageCenter'
import {newLocationMessage} from '../store/notifications'
import { fetchStorePrefs } from "../store/storePrefs";

const BottomTab = createBottomTabNavigator();

class Main extends React.Component {
  constructor () {
    super()
    this.getLocation = this.getLocation.bind(this)
  }
  state = {
    permissionStatus: '',
    location: {}
  }

  async componentDidMount() {
    await this.props.loadStorePrefs(this.props.singleUser.id)
    this.getLocation()
  }

  getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    this.setState({permissionStatus: status})

    if (this.state.permissionStatus !== 'granted') {
      this.props.sendLocationMessage(this.props.singleUser.id)
    }
    else {
      let currentLocation = await Location.getCurrentPositionAsync({});
      this.setState({location: currentLocation.coords});
    }
  }

  render () {
    console.log('statey', this.state)

  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName="Dashboard" tabBarOptions={{ activeTintColor: '#e91e63', }}>
        <BottomTab.Screen name="Dashboard" component={Dashboard} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />
        <BottomTab.Screen name="Notifications" component={MessageCenter} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard" color={color} size={size} />
          ),
        }} />
        <BottomTab.Screen name="My Stores" component={MapContainer} options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="shopping-store" color={color} size={size} />
          ),
        }} />
        <BottomTab.Screen name="Me" component={UserProfile} options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
  }
}

const MapState = (state) => ({
  singleUser: state.singleUser,
  storePrefs: state.storePrefs
})

const mapDispatch = (dispatch) => ({
  loadStorePrefs: (userId) => { dispatch(fetchStorePrefs(userId)) },
  sendLocationMessage: (userId) => dispatch(newLocationMessage(userId))
});

export default connect(MapState, mapDispatch)(Main);
