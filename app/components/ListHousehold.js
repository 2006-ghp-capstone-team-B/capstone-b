import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListHousehold } from "../store/listHousehold";
import { globalStyles } from '../../styles/globalStyles';

export default function ListHousehold(props) {
    // const listHousehold = useSelector((state) => state.listHousehold);
    // const dispatch = useDispatch();
    // const loadListHousehold = (userId) => {
    //     dispatch(getListHousehold(userId));
    // };

    // useEffect(() => {
    //     loadListHousehold(props.match.params.userId);
    // }, [props.match.params.userId]);


    return (
        <View style={globalStyles.container}>
            <Text> This is your household list!</Text>
            {/* {listHousehold.map(item => {
                return (
                    <View>
                        <Text>{item.item.name}</Text>
                        <Text>{item.quantity}</Text>
                        <Text>{item.userName}</Text>
                    </View>
                )
            })} */}
        </View>
    );
}