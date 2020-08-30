import React, { useEffect } from "react";
import { Text, View, ImageBackground, StyleSheet, SafeAreaView, FlatList, Button  } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListPrivate, increaseItemQuantity, decreaseItemQuantity } from "../store/listPrivate";
import { globalStyles } from '../../styles/globalStyles';

export default function ListPrivate() {

    const renderItem = ({ item }) => (
        <View style={{backgroundColor: 'white', width: '80%', alignSelf: 'center', margin: '5%'}}>
            <Text>Item: {item.item.itemName}</Text>
            <Button style={globalStyles.button} title="+" transparent onPress={() => increase(item.userId, item.listId, item.itemId, item.quantity)}>
            </Button>
            <Text>Quantity: {item.quantity}</Text>
            <Button style={globalStyles.button} title="-" transparent onPress={() => decrease(item.userId, item.listId, item.itemId, item.quantity)}>
            </Button>
        </View>
    );

    const listPrivate = useSelector((state) => state.listPrivate);
    const user = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadListPrivate = (userId) => {
        dispatch(getListPrivate(userId));
    };
    const increase = (userId, listId, itemId, quantity) => {
      dispatch(increaseItemQuantity(userId, listId, itemId, quantity))
    }
    const decrease = (userId, listId, itemId, quantity) => {
      if(quantity > 1){
        dispatch(decreaseItemQuantity(userId, listId, itemId, quantity))
      }
    }

    useEffect(() => {
        loadListPrivate(user.id);
    }, [user.id]);

        return (
            <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>

                {!user.id && listPrivate.length === 0
                ? <View style={{ marginTop: 30, backgroundColor: 'rbga(255,0,0,0.5)', height: '90%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
                    <Text>You don't have any item in your private list!</Text>
                </View>
            : <SafeAreaView style={{ marginTop: 30, backgroundColor: 'white', height: '90%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
                <FlatList
                    data={listPrivate}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.item.id.toString()}
                    />
                </SafeAreaView>
            }
            </ImageBackground>
        )
}


