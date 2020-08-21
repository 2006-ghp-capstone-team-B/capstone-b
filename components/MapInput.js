import * as React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import API_KEY from "../secret";

const GOOGLE_PLACES_API_KEY = API_KEY; // MAKE SURE THIS IS NOT THE REAL KEY

const MapInput = props => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        query={{
          key: API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          props.notifyChange(details.geometry.location)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});

export default MapInput;
