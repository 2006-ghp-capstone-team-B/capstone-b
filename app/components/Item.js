// import React , {useState} from "react";
// import { Text, Icon, Body, Right, Button, ListItem, Card, View, Left, T } from 'native-base';
// import {StyleSheet} from 'react-native'
// import { Actions } from "react-native-router-flux";
// import { useDispatch } from "react-redux";
// import { increaseItemQuantity, decreaseItemQuantity } from "../store/item";

// export default function Item(props) {


//   const {itemName} = props.item.item
//   const {quantity, listId, userId, itemId} = props.item
//   const dispatch = useDispatch()
//   const increase = (listId, itemId, quantity) => {
//     dispatch(increaseItemQuantity(listId, itemId, quantity))
//     forceUpdate
//   }
//   const decrease = (listId, itemId, quantity) => {
//     if(quantity > 1){
//       dispatch(decreaseItemQuantity(listId, itemId, quantity))
//     }
//   }

//     return (
//       <ListItem icon>
//       <Left />
//       <Body>
//         <Text numberOfLines={1}>{itemName}</Text>
//         <Text note numberOfLines={1}>Quantity: {quantity}</Text>
//       </Body>
//       <Right style={{ width: "35%" }}>
//         <Button style={styles.button} transparent onPress={() => increase(listId, itemId, quantity)}>
//           <Text>+</Text>
//         </Button>
//         <Button style={styles.button} transparent onPress={() => decrease(listId, itemId, quantity)}>
//           <Text>-</Text>
//         </Button>
//         <Button style={styles.button} transparent onPress={() => console.log("DELETE ITEM")}>
//           <Text>x</Text>
//         </Button>
//       </Right>
//     </ListItem>
//     )
// }


// var styles = StyleSheet.create({
//   button: {
//     marginHorizontal: '-5%'
//   }
// })
