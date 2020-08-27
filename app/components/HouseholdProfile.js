import React, { useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity, Button, SafeAreaView, FlatList } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getAllHouseholds } from "../store/households";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";

export default function HouseholdProfile() {

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.firstName} {item.lastName}</Text>
        </View>
    );

    const navigate = (screen) => {
        Actions[screen]();
    };

    const { listHouseholdId, listHouseholdName, listHouseholdMembers } = useSelector((state) => state.households);
    const user = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadAllHouseholds = (userId) => {
        dispatch(getAllHouseholds(userId));
    };

    useEffect(() => {
        loadAllHouseholds(user.id);
    }, [user.id]);

    if (!listHouseholdId) {
        return (
            <View>
                <Text style={globalStyles.titleText}>You haven't joined any household!</Text>
                <TouchableOpacity onPress={() => navigate("householdList")} title="CreateNewHousehold">
                    <Text style={globalStyles.button}> Create New Household </Text>
                </TouchableOpacity>
            </View>
        )

    }
    return (
        <ScrollView style={globalStyles.containerScroll}>

            {/* <Text style={globalStyles.titleText}>Household Profile:</Text> */}
            {/* Reminder: right now we only have one household, and it is an object. But eventually we want many households as an array. */}


            <View key={listHouseholdId}>
                <Text style={globalStyles.titleText}>{listHouseholdName}</Text>
                <View>
                    <Text style={globalStyles.subtitleText}>Household Members: </Text>

                    {listHouseholdMembers !== undefined && listHouseholdMembers.length !== 0 ?

                        <SafeAreaView>
                            <FlatList
                                data={listHouseholdMembers}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </SafeAreaView>

                        :
                        <Text>Household member not found!</Text>
                    }

                </View>

            </View>
            {/* Change the navigate on next line */}
            <TouchableOpacity onPress={() => navigate("addMember")} title="Add member">
                <View style={{ flexDirection: 'row' }}>
                    <Text style={globalStyles.smallButton}> + </Text>
                    <Text> Add member to Household </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("householdList")} title="Household List">
                <Text style={globalStyles.button}> Household List </Text>
            </TouchableOpacity>
        </ScrollView >
    )
}


//see the household members
//add/remove members
//change the name of the household
//see household list
