import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import MapInput from "./components/MapInput.js";
import MapContainer from "./components/MapContainer";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>We're trying to display map</Text>
      <StatusBar style="auto" />
      <MapContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
