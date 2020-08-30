import React, { useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getAllHouseholds } from "../store/households";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import { AntDesign, FontAwesome, FontAwesome5 } from 'react-native-vector-icons';

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
    // const dispatch = useDispatch();
    // const loadAllHouseholds = (userId) => {
    //     dispatch(getAllHouseholds(userId));
    // };

    // useEffect(() => {
    //     loadAllHouseholds(user.id);
    // }, [user.id]);

    if (!listHouseholdId) {
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.titleText}>You haven't joined any household!</Text>

                <TouchableOpacity onPress={() => navigate("householdList")} title="CreateNewHousehold">
                    <Text style={globalStyles.button}> Create New Household </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate("householdList")} title="FindYourHousehold">
                    <Text style={globalStyles.button}> Find your Household </Text>
                </TouchableOpacity>
            </View>
        )

    }
    return (
        <ScrollView>

            {/* Reminder: right now we only have one household, and it is an object. But eventually we want many households as an array. */}

            <View key={listHouseholdId}>
                <View>
                    <Text style={globalStyles.titleText}> {listHouseholdName}
                    </Text>
                </View>
                <View>
                    <Text style={globalStyles.subtitleText}>Household Members: </Text>
                </View>
                {/* see the household members */}
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", }}>
                    {listHouseholdMembers !== undefined && listHouseholdMembers.length !== 0
                        ?
                        <SafeAreaView >
                            <FlatList
                                data={listHouseholdMembers}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </SafeAreaView>
                        :
                        <Text style={globalStyles.paragraph}>Household member not found!</Text>
                    }
                </View>
            </View>

            {/* add/remove members & change household*/}
            <TouchableOpacity onPress={() => navigate("editMembers")} title="Edit Members">
                <Text style={globalStyles.mButton}><AntDesign name="adduser" size={20} /> <AntDesign name="deleteuser" size={20} /> Add or delete a member</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("editMembers")} title="Change Household name">
                <Text style={globalStyles.mButton}><FontAwesome name="pencil" size={20} /> Change household name</Text>
            </TouchableOpacity>
            {/* see household list */}
            <TouchableOpacity onPress={() => navigate("householdList")} title="Household List">
                <Text style={globalStyles.button}> <FontAwesome5 name="list-ul" size={30} /> Household List </Text>
            </TouchableOpacity>
        </ScrollView >
    )
}
