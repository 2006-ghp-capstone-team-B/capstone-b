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
          const coords = details.geometry.location
          const name = data.structured_formatting.main_text
          const address = details.formatted_address
          let category = "Other"
          if(data.types.includes('supermarket')) {
            category = "Groceries"
          }
          props.notifyChange(coords, name, address, category);
        }}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }}
        styles={{
          borderWidth: 4,
          borderColor: 'purple',
          textInputContainer: {
            width: '100%',
            alignSelf: 'center',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            backgroundColor: 'white'
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
