import React from "react";
import { Text, View, ImageBackground, TouchableOpacity} from "react-native";
import { globalStyles } from '../../styles/globalStyles';
import { Actions } from "react-native-router-flux";

export default function Dashboard() {

  const navigate = (screen) => {
    Actions[screen]();
  };

    return (
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <View>
          <View style={globalStyles.buttonView}>
          <TouchableOpacity onPress={() => navigate("privateList")} title="Private List">
            <Text style={globalStyles.button}>My Private List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("householdList")} title="Household List">
            <Text style={globalStyles.button}>Household List</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
}

