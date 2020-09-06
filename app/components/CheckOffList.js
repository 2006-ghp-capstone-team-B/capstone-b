import React, { useEffect } from "react";
import { View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import { getListHousehold, increaseItemQuantity, decreaseItemQuantity, deleteSingleItem } from "../store/listHousehold";
import { Text, Icon, Body, Right, Button, ListItem, Card, Left, Container, List, Content } from "native-base";
import { Actions } from "react-native-router-flux";

export default function CheckOffList(props) {
  const items = props.reformattedList;
  console.log(items, "in checkofflist");
  return <Text> CheckOffList</Text>;
}
