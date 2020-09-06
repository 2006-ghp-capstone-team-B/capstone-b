import React, { useEffect } from "react";
import { View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import { getListHousehold, increaseItemQuantity, decreaseItemQuantity, deleteSingleItem } from "../store/listHousehold";
import {
  Text,
  Icon,
  Body,
  Right,
  Button,
  ListItem,
  Card,
  Left,
  Container,
  List,
  Content,
  Separator,
} from "native-base";
import { Actions } from "react-native-router-flux";

export default function SingleHouseholdList(props) {
  const { listId, userId } = props;
  const listHousehold = useSelector((state) => state.listHousehold);
  const me = useSelector((state) => state.singleUser);

  const dispatch = useDispatch();
  const loadHouseholdList = (id) => {
    dispatch(getListHousehold(id));
  };
  const increase = (itemId, listId, userId) => {
    dispatch(increaseItemQuantity(itemId, listId, userId));
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

  let reformattedList = Object.entries(
    listHousehold.reduce((accum, item) => {
      const { id, itemName } = item.item;
      const { id: userId, firstName } = item.user;
      const { paid, purchased, quantity } = item;

      if (accum[itemName]) {
        const addUser = { userId, firstName, quantity, paid, purchased };
        accum[itemName].users.push(addUser);
      } else {
        accum[itemName] = {
          users: [{ userId, firstName, quantity, paid, purchased }],
          itemId: id,
        };
      }
      return accum;
    }, {})
  );

  const navigate = (screen) => {
    Actions[screen]();
  };

  const renderItem = ({ item }) => {
    const itemName = item[0];
    const itemId = item[1].itemId;

    return (
      <View>
        <ListItem itemHeader noBorder noIndent>
          <Body style={{ flex: 2 }}>
            <Text numberOfLines={1}>{itemName}</Text>
          </Body>
          <Right style={{ flex: 1, flexDirection: "row" }}>
            <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => increase(itemId, listId, me.id)}>
              <Text>+</Text>
            </Button>
            <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => decrease(listId, itemId, quantity)}>
              <Text>-</Text>
            </Button>
            <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => deleteItem(listId, itemId)}>
              <Text>x</Text>
            </Button>
          </Right>
        </ListItem>

        {item[1].users.map((user, idx) => {
          return (
            <ListItem key={idx} noBorder noIndent>
              <Text note>
                {user.firstName} | Quantity: {user.quantity}
              </Text>
            </ListItem>
          );
        })}
      </View>
    );
  };

  return (
    <Container>
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <View style={globalStyles.backgroundBox}>
          <View style={{ flex: 5 }}>
            <List>
              {reformattedList ? (
                <SafeAreaView>
                  <FlatList
                    data={reformattedList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item[1].itemId.toString()}
                  />
                </SafeAreaView>
              ) : null}
            </List>
          </View>
          <View style={{ flex: 1, marginTop: "5%", marginBottom: "5%" }}>
            <TouchableOpacity
              onPress={() => Actions.AddNewItemHousehold({ listId: listId, userId: userId })}
              title="Add New Item"
            >
              <Text style={globalStyles.button}>Add New Item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.CheckOffList({ reformattedList })} title="CheckOffList">
              <Text style={globalStyles.button}>Check Off Items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Container>
  );
}
