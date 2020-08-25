import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListHousehold } from "../store/listHousehold";
import { globalStyles } from '../../styles/globalStyles';

export default function ListHousehold(props) {
    return (
        <View style={globalStyles.container}>
          <Text >Main dashboard with links to all lists ad households here</Text>
        </View>
    );
}
