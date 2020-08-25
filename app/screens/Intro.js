import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux"
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { login } from "../store/singleUser";
import { readUser } from "../store/storageHelper";
import Main from "./Main"
/*
This will be our initial screen where people can log in/ sign up.
If user wants to stay logged in, we can add logic here to directly skip onto the "user home" (Home component)
*/

const Intro = () => {
    //check if user is in asyncStorage, if yes, skip the log in/signup rendering and just login -> which would redirect to Dashboard
    // const [user, setUser] = useState([""])
    // const dispatch = useDispatch()
    // const logUserIn = (user) => {
    //   console.log("inside log user in", user)
    //   dispatch(login(user))
    // }

    // useEffect(() => {
    //   async function checkUser () {
    //     const loggedInUser = await readUser();
    //     if(loggedInUser){
    //       setUser(loggedInUser)
    //     }else{
    //       return
    //     }
    //   }
    //   checkUser()
    // }, [])

    // useEffect(()=> {
    //   console.log("user", user)
    //   logUserIn(user)

    // }, user)

    // const navigate = (screen) => {
    //   Actions[screen]();
    // }


    // if(user !== undefined) {
    //   //logUserIn(user)
    //   return (
    //     <View><Text>{user}</Text></View>
    //   )
    // } else {
      return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={styles.background}>
          <View>
            <Image source={require("../../assets/pea.png")} style={styles.logo} resizeMode="contain"></Image>
            <Text style={styles.header}>PEASY</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={() => navigate("login")} title="Login">
                <Text style={styles.button}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate("signup")} title="SignUp">
                <Text style={styles.button}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    }
  // }

export default Intro

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: "15%",
    marginTop: "10%",
  },
  header: {
    color: "white",
    fontSize: 60,
    textAlign: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: "white",
    color: "#3A59FF",
    width: "65%",
    borderRadius: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "18%",
    padding: "2%",
    fontSize: 33,
    marginTop: "10%",
  },
  style: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginTop: 15,
  },
});
