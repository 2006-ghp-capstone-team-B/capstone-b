import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import styles from '../styles/globalStyles';
// import MapInput from "../MapInput.js";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount() {
        return fetch('localhost://19006/api/users/id');
    }

    render() {
        let userProfile = this.state.dataSource.map(val, key) => {
            return <View key={key} >
                <Text>{val.email}</Text>
            </View>
        })
        if (this.state.isLoading) {
            return (
                <View> <ActivityIndicator /></View>
            )
        } else {
            return (
                <View>Content Loaded:</View>
            )

        }
    }

}

