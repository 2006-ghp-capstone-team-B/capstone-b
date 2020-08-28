import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import {getListHousehold} from "../store/listHousehold"



export default function SingleHouseholdList(props) {

  const renderItem = ({ item }) => {
    return (
    <View style={{backgroundColor: 'white', width: '80%', alignSelf: 'center', margin: '5%'}}>
        <Text >{item.item.itemName}</Text>
        <Text >Quantity: {item.quantity}</Text>
        <Text >Contributor: {item.userId}</Text>
        <TouchableOpacity style={{backgroundColor: 'green', width: '80%', alignSelf: 'center', margin: '5%'}} onPress={() => {console.log('I PRESSED ADD')}}>
        <Text >+</Text>
    </TouchableOpacity>
    </View>
  )};

  const {householdId} = props
  const listHousehold = useSelector((state) => state.listHousehold);
  const user = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();
  const loadHouseholdList = (id) => {
    dispatch(getListHousehold(id));
  };

  useEffect(() => {
      loadHouseholdList(householdId);
    }, [householdId]);

    return (
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        {listHousehold && user
        ? <View>
            <SafeAreaView>
              <FlatList data={listHousehold} renderItem={renderItem} keyExtractor={(item, idx) => idx} />
            </SafeAreaView>
        </View>
        : <View>
          <Text>YOUR LIST IS EMPTY</Text>
        </View>
        }
      </ImageBackground>
    );
}
