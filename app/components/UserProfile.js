import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getSingleUser } from "../store/singleUser";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut } from "../store/storageHelper";
import { logout } from "../store/singleUser";
import { Actions } from "react-native-router-flux";

export default function UserProfile() {

  const navigate = (screen) => {
    Actions[screen]();
  };

  const profile = useSelector((state) => state.singleUser);

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>

      <View style={globalStyles.backgroundBox}>
        <Text style={globalStyles.titleText}>User Profile Page:</Text>
        <View key={profile.id}>
          <Text style={globalStyles.subtitleText}> Name: {profile.firstName}</Text>
          <Text style={globalStyles.subtitleText}> Last Name: {profile.lastName}</Text>
          <Text style={globalStyles.subtitleText}> Email: {profile.email}</Text>
          {/* <Text style={globalStyles.subtitleText}> Change Password: TBD</Text> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            logout();
            logUserOut();
            navigate("home");
          }}
          title="Home"
        >
          <Text style={globalStyles.button}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}