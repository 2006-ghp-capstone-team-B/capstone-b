import React from "react";
import { Router, Scene } from "react-native-router-flux";
import { Start } from "./app/screens";
import { Login, CreateUser, Main } from "./app/screens";
import { ListPrivate, ListHousehold, HouseholdProfile } from "./app/components";

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" title="Welcome To Peasy" component={Start} renderLeftButton={()=>(null)}></Scene>
        <Scene key="login" title="Login" component={Login} ></Scene>
        <Scene key="signup" title="SignUp" component={CreateUser} ></Scene>
        <Scene key="main" title="Main" component={Main} renderLeftButton={()=>(null)}></Scene>
        <Scene key="privateList" title="My Private List" component={ListPrivate}></Scene>
        <Scene key="householdList" title="My Household List" component={ListHousehold}></Scene>
        <Scene key="households" title="My Households" component={HouseholdProfile}></Scene>
      </Scene>
    </Router>
  );
};

export default Routes;
