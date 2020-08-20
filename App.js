import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapInput from "./MapInput.js";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Yunice is editing the home component</Text>
      <StatusBar style="auto" />
      <MapInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
