import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ImageBackground, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Text, Body, Right, Button, ListItem, Left } from "native-base";
import {deleteSingleItem} from "../store/listPrivate"
import {markPurchased} from "../store/listHousehold"
import { Actions } from "react-native-router-flux";
import { getListPrivate } from "../store/listPrivate";
import {getListHousehold} from "../store/listHousehold"

export default function BoughtItems(props) {

    const { Items, listPrivate, listHousehold, userId} = props

    const dispatch = useDispatch()
    const deleteItem = async (userId, listId, itemId) => {
        await dispatch(deleteSingleItem(listId, itemId))
        await dispatch(getListPrivate(userId))
    }
    const mark = async (listId, itemId) => {
        await dispatch(markPurchased(listId, itemId))
        await dispatch(getListHousehold(listId));
    }

    const renderItem = ({ item }) => (
        <ListItem icon>
            <Left />
            <Body>
                <Text numberOfLines={1} style={{ fontSize: 12 }}>{item.name}</Text>
            </Body>
            <Right style={{ width: "35%" }}>
                <Text note numberOfLines={1} style={{ fontSize: 12 }}>{item.price}</Text>
            </Right>
        </ListItem>
    );

    //manually extract items and prices from the scanning output for presentation purpose !!!!(only applicable to a specific receipt in slack)
    const ItemsAndPrices = Items.split("\n")
    const numOfItem = Math.floor(ItemsAndPrices.length / 2)
    let arrayObject = []
    for (let i = 0; i < numOfItem; i++) {
        arrayObject.push({ "name": ItemsAndPrices[i], "price": (ItemsAndPrices[i + numOfItem]).match(/^\$\d+\.\d{2}/g) })
    }
    
    //the check off function:
    const checkOff = (arrayObject, listPrivate, listHousehold, userId) => {

        //listhousehold === undefined, listPrivate === defined:
        if(listPrivate !== undefined){
            let itemsToCheckOff = []
            //if items match in receipt and private list, push them to an empty array for later deleting
            for(let i=0; i<arrayObject.length; i++){
                for(let j=0; j<listPrivate.length; j++){
                    if(arrayObject[i].name === listPrivate[j].item.itemName){
                        itemsToCheckOff.push({listId: listPrivate[j].listId, itemId: listPrivate[j].itemId})
                    }
                }
            }
            
            //for every item in the above array, we send a delete request to delete those items in private list
            for(let n=0; n<itemsToCheckOff.length; n++){
                let {listId, itemId} = itemsToCheckOff[n]
                deleteItem(userId, listId, itemId)
            }
    
            //pop back to private list page directly
            Actions.pop()
            Actions.pop()
        }
        else if(listHousehold !== undefined){
            let itemsToCheckOff = []
            //if items match in receipt and private list, push them to an empty array for later deleting
            for(let i=0; i<arrayObject.length; i++){
                for(let j=0; j<listHousehold.length; j++){
                    if(arrayObject[i].name === listHousehold[j].item.itemName){
                        itemsToCheckOff.push({listId: listHousehold[j].listId, itemId: listHousehold[j].itemId})
                    }
                }
            }

            //for every item in the above array, we send a delete request to delete those items in private list
            for(let n=0; n<itemsToCheckOff.length; n++){
                let {listId, itemId} = itemsToCheckOff[n]
                mark(listId, itemId)
            }
    
            //pop back to private list page directly
            Actions.pop()
            Actions.pop()
        }

    }

    return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
            <View style={globalStyles.backgroundBox}>

                <View>
                    <SafeAreaView
                        style={{
                            marginTop: 30,
                            backgroundColor: "white",
                            height: "85%",
                            width: "95%",
                            alignSelf: "center",
                            borderRadius: 25,
                        }}
                    >
                        <FlatList
                            data={arrayObject}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>
                    {/* <View style={{ flex: 1, marginTop: '3%' }}> */}
                        <TouchableOpacity onPress={() => checkOff(arrayObject, listPrivate, listHousehold, userId)} title="Check off my list">
                            <Text style={globalStyles.button}>Check off my list</Text>
                        </TouchableOpacity>
                    {/* </View> */}
                </View>

            </View>
        </ImageBackground>
    )
}