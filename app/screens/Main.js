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
  const [storePrefs, setStorePrefs] = useState(null);
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.singleUser);
  const stores = useSelector((state) => state.storePrefs);

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
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("settings", prefsLoaded);
      loadStorePrefs();
    }
  }, [user]);

  var points = [
    { latitude: -23.658739, longitude: -46.666305 },
    { latitude: -23.651814, longitude: -46.664129 },
  ];

  var startPoint = {
    latitude: -23.652508,
    longitude: -46.661474,
  };

  useEffect(() => {
    (async () => {
      const maxDistanceInKM = 0.5;
      let result = await Geofence.filterByProximity(startPoint, points, maxDistanceInKM);
      console.log("!!!!!!!!!!GEO", Geofence);
      console.log("!###################", Geofence.filterByProximity);
      // if (result !== undefined) {
      //   const distance = result[0].distanceInKM;
      //   console.log("distance", distance);
      // }
      console.log("~~~~~~~~~~~~~~~~~~~~result", JSON.stringify(result));
    })();
  }, []);

  // if(location) {
  //   console.log('change in distance', haversine(start, {latitude: location.coords.latitude, longitude: location.coords.longitude}, {unit: 'mile'}))
  // }
  console.log("story", stores);
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
