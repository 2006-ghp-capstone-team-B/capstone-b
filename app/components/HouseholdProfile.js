import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, ImageBackground, style } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getAllHouseholds } from "../store/households";
import { useDispatch, useSelector } from "react-redux";

export default function HouseholdProfile() {


    const households = useSelector((state) => state.households);
    const user = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadAllHouseholds = (userId) => {
        dispatch(getAllHouseholds(userId));
    };

    useEffect(() => {
        loadAllHouseholds(user.id);
    }, [user.id]);

    return (
        <View>

            <Text style={globalStyles.titleText}>Household Profile:</Text>
            {/* {households.map(household => {
                            return (
                                <View key={household.listHouseholdId}>
                                    <Text>Household Name: {household.listHouseholdName}</Text>
                                    <Text>Household Members: 
                                        {
                                            household.listHouseholdMembers.map(member => {
                                                return (<Text>Member: {member.lastName}</Text>)
                                            })
                                        }</Text>
                                    <Text>Household List: haven't linked yet</Text>
                                </View>
                        )
                                    }             
                      )
        } */}

            <View key={households.listHouseholdId}>
                <Text style={globalStyles.subtitleText}>Household Name: {households.listHouseholdName}</Text>
                <View>
                    <Text style={globalStyles.subtitleText}>Household Members: </Text>
                    {/* {
                        households.listHouseholdMembers.map(member => {
                            return (<Text>{member.firstName}</Text>)
                            return (<Text>{member.lastName}</Text>)
                        })
                    } */}
                </View>
                <Text style={globalStyles.subtitleText}>Household List: </Text>
                <Text style={globalStyles.paragraph}>haven't linked yet</Text>
            </View>
        </View>
    )
}


//see the household members
//add/remove members
//change the name of the household
//see household list
