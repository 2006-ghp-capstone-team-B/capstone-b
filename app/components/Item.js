import React from "react";
import { Text, Icon, Body, Right, Button, ListItem, Card, View, Left, T } from 'native-base';
import {StyleSheet} from 'react-native'
import { Actions } from "react-native-router-flux";


export default function Item(props) {
console.log('AAA', props)
const {itemName} = props.item.item
const {quantity, userId} = props.item
    return (
      <ListItem icon>
      <Left />
      <Body>
        <Text numberOfLines={1}>{itemName}</Text>
        <Text note numberOfLines={1}>Quantity: {quantity}</Text>
      </Body>
      <Right style={{ width: "35%" }}>
        <Button style={styles.button} transparent onPress={() => console.log('ADD')}>
          <Text>+</Text>
        </Button>
        <Button style={styles.button} transparent onPress={() => console.log("SUBTRACT")}>
          <Text>-</Text>
        </Button>
      </Right>
    </ListItem>
    )
}


var styles = StyleSheet.create({
  button: {
    marginHorizontal: '-5%'
  }
})
