import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import haversine from "haversine";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, FontAwesome, Fontisto } from "react-native-vector-icons";
import { Dashboard, UserProfile } from "../components";
import MapContainer from "./MapContainer";
import MessageCenter from "./MessageCenter";
import { newLocationMessage } from "../store/notifications";
import { fetchStorePrefs } from "../store/storePrefs";
import Geofence from "react-native-expo-geofence";
import {Text} from 'react-native'
import {connect} from 'react-redux'
import { createNotification} from '../../App2'
import { saveLocation, retrieveLocation, saveLocPermission, retrieveLocPermission, retrievePushTime, savePushTiming } from '../store/storageHelper'

const BottomTab = createBottomTabNavigator();

class Main extends React.Component {
  constructor () {
    super()
    this.getLocation = this.getLocation.bind(this)
    this.checkGeofence = this.checkGeofence.bind(this)
  }
  state = {
    permissionStatus: '',
    location: {},
    geofence: [],
    pushCallTime: null,
    pushOk: false
  }

  async componentDidMount() {
    await this.props.loadStorePrefs(this.props.singleUser.id)
    await this.getLocation()
    this.intervalId = setInterval(
      () => this.tick(),
      60000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    saveLocPermission(status)

    const permission = JSON.parse(await retrieveLocPermission())

    if (permission !== 'granted') {
      this.props.sendLocationMessage(this.props.singleUser.id)
    }
    else {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const oldLocation = await retrieveLocation()
      if(!oldLocation) {
        await saveLocation(currentLocation.coords);
      }
    }
  }

  tick() {
    this.checkLocation()
  }

  checkLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    const oldLocation = JSON.parse(await retrieveLocation())

    if(currentLocation && oldLocation) {

      const newLoc = {latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude}
      const oldLoc = {latitude: oldLocation.latitude, longitude: oldLocation.longitude}

      const change = haversine(oldLoc, newLoc)

      if(change > .1) {
        this.checkGeofence(newLoc)
      }

    }
  }

  checkGeofence = async (currentLocation) => {

    const maxDistanceInKM = .2;

    const storePrefCoords = await this.props.storePrefs.map(store => {
      return {
        latitude: store.store.latitude,
        longitude: store.store.longitude,
        title: store.store.storeName
      }
    })

    const result = await Geofence.filterByProximity(currentLocation, storePrefCoords, maxDistanceInKM);

    const lastPush = JSON.parse(await retrievePushTime())
    if(result.length) {
      let time = new Date().getTime()

      if(!lastPush || time - lastPush > 3600000) {
        createNotification('title', 'body')
        console.log('send notification')
        savePushTiming(time)
      }
    }
  }

  render () {

    return (

      <NavigationContainer>
        <BottomTab.Navigator initialRouteName="Dashboard" tabBarOptions={{ activeTintColor: "#e91e63" }}>
          <BottomTab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
            }}
          />
          <BottomTab.Screen
            name="Notifications"
            component={MessageCenter}
            options={{
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="clipboard" color={color} size={size} />,
            }}
          />
          <BottomTab.Screen
            name="My Stores"
            component={MapContainer}
            options={{
              tabBarIcon: ({ color, size }) => <Fontisto name="shopping-store" color={color} size={size} />,
            }}
          />
          <BottomTab.Screen
            name="Me"
            component={UserProfile}
            options={{
              tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={size} />,
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    );
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
