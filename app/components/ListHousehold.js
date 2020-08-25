import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListHousehold } from "../store/listHousehold";
import { globalStyles } from '../../styles/globalStyles';

export default function ListHousehold() {

    const listHousehold = useSelector((state) => state.listHousehold);
    const user = useSelector((state) => state.singleUser)
    const dispatch = useDispatch();
    const loadListHousehold = (userId) => {
        dispatch(getListHousehold(userId));
    };

    console.log("listhousehold", listHousehold)
    useEffect(() => {
        loadListHousehold(user.id);
    }, user.id);


    return (
        <View style={globalStyles.container}>
            <Text> This is your household list!</Text>
            {listHousehold.map(item => {
                return (
                    <View>
                        <Text>{item.item.name}</Text>
                        <Text>{item.quantity}</Text>
                        <Text>{item.userName}</Text>
                    </View>
                )
            })}
        </View>
    );
}