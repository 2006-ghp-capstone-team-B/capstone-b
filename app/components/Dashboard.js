import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListHousehold } from "../store/listHousehold";
import { globalStyles } from '../../styles/globalStyles';

export default function Dashboard(props) {
    return (
        <View style={globalStyles.container}>
          <Text >Dashboard</Text>
          <View style={globalStyles.box}>
            <Text style={globalStyles.subtitleText}>My Private List</Text>
          </View>
          <View style={globalStyles.box}>
            <Text style={globalStyles.subtitleText}>My Household List</Text>
          </View>
          <View style={globalStyles.box}>
            <Text style={globalStyles.subtitleText}>My Household List</Text>
          </View>
        </View>
    );
}
