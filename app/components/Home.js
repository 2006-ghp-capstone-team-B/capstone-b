import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, Button, StyleSheet, ImageBackground, Image, TouchableOpacity} from "react-native";
import { globalStyles } from '../../styles/globalStyles';
// import MapInput from "../MapInput.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/users";

/*
This will be our initial screen where people can log in/ sign up.
If user wants to stay logged in, we can add logic here to directly skip onto the "user home" (Home component)
*/

export default function Home() {
  // const users = useSelector((state) => state.users);
  // const dispatch = useDispatch();
  // const loadAllUsers = () => {
  //   dispatch(getAllUsers());
  // };

  // useEffect(() => {
  //   loadAllUsers();
  // }, []);

  return (
    // <View style={styles.style}>
    //   <Text >PEASY</Text>

    // </View>
    <ImageBackground source={require('../../assets/peas.jpg')} style={styles.background} >
      <View>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        >
        </Image>
        <Text style={styles.header}>
          PEASY
        </Text>
        <View style={styles.buttonView}>
          {/* ADD ON PRESS BELOW */}
          <TouchableOpacity >
            <Text style={styles.button} >Log In</Text>
          </TouchableOpacity>
          {/* ADD ON PRESS BELOW*/}
          <TouchableOpacity >
            <Text style={styles.button} >Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
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
