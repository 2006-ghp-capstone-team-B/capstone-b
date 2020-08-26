import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getAllHouseholds } from "../store/households";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";

export default function HouseholdProfile() {

    const navigate = (screen) => {
        Actions[screen]();
    };

    const households = useSelector((state) => state.households);
    const user = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadAllHouseholds = (userId) => {
        dispatch(getAllHouseholds(userId));
    };

    useEffect(() => {
        loadAllHouseholds(user.id);
    }, [user.id]);

    console.log("this is user", user)
    console.log("this is households", households)
    return (
        <View>

            <Text style={globalStyles.titleText}>Household Profile:</Text>
            {/* Reminder: right now we only have one household, and it is an object. But eventually we want many households as an array. */}
            {/* <View>{households.map(household => {
                            return (
                                <View key={household.listHouseholdId}>
                                    <Text>Household Name: {household.listHouseholdName}</Text>
                                    <Text>Household Members: 
                                        {
                                            household.listHouseholdMembers.map(member => {
                                                return (<Text>{member.firstName} {member.lastName}</Text>)
                                            })
                                        }</Text>
                                    <Text>Household List: haven't linked yet</Text>
                                </View>
                        )
                                    }             
                      )
        }</View> */}

            <View key={households.listHouseholdId}>
                <Text style={globalStyles.subtitleText}>Household Name: {households.listHouseholdName}</Text>
                <View>
                    <Text style={globalStyles.subtitleText}>Household Members: </Text>
                    {
                        households.listHouseholdMembers.map(member => {
                            return (<View key={member.id}><Text style={globalStyles.subtitleText}>{member.firstName} {member.lastName}</Text></View>)
                        })
                    }
                </View>

            </View>
            <TouchableOpacity onPress={() => navigate("householdList")} title="Household List">
                <Text style={globalStyles.button}>Household List</Text>
            </TouchableOpacity>
        </View>
    )
}


//see the household members
//add/remove members
//change the name of the household
//see household list
