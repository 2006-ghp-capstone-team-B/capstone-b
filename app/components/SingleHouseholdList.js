import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import {getListHousehold} from "../store/listHousehold"



export default function SingleHouseholdList(props) {

  const renderItem = ({ item }) => {
    return (
    <View style={{backgroundColor: 'white', width: '80%', alignSelf: 'center', margin: '5%', borderWidth: 1,
    borderColor: "grey",
    borderRadius: 6, padding: '2%', flexDirection: 'row'}}>
      <View style={{flex:3, marginLeft: '5%'}}>
        <Text >{item.item.itemName}</Text>
        <Text >Quantity: {item.quantity}</Text>
        <Text >Contributor: {item.userId}</Text>
      </View>
      <View style={{flex:1}}>
        <TouchableOpacity style={{ width: '80%', alignSelf: 'center', margin: '5%'}} onPress={() => {console.log('I PRESSED ADD')}}>
          <Text >+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '80%', alignSelf: 'center', margin: '5%'}} onPress={() => {console.log('I PRESSED SUBTRACT')}}>
          <Text >-</Text>
        </TouchableOpacity>
      </View>
    </View>
    // ADD COMPONENT TO ADD NEW ITEM HERE
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
            <SafeAreaView style={{ marginTop: 30, backgroundColor: 'white', height: '90%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
              <FlatList data={listHousehold} renderItem={renderItem} keyExtractor={(item, idx) => idx} />
            </SafeAreaView>
        </View>
        : <View style={{ marginTop: 30, backgroundColor: 'rbga(255,0,0,0.5)', height: '90%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
          <Text>YOUR LIST IS EMPTY</Text>
        </View>
        }
      </ImageBackground>
    );
}
