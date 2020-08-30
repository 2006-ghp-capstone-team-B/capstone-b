import React from "react";
import { Text, Icon, Body, Right, Button, ListItem, Card, View, Left, T } from 'native-base';
import {StyleSheet} from 'react-native'
import { Actions } from "react-native-router-flux";


export default function HouseholdButton(props) {
  const {listId, listName} = props.household
  console.log('listy:', listId)
    return (
      <ListItem icon>
      <Left>
        <Button style={{ backgroundColor: "green" }}>
          <Icon active name="home" />
        </Button>
      </Left>
      <Body>
        <Text>{listName}</Text>
    <Text note numberOfLines={1}>Household Id: {listId}</Text>
      </Body>
      <Right style={{ width: "35%" }}>
        {/* Button displays ability to accept or reject request */}
        <Button style={styles.button} transparent onPress={() => Actions['ListSingleHousehold']({listId: listId})}>
          <Text>List</Text>
        </Button>
        <Button style={styles.button} transparent onPress={() => Actions['Members']()}>
          <Text>Members</Text>
        </Button>
      </Right>
    </ListItem>
    )
}


var styles = StyleSheet.create({
  button: {
    marginHorizontal: '-10%'
  }
})
