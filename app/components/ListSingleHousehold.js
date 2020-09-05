import React, { useEffect } from "react";
import { View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import { getListHousehold, increaseItemQuantity, decreaseItemQuantity, deleteSingleItem } from "../store/listHousehold";
import { Text, Icon, Body, Right, Button, ListItem, Card, Left, Container } from "native-base";
import { Actions } from "react-native-router-flux";

export default function SingleHouseholdList(props) {
  console.log("props", props);

  const { listId, userId } = props;
  const listHousehold = useSelector((state) => state.listHousehold);

  const dispatch = useDispatch();
  const loadHouseholdList = (id) => {
    dispatch(getListHousehold(id));
  };
  const increase = (listId, itemId, quantity) => {
    dispatch(increaseItemQuantity(listId, itemId, quantity));
  };
  const decrease = (listId, itemId, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseItemQuantity(listId, itemId, quantity));
    }
  };
  const deleteItem = (listId, itemId) => {
    dispatch(deleteSingleItem(listId, itemId));
  };

  useEffect(() => {
    loadHouseholdList(listId);
  }, [listId]);
  const renderSample = ({ item }) => {
    return (
      <ListItem icon>
        <Left />
        <Body>
          <Text numberOfLines={1}>Your First Item</Text>
          <Text note numberOfLines={1}>
            Quantity: 100
          </Text>
        </Body>
        <Right style={{ width: "35%" }}>
          <Button
            style={globalStyles.buttonPlusMinus}
            transparent
            onPress={() => alert("This will increment your item count.")}
          >
            <Text>+</Text>
          </Button>
          <Button
            style={globalStyles.buttonPlusMinus}
            transparent
            onPress={() => alert("This will decrement your item count.")}
          >
            <Text>-</Text>
          </Button>
          <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => alert("This will remove your item.")}>
            <Text>x</Text>
          </Button>
        </Right>
      </ListItem>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem icon>
        <Left />
        <Body>
          <Text numberOfLines={1}>{item.item.itemName}</Text>
          <Text note numberOfLines={1}>
            Ownder: {item.userId} & {item.user.firstName}
          </Text>
          <Text note numberOfLines={1}>
            Quantity: {item.quantity}
          </Text>
        </Body>
        {item.userId === userId ? (
          <Right style={{ width: "35%" }}>
            <Button
              style={globalStyles.buttonPlusMinus}
              transparent
              onPress={() => increase(item.listId, item.itemId, item.quantity)}
            >
              <Text>+</Text>
            </Button>
            <Button
              style={globalStyles.buttonPlusMinus}
              transparent
              onPress={() => decrease(item.listId, item.itemId, item.quantity)}
            >
              <Text>-</Text>
            </Button>
            <Button
              style={globalStyles.buttonPlusMinus}
              transparent
              onPress={() => deleteItem(item.listId, item.itemId)}
            >
              <Text>x</Text>
            </Button>
          </Right>
        ) : (
          <Right style={{ width: "35%" }}>
            <Button
              style={globalStyles.buttonPlusMinus}
              transparent
              onPress={() => alert("You cant update other people's item")}
            >
              <Text>+</Text>
            </Button>
            <Button
              style={globalStyles.buttonPlusMinus}
              transparent
              onPress={() => alert("You cant update other people's item")}
            >
              <Text>-</Text>
            </Button>
            <Button
              style={globalStyles.buttonPlusMinus}
              transparent
              onPress={() => alert("You cant delete other people's item")}
            >
              <Text>x</Text>
            </Button>
          </Right>
        )}
      </ListItem>
    );
  };

  return (
    <Container>
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <View style={globalStyles.backgroundBox}>
          <View style={{ flex: 5 }}>
            {listHousehold.length > 0 ? (
              <SafeAreaView>
                <FlatList data={listHousehold} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
              </SafeAreaView>
            ) : (
              <SafeAreaView
                style={{
                  marginTop: 30,
                  backgroundColor: "white",
                  height: "80%",
                  width: "95%",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              >
                <FlatList data={["sample"]} renderItem={renderSample} keyExtractor={(item) => item} />
              </SafeAreaView>
            )}
          </View>
          <View style={{ flex: 1, marginTop: "5%" }}>
            <TouchableOpacity
              onPress={() => Actions.AddNewItemHousehold({ listId: listId, userId: userId })}
              title="Add New Item"
            >
              <Text style={globalStyles.button}>Add New Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Container>
  );
}
