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
        return fetch('localhost:19006/api/users/1')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.users,
                })
            })
    }
    // async componentDidMount() {
    //     try {
    //         // const response = await fetch('localhost://19006/api/users/1');
    //         // const userProfile = response.json();


    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    render() {
        if (this.state.isLoading) {
            return (
                <View> <ActivityIndicator /></View>
            )
        } else {

            let users = this.state.dataSource.map((val, key) => {
                return <View key={key} >
                    <Text>{val.email}</Text>
                </View>
            })

            return (
                <View>Content Loaded: {users}</View>
            )

        }
    }

}

