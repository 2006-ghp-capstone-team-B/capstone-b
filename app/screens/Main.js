import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as Location from "expo-location";
import haversine from "haversine";
import { useDispatch, useSelector } from "react-redux";
import { Platform, Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, FontAwesome, Fontisto } from "react-native-vector-icons";
import { Dashboard, UserProfile, Notifications, HouseholdProfile } from "../components";
import MapContainer from "./MapContainer";
import MessageCenter from "./MessageCenter";
import { newLocationMessage } from "../store/notifications";
import { fetchStorePrefs } from "../store/storePrefs";
import Geofence from "react-native-expo-geofence";

const BottomTab = createBottomTabNavigator();

export default function Main() {
  const [location, setLocation] = useState(null);
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.singleUser);
  const storePrefs = useSelector((state) => state.storePrefs);
  const [storePrefCoords, setStorePrefCoords] = useState(null);

  if(storePrefs.length && !storePrefCoords) {
    let coords = storePrefs.map(store => {
      return {latitude: store.store.latitude, longitude: store.store.longitude, title: store.store.storeName}
    })
    setStorePrefCoords(coords)
  }

  const sendLocationMessage = () => {
    dispatch(newLocationMessage(user.id));
  };
  const loadStorePrefs = async () => {
    dispatch(fetchStorePrefs(user.id));
    setPrefsLoaded(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        sendLocationMessage();
      } else {
        let firstLocation = await Location.getCurrentPositionAsync({});
        setLocation(firstLocation);
      }
    })();
  }, []);

  // fetch user's saved stores from the database
  useEffect(() => {
    if (user) {
      loadStorePrefs();
    }
  }, [user]);

  // Check for change in location every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if(location) {
        let newLocation = await Location.getCurrentPositionAsync({});
        let start = {latitude:location.coords.latitude, longitude: location.coords.longitude}
        let end = {latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude}
       let change = haversine(start, end)

        if(change > .05) {
          setLocation(newLocation);
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

// If user's location has changed, check if user has entered the geogence radius
  useEffect(() => {
    if(location && storePrefCoords) {
      (async () => {
        let startPoint = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const maxDistanceInKM = 1;
        let result = await Geofence.filterByProximity(startPoint, storePrefCoords, maxDistanceInKM)

        // if result.length > 0, push notification
        console.log('resut', result)
      })();
    }
  }, [location]);

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

