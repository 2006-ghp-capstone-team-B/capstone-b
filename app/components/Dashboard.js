import React from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Actions } from "react-native-router-flux";
import { Text } from 'native-base';


export default function Dashboard() {

  const navigate = (screen) => {
    Actions[screen]();
  };

  return (
    <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      <View style={{ marginTop: 30, backgroundColor: 'white', height: '90%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
        <View style={globalStyles.buttonView}>
          <TouchableOpacity onPress={() => navigate("privateList")} title="Private List">
            <Text style={globalStyles.button}>My Private List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("AllHouseholds")} title="My Households">
            <Text style={globalStyles.button}>My Households</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("Scanner")} title="Scanner">
            <Text style={globalStyles.button}>Scan your receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}