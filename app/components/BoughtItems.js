import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, ImageBackground, Button, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function BoughtItems(props) {

    const {Items} = props

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.name}</Text>
            <Text>Price: {item.price}</Text>
        </View>
    );

    //manually extract items and prices from the scanning output for presentation purpose !!!!(only applicable to a specific receipt in slack)
    const ItemsAndPrices = Items.split("\n")
    const numOfItem = Math.floor(ItemsAndPrices.length / 2)
    let arrayObject = []
    for(let i=0; i< numOfItem ; i++){
        arrayObject.push({"name": ItemsAndPrices[i], "price":ItemsAndPrices[i+numOfItem]})
    }

    return (
         <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
            <View style={globalStyles.backgroundBox}>

                <View>
                    <SafeAreaView style={{ alignItems: "center", justifyContent: "center", }}>
                        <FlatList
                            data={arrayObject}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>
                </View>

            </View>
         </ImageBackground>
    )
}