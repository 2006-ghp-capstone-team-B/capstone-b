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
import { createNotification } from '../../App'
import {connect} from 'react-redux'

const BottomTab = createBottomTabNavigator();

class Main extends React.Component {
  constructor () {
    super()
    this.getLocation = this.getLocation.bind(this)
    this.checkGeofence = this.checkGeofence.bind(this)
  }
  state = {
    permissionStatus: '',
    location: {}
  }

  async componentDidMount() {
    await this.props.loadStorePrefs(this.props.singleUser.id)
    this.getLocation()
    this.intervalId = setInterval(
      () => this.tick(),
      10000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
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

  tick() {
    this.checkGeofence()
  }

  checkGeofence = async () => {
    if(this.props.storePrefs && this.state.location !== {}) {

      const maxDistanceInKM = 1;
      const startPoint = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
      };

      const storePrefCoords = await this.props.storePrefs.map(store => {
        return {
          latitude: store.store.latitude,
          longitude: store.store.longitude,
          title: store.store.storeName
        }
      })

      const result = await Geofence.filterByProximity(startPoint, storePrefCoords, maxDistanceInKM);

      const title = `Reminder, you are passing ${result[0].title}`
      const body = `You have X items to pick up`

      await createNotification(title, body)

    }
  }



// // If user's location has changed, check if user has entered the geogence radius
//   useEffect(() => {
//     if(location && storePrefCoords) {
//       (async () => {
//         const maxDistanceInKM = 1;

//         let startPoint = {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         };

//         let result = await Geofence.filterByProximity(startPoint, storePrefCoords, maxDistanceInKM);

//         if(result.length) {
//           console.log('have results for geofence')
//           setInGeoFence(result)
//         }
//       })();
//     }
//   }, [location]);

//   // If you are inside a geofence radius, set push info
//   useEffect(() => {
//     if(inGeoFence) {
//       let currentTime = new Date().getTime()
//       console.log('time pass since change', currentTime - pushTime)
//       console.log('pushtime', pushTime)
//       if(!pushTime || Math.abs(currentTime - pushTime) > 15000)
//         console.log('time change', Math.abs(currentTime - pushTime))
//         setPushTime(currentTime)
//       // setTitle(`Reminder: You're nearby ${inGeoFence[0].title}`)
//       // setBody(`Your have X items in your cart`)
//     }
//   }, [inGeoFence])

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
