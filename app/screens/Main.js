import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, FontAwesome, Fontisto } from 'react-native-vector-icons';
import { Dashboard, UserProfile, Notifications, HouseholdProfile } from "../components"
import MapContainer from "./MapContainer";
import MessageCenter from './MessageCenter'
import haversine from 'haversine'
import { View, Text } from "react-native";

const BottomTab = createBottomTabNavigator();

class Main extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      latitude: 0,
      longitude: 0,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
    }
    this.calcDistance = this.calcDistance.bind(this)
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition( position => {
        const {routeCoordinates, distanceTravelled } =   this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
          distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render () {
    return (
      <View>
        <Text>Distance: {this.state.distanceTravelled}</Text>
        <Text>Lat: {this.state.latitude}</Text>
        <Text>Long: {this.state.longitude}</Text>
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
      </View>
    )
  }
}

export default Main
