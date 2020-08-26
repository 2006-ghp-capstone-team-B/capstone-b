import React, { useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListHousehold } from "../store/listHousehold";
import { globalStyles } from '../../styles/globalStyles';
import styled from 'styled-components'


export default function ListHousehold() {

    const listHousehold = useSelector((state) => state.listHousehold);
    const user = useSelector((state) => state.singleUser)
    const dispatch = useDispatch();
    const loadListHousehold = (userId) => {
        dispatch(getListHousehold(userId));
    };

    useEffect(() => {
        loadListHousehold(user.id);
    }, [user.id]);


    return (
        <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
                <Container>
                {listHousehold.map(item => {
                    return (
                        <Item key={item.item.id}>
                            <Title>Item: {item.item.itemName}</Title>
                            <Title>Quantity: {item.quantity}</Title>
                            <Title>Added by:{item.userName}</Title>
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