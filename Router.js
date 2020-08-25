import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import {Intro} from './app/screens'
import {Login, CreateUser, Main} from './app/screens'
import {ListPrivate, ListHousehold} from "./app/components"

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" title="Home" component={Intro}></Scene>
        <Scene key="login" title="Login" component={Login}></Scene>
        <Scene key="signup" title="SignUp" component={CreateUser}></Scene>
        <Scene key="main" title="Main" component={Main}></Scene>
        <Scene key="privateList" title="My List" component={ListPrivate}></Scene>
        <Scene key="householdList" title="Household List" component={ListHousehold}></Scene>
      </Scene>
    </Router>
  );
};

export default Routes;
