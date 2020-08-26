import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, ImageBackground, style } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { getSingleUser } from "../store/singleUser";
import { useDispatch, useSelector } from "react-redux";


export default function UserProfile() {

    const profile = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadProfileInfo = () => {
        dispatch(getSingleUser());
    }

    useEffect(() => {
        loadProfileInfo();
    });

    return (
        <View>
            <Text style={globalStyles.titleText}>User Profile Page:</Text>
            <View key={profile.id}>
                <Text style={globalStyles.subtitleText}> Name: {profile.firstName}</Text>
                <Text style={globalStyles.subtitleText}> Last Name: {profile.lastName}</Text>
                <Text style={globalStyles.subtitleText}>Private List: </Text>
                <Text style={globalStyles.paragraph}>haven't linked yet</Text>
            </View>
        </View >
    )
}


//user info
//change password
//link to store preference(screens/mapContainer)
//see their private list
//log me out
