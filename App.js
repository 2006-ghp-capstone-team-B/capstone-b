import React, { useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Routes from './Router'
import PushNotifications from './PushNotifications'

import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native'


export default function App() {


  return (
    <Provider store={store}>
      <PushNotifications />
      <Routes></Routes>
    </Provider>

  )
}
