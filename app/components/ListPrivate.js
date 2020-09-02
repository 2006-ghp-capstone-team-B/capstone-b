import React, { useEffect } from "react";
import { View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListPrivate, increaseItemQuantity, decreaseItemQuantity, deleteSingleItem } from "../store/listPrivate";
import {fetchListInfo} from "../store/listInfo"
import { globalStyles } from '../../styles/globalStyles';
import { Text, Icon, Body, Right, Button, ListItem, Card, Left, Container } from 'native-base';
import { Actions } from "react-native-router-flux";

export default function ListPrivate() {


  const renderItem = ({ item }) => {
    return (
      <ListItem icon>
        <Left />
        <Body>
          <Text numberOfLines={1}>{item.item.itemName}</Text>
          <Text note numberOfLines={1}>Quantity: {item.quantity}</Text>
        </Body>
        <Right style={{ width: "35%" }}>
          <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => increase(item.userId, item.listId, item.itemId, item.quantity)}>
            <Text>+</Text>
          </Button>
          <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => decrease(item.userId, item.listId, item.itemId, item.quantity)}>
            <Text>-</Text>
          </Button>
          <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => deleteItem(item.userId, item.listId, item.itemId)}>
            <Text>x</Text>
          </Button>
        </Right>
      </ListItem>
    )
  };

  const renderSample = ({ item }) => {
    return (
      <ListItem icon>
        <Left />
        <Body>
          <Text numberOfLines={1}>Your First Item</Text>
          <Text note numberOfLines={1}>Quantity: 100</Text>
        </Body>
        <Right style={{ width: "35%" }}>
          <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => alert("This will increment your item count.")}>
            <Text>+</Text>
          </Button>
          <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => alert("This will decrement your item count.")}>
            <Text>-</Text>
          </Button>
          <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => alert("This will remove your item.")}>
            <Text>x</Text>
          </Button>
        </Right>
      </ListItem>
    )
  };

  const listPrivate = useSelector((state) => state.listPrivate);
  const listInfo = useSelector((state) => state.listInfo);
  const user = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();
  const loadListPrivate = (userId) => {
    dispatch(fetchListInfo(userId))
    dispatch(getListPrivate(userId));
  };
  const increase = (userId, listId, itemId, quantity) => {
    dispatch(increaseItemQuantity(userId, listId, itemId, quantity))
  }
  const decrease = (userId, listId, itemId, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseItemQuantity(userId, listId, itemId, quantity))
    }
  }
  const deleteItem = (userId, listId, itemId) => {
    dispatch(deleteSingleItem(userId, listId, itemId))
  }

  useEffect(() => {
    loadListPrivate(user.id);
  }, [user.id]);


  return (
    <Container>
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <View style={globalStyles.backgroundBox}>
          <View>
            {!user.id || listPrivate.length === 0
              ? <SafeAreaView style={{ marginTop: 30, backgroundColor: 'white', height: '80%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
              <FlatList
                data={['sample']}
                renderItem={renderSample}
                keyExtractor={(item) => item}
              />
            </SafeAreaView>
              : <SafeAreaView style={{ marginTop: 30, backgroundColor: 'white', height: '80%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
                <FlatList
                  data={listPrivate}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.item.id.toString()}
                />
              </SafeAreaView>
            }
          </View>
          <View style={{ flex: 1, marginTop: '3%' }}>
            <TouchableOpacity onPress={() => Actions.AddNewItemPrivate({listId: listInfo.listId, userId: user.id})} title="Add New Item">
              <Text style={globalStyles.button}>Add New Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Container>
  )
}
