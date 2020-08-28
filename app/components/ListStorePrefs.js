import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStorePrefs } from "../store/storePrefs";

export default function ListStorePrefs() {

  return (
    <View style={{alignItems: "center"}}>
      <Text> Hello From ListStorePRefs</Text>
      <Text> Hello From ListStorePRefs</Text>
      <Text> Hello From ListStorePRefs</Text>
      <Text> Hello From ListStorePRefs</Text>
      <Text> Hello From ListStorePRefs</Text>
      <Text> Hello From ListStorePRefs</Text>
    </View>
  );
}
