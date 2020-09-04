import React, { useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Routes from './Router'
import App2 from './App2'

import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {Button} from 'react-native'


export default function App() {


  return (
    <Provider store={store}>
      <App2 />
      <Routes></Routes>
    </Provider>

  )
}
