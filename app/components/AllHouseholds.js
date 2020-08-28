import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import {getAllHouseholds} from "../store/households"
import { Actions } from "react-native-router-flux";

export default function AllHouseholds() {


  const renderItem = ({ item }) => (
    <TouchableOpacity style={{backgroundColor: 'white', width: '80%', alignSelf: 'center', margin: '5%', borderWidth: 1,
    borderColor: "grey",
    borderRadius: 6, padding: '2%'}} onPress={() => Actions.SingleHouseholdList({householdId: item.listId})}>
        <Text >Household: {item.listName}</Text>
        <Text >House ID: {item.listId}</Text>
    </TouchableOpacity>
  );

  const allHouseholds = useSelector((state) => state.households);
  const user = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();
  const loadHouseholds = (userId) => {
    dispatch(getAllHouseholds(userId));
  };

  useEffect(() => {
      loadHouseholds(user.id);
    }, [user]);

    return (
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>

        {!user.id
        ? <View style={{ marginTop: 30, backgroundColor: 'rbga(255,0,0,0.5)', height: '90%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
          <Text>You don't have any households saved</Text>
        </View>
      : <SafeAreaView style={{ marginTop: 30, backgroundColor: 'white', height: '90%', width: '95%', alignSelf: 'center', borderRadius: 25 }}>
          <FlatList data={allHouseholds} renderItem={renderItem} keyExtractor={(item, idx) => idx} />
        </SafeAreaView>
      }
      </ImageBackground>
    );
}
