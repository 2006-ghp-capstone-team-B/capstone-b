import React from "react";
import { Router, Scene } from "react-native-router-flux";
import { Start } from "./app/screens";
import { Login, CreateUser, Main } from "./app/screens";
import { ListPrivate, HouseholdEditMembers, AllHouseholds, SingleHouseholdList, AddNewItem, HouseholdFind, HouseholdCreate } from "./app/components";


const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" title="Welcome To Peasy" component={Start} renderLeftButton={() => null}></Scene>
        <Scene key="login" title="Login" component={Login}></Scene>
        <Scene key="signup" title="SignUp" component={CreateUser}></Scene>
        <Scene key="main" title="Main" component={Main} renderLeftButton={() => null}></Scene>
        <Scene key="privateList" title="My Private List" component={ListPrivate}></Scene>
        <Scene key="AddNewItem" title="Add New Item" component={AddNewItem}></Scene>
        <Scene key="AllHouseholds" title="All My Households" component={AllHouseholds}></Scene>
        <Scene key="ListSingleHousehold" title="Single Household List" component={SingleHouseholdList}></Scene>
        <Scene key="HouseholdEditMembers" title="Edit Household Members" component={HouseholdEditMembers}></Scene>
        <Scene key="HouseholdFind" title="Find A Household" component={HouseholdFind}></Scene>
        <Scene key="HouseholdCreate" title="Create A New Household" component={HouseholdCreate}></Scene>

      </Scene>
    </Router>
  );
};

export default Routes;
