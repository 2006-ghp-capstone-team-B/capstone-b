import React from "react";
import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Actions } from "react-native-router-flux";

export default function Dashboard() {

  const navigate = (screen) => {
    Actions[screen]();
  };

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={globalStyles.backgroundBox}>
        <View style={{marginTop: '5%'}}>
          <TouchableOpacity onPress={() => navigate("privateList")} title="Private List">
            <Text style={globalStyles.button}>My Private List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("AllHouseholds")} title="My Households">
            <Text style={globalStyles.button}>My Households</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
