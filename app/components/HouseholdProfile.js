import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Button, SafeAreaView, FlatList } from "react-native";
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

    if(!listHouseholdId){
        return <View><Text style={globalStyles.titleText}>You haven't joined any household!</Text></View>
    }
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

            <View key={listHouseholdId}>
                <Text style={globalStyles.subtitleText}>Household Name: {listHouseholdName}</Text>
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
            <TouchableOpacity onPress={() => navigate("householdList")} title="Household List">
                <Text style={globalStyles.button}> Household List </Text>
            </TouchableOpacity>
        </View>
    )
}


//see the household members
//add/remove members
//change the name of the household
//see household list
