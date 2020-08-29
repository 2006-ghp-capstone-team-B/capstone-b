import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity} from "react-native";
import Routes from './Router'
import { ThemeProvider } from 'react-native-elements';

const theme = {
  Button: {
    raised: true,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Routes></Routes>
      </ThemeProvider>
    </Provider>

  )
}


