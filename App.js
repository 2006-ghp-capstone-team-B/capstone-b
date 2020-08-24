import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
// Importing Navigation Container and Bottom Tab Navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
// Importing icons for the bottom bar: need to import all the fmailies of icons used
import { MaterialCommunityIcons, AntDesign, FontAwesome } from 'react-native-vector-icons';
// Components that will render from the bottom tab navigator
import { Home, ListPrivate, CreateUser } from './app/components'

/* 
CREATE BOTTOM TAB
*/
const BottomTab = createBottomTabNavigator();

/* 
BOTTOM TAB HAS 4 TABS: 
1. Home (sign in/sign up) - stack
2. [TBD] Household (listHousehold/ profileHousehold) - stack; profileHousehold (preferredStore/ householdMembers)
3. ListPrivate: displays the private user list
4. [TBD] Profile: displays user profile with preferredStore and user info
*/

function MyBottomTab() {
  return (
    <BottomTab.Navigator initialRouteName="Home" tabBarOptions={{ activeTintColor: '#e91e63', }}>
      <BottomTab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <BottomTab.Screen name="Your List" component={ListPrivate} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="clipboard" color={color} size={size} />
        ),
      }} />
      <BottomTab.Screen name="Signup" component={CreateUser} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="group" color={color} size={size} />
        ),
      }} />
      {/* <BottomTab.Screen name="Profile" component={UserProfile} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" color={color} size={size} />
        ),
      }} /> */}
    </BottomTab.Navigator>
  );
}

/* 
To find all other icons visit: https://oblador.github.io/react-native-vector-icons/
*/

export default function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <MyBottomTab />
      </NavigationContainer>
    </Provider>

  )
}

// // Stack no longer in use (using bottom bar instead)

// import { NavigationContainer, DrawerActions, TabActions } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import "react-native-gesture-handler";

// const Stack = createStackNavigator();

// function HomeScreen() {
//   return (
//     <Provider store={store}>
//       <Home />
//     </Provider>
//   );
// }

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="ListPrivate" component={ListPrivate} />
//           <Stack.Screen name="Register" component={CreateUser} />
//           <Stack.Screen name="Home" component={HomeScreen} />
//           {/* <Stack.Screen name="Map" component={MapContainer} />  */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }