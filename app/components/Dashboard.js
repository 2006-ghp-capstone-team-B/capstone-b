import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Actions } from "react-native-router-flux";
import { logUserOut } from "../store/storageHelper";
import { logout } from "../store/singleUser";
export default function Dashboard() {

  const navigate = (screen) => {
    Actions[screen]();
  };

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={{ marginTop: 30 }}>
        <View style={globalStyles.buttonView}>
          <TouchableOpacity onPress={() => navigate("privateList")} title="Private List">
            <Text style={globalStyles.button}>My Private List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("AllHouseholds")} title="My Households">
            <Text style={globalStyles.button}>My Households</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              logout();
              logUserOut();
              navigate("home");
            }}
            title="Home"
          >
            <Text style={globalStyles.button}>Log Out for now</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ImageBackground>
  );
}
