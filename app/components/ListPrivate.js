import React, { useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import styles from "../../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getListPrivate } from "../store/listPrivate";

export default function ListPrivate() {
    const listPrivate = useSelector((state) => state.listPrivate);
    const dispatch = useDispatch();
    const loadListPrivate = (userId) => {
        dispatch(getListPrivate(userId));
    };

    useEffect(() => {
        loadListPrivate(props.match.params.userId);
    }, [props.match.params.userId]);


    return (
        <View>
            <Text> This is your private list!</Text>
            {listPrivate.map(item => {
                return (
                    <View>
                        <Text>{item.item.name}</Text>
                        <Text>{item.quantity}</Text>
                    </View>
                )
            })}
        </View>
    );
}