import React, { useEffect } from "react";
import { Text, View, ImageBackground, StyleSheet, SafeAreaView, FlatList  } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListPrivate } from "../store/listPrivate";
import { globalStyles } from '../../styles/globalStyles';

export default function ListPrivate() {

    const renderItem = ({ item }) => (
        <View>
            <Text>Item: {item.item.itemName}</Text>
            <Text>Quantity: {item.quantity}</Text>
        </View>
    );



    const listPrivate = useSelector((state) => state.listPrivate);
    const user = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadListPrivate = (userId) => {
        dispatch(getListPrivate(userId));
    };

    useEffect(() => {
        loadListPrivate(user.id);
    }, [user.id]);

    if(!user.id && listPrivate.length === 0){
        return (
            <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
                <Text>You don't have any item in your private list!</Text>
            </ImageBackground>
        )
    }else{
        return (
            <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
                        <SafeAreaView>
                            <FlatList
                                data={listPrivate}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.item.id}
                            />
                        </SafeAreaView>
            </ImageBackground>
        );
    }

}

