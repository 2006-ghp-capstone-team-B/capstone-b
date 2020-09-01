import React from "react";
import { Text, Icon, Body, Right, Button, ListItem, Left, } from 'native-base';
import { Actions } from "react-native-router-flux";
import { globalStyles } from "../../styles/globalStyles";


export default function HouseholdButton(props) {
  const { listId } = props.household
  const { listName } = props.household.list
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
        <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => Actions['ListSingleHousehold']({ listId: listId })}>
          <Text>List</Text>
        </Button>
        <Button style={globalStyles.buttonPlusMinus} transparent onPress={() => Actions['HouseholdProfile']()}>
          <Text>Members</Text>
        </Button>
      </Right>
    </ListItem>
  )
}
