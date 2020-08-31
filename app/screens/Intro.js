import React from "react";
import { Text, View, ImageBackground, Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { globalStyles } from "../../styles/globalStyles";

/*
This will be our initial screen where people can log in/ sign up.
If user wants to stay logged in, we can add logic here to directly skip onto the "user home" (Home component)
*/

const Intro = () => {
  const navigate = (screen) => {
    Actions[screen]();
  };

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View>
        <Image source={require("../../assets/pea.png")} style={globalStyles.logo} resizeMode="contain"></Image>
        <Text style={globalStyles.bigTitle}>PEASY</Text>
        <View style={globalStyles.buttonView}>
          <TouchableOpacity onPress={() => navigate("login")} title="Login">
            <Text style={globalStyles.button}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("signup")} title="SignUp">
            <Text style={globalStyles.button}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Intro;