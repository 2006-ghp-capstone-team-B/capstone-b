import React, { useEffect } from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListPrivate } from "../store/listPrivate";
import { globalStyles } from '../../styles/globalStyles';
import styled from 'styled-components'

export default function ListPrivate() {
    const listPrivate = useSelector((state) => state.listPrivate);
    const user = useSelector((state) => state.singleUser);
    const dispatch = useDispatch();
    const loadListPrivate = (userId) => {
        dispatch(getListPrivate(userId));
    };

    useEffect(() => {
        loadListPrivate(user.id);
    }, [user.id]);


    return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
            <Container>
            {listPrivate.map(item => {
                return (
                    <Item key={item.item.id}>
                        <Title>Item: {item.item.itemName}</Title>
                        <Title>Quantity: {item.quantity}</Title>
                    </Item>
                )
            })}
            </Container>

        </ImageBackground>
    );
}


const Container=styled.View`
    flex:1;
    padding:50px 0;
    justify-content:center;
    background-color:#f4f4f4;
    align-items:center
`
const Title=styled.Text`
font-size:20px;
text-align:center;
 color:black;
`
const Item=styled.View`
flex:0.2;
border:1px solid #ccc;
margin:2px 2px;
border-radius:10px;
box-shadow:0 0 10px #6d706f;
background-color:#ebfcf8;
width:80%;
padding:10px;
`