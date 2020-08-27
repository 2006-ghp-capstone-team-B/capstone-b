import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListHousehold } from "../store/listHousehold";
import { globalStyles } from "../../styles/globalStyles";

export default function ListHousehold() {
  const renderItem = ({ item }) => (
    <View>
      <Text>Item: {item.item.itemName}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Added by:{item.userName}</Text>
    </View>
  );

  const listHousehold = useSelector((state) => state.listHousehold);
  const user = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();
  const loadListHousehold = (userId) => {
    dispatch(getListHousehold(userId));
  };

  useEffect(() => {
    loadListHousehold(user.id);
  }, [user.id]);

  if (!user.id || !listHousehold) {
    return (
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <Text>You don't have a household list</Text>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <SafeAreaView>
          <FlatList data={listHousehold} renderItem={renderItem} keyExtractor={(item) => item.item.id} />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
