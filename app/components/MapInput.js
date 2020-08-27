import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import API_KEY from "../../secret";

const GOOGLE_PLACES_API_KEY = API_KEY; // MAKE SURE THIS IS NOT THE REAL KEY

const MapInput = (props) => {
  return (
    <View>
      <GooglePlacesAutocomplete
        query={{
          key: API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log("input details:", details.geometry);
          console.log("input data:", data.types);
          props.notifyChange(details.geometry.location);
          // TRIGGER THUNK TO MAKE API CALL TO ADD GROCERY PREFERENCE TO BACKEND
        }}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }}
        styles={{
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            width: 300,
            height: "10%",
            // left: -50,
            // top: -10,
            justifyContent: "flex-start",
            alignItems: "center",
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
      />
    </View>
  );
};

export default MapInput;
