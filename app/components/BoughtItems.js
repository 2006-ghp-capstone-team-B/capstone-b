import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Text, Body, Right, Button, ListItem, Left } from "native-base";

export default function BoughtItems(props) {

    const {Items} = props
    console.log("this is raw data returned from scanner", Items)

    const renderItem = ({ item }) => (
        <ListItem icon>
            <Left />
            <Body>
            <Text numberOfLines={1}>{item.name}</Text>
            </Body>
            <Right style={{ width: "35%" }}>
            <Text note numberOfLines={1}>{item.price}</Text>
            </Right>
        </ListItem>
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
                    <SafeAreaView
                     style={{
                        marginTop: 30,
                        backgroundColor: "white",
                        height: "90%",
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
                </View>

            </View>
         </ImageBackground>
    )
}