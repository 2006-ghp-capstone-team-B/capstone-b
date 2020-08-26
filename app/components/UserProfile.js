import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, ImageBackground } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { me } from "../store/singleUser";
import { useDispatch, useSelector } from "react-redux";


export default function UserProfile() {

    const profile = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadProfileInfo = () => {
        dispatch(me());
    }

    useEffect(() => {
        loadProfileInfo();
    });

    return (
        <View>
            <Text>User Profile Page:</Text>
            <View key={profile.id}>
                <Text> Name: {profile.firstName}</Text>
                <Text> Last Name: {profile.lastName}</Text>
                <Text>Ptivate List: haven't linked yet</Text>
            </View>
        </View>
    )
}


//user info
//change password
//link to store preference(screens/mapContainer)
//see their private list
//log me out
