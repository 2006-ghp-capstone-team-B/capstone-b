import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, ImageBackground, Button, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getAllHouseholdMembers } from "../store/householdMembers";
// If someone decided to leave the household... we would redirect them to their "All Households" screen
import { Actions } from "react-native-router-flux";

export default function HouseholdProfile(props) {
    const { listId, listName } = props
    const members = useSelector((state) => state.householdMembers);

    const dispatch = useDispatch();
    const loadAllHouseholdMembers = (listId) => {
        dispatch(getAllHouseholdMembers(listId));
    };

    useEffect(() => {
        loadAllHouseholdMembers(listId);
    }, [listId]);

    // const navigate = (screen) => {
    //     Actions[screen]();
    // };

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.user.firstName} {item.user.lastName}</Text>
        </View>
    );

    return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
            <View style={globalStyles.backgroundBox}>

                <View key={listId}>
                    {/* <View style={globalStyles.paragraph}> */}
                    <Text style={globalStyles.titleText}> {listName}</Text>
                    <Text style={globalStyles.subtitleText}>Household ID: {listId}</Text>
                    <Text style={globalStyles.subtitleText}>Household Members: </Text>
                    <SafeAreaView style={{ alignItems: "center", justifyContent: "center", }}>
                        <FlatList
                            data={members}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>
                    {/* </View> */}
                </View>

            </View>
        </ImageBackground>
    )
}