import React from "react";
import { Router, Scene } from "react-native-router-flux";
import { Start } from "./app/screens";
import { Login, CreateUser, Main } from "./app/screens";
import { Dashboard } from "./app/components";

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" title="Home" component={Start}></Scene>
        <Scene key="login" title="Login" component={Login}></Scene>
        <Scene key="signup" title="SignUp" component={CreateUser}></Scene>
        <Scene key="main" title="Main" component={Main}></Scene>
        <Scene key="dashboard" title="Dashboard" component={Dashboard}></Scene>
      </Scene>
    </Router>
  );
};

export default Routes;
