import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList, Button  } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListPrivate, increaseItem } from "../store/listPrivate";
import { globalStyles } from '../../styles/globalStyles';

export default function ListPrivate() {

    const plus = (userId, itemId) => {
        dispatch(increaseItem(userId, itemId))
    }

    const renderItem = ({ item, userId }) => (
        <View>
            <Text>Item: {item.item.itemName}</Text>
            <Button
                            title="-"
                            onPress={() => console.log(item)}
                        />
            <Text>Quantity: {item.quantity}</Text>
            <Button
                            title="+"
                            onPress={() => plus(userId, item.item.id)}
            />
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
                                extraData={user.id}
                            />
                        </SafeAreaView>


            </ImageBackground>
        );
    }

}

