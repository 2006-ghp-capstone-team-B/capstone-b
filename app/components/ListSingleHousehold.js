import React, { useEffect } from "react";
import {View, ImageBackground, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import {getListHousehold, increaseItemQuantity, decreaseItemQuantity} from "../store/listHousehold"
import { Text, Button, Icon, Container } from 'native-base';
// import Item from './Item'

export default function SingleHouseholdList(props) {
  const renderItem = ({ item }) => {
    return (
      <View style={{backgroundColor: 'white', width: '80%', alignSelf: 'center', margin: '5%'}}>
        <Text>Item: {item.item.itemName}</Text>
        <Button style={globalStyles.button} title="+" transparent onPress={() => increase(item.listId, item.itemId, item.quantity)}>
        </Button>
        <Text>Quantity: {item.quantity}</Text>
        <Button style={globalStyles.button} title="-" transparent onPress={() => decrease(item.listId, item.itemId, item.quantity)}>
        </Button>
      </View>
  )};

  const {listId} = props
  const listHousehold = useSelector((state) => state.listHousehold);

  const dispatch = useDispatch();
  const loadHouseholdList = (id) => {
    dispatch(getListHousehold(id));
  };
  const increase = (listId, itemId, quantity) => {
    dispatch(increaseItemQuantity(listId, itemId, quantity))
  }
  const decrease = (listId, itemId, quantity) => {
    if(quantity > 1){
      dispatch(decreaseItemQuantity(listId, itemId, quantity))
    }
  }


  useEffect(() => {
      loadHouseholdList(listId);
    }, [listId]);


    return (
      <Container>
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
          <View style={styles.background}>

          <View style={{flex: 5}}>
            {listHousehold.length > 0
            ? <SafeAreaView >
                <FlatList
                  data={listHousehold}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
            : <Text>You do not currently belong to a household</Text>}
          </View>
          <View style={{flex: 1, marginTop: '5%'}}>
            <Button block iconLeft style={styles.button} onPress={()=>console.log("CREATE")}>
              <Icon name='ios-add' />
              <Text>Add New Item</Text>
            </Button>

          </View>
          </View>
    </ImageBackground>
    </Container>
    );
}

var styles = StyleSheet.create({
  buttonGroup: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1
  },
  button: {
    margin: '5%',
    backgroundColor: 'pink'
  },
  background: {
    marginVertical: 30, backgroundColor: 'white', width: '85%', flexDirection: 'column', borderRadius: 25,  justifyContent: 'space-between', flex: 1, alignSelf: 'center', paddingVertical: 10
  }
})
