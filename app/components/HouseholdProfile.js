import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, ImageBackground, Button, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getAllHouseholdMembers } from "../store/households";
// If someone decided to leave the household... we would redirect them to their "All Households" screen
import { Actions } from "react-native-router-flux";
import { Formik } from "formik";

export default function HouseholdProfile(props) {
    const { listId, userId, listName } = props
    const user = useSelector((state) => state.singleUser);
    console.log("~~~~~~~~~~~~~~~~~~~state.user~~~~~~~~~~~~~~~~: ", user)

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.firstName} {item.lastName}</Text>
        </View>
    );

    // const navigate = (screen) => {
    //     Actions[screen]();
    // };
    // const allhouseholds = useSelector((state) => state.households);
    // const { listMembers } = useSelector((state) => state.households);


    const dispatch = useDispatch();
    const loadAllHouseholdMembers = (listId) => {
        dispatch(getAllHouseholdMembers(listId));
    };

    useEffect(() => {
        loadAllHouseholdMembers(listId);
    }, [listId]);

    return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
            <View style={globalStyles.backgroundBox}>

                <View key={listId}>
                    <View>
                        <Text style={globalStyles.titleText}> {listName}</Text>
                        <Text style={globalStyles.subtitleText}>Household ID: {listId}</Text>
                        <Text style={globalStyles.subtitleText}>Household Members: </Text>
                    </View>

                    <SafeAreaView style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
                        <FlatList
                            // numColumns={2}
                            data={user}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>
                </View>

            </View>
        </ImageBackground>
    )
}