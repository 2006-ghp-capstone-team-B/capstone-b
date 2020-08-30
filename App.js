import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity} from "react-native";
import Routes from './Router'


const theme = {
  Button: {
    raised: true,
  },
  h3Style: {
    alignSelf: 'center'
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>

  )
}


