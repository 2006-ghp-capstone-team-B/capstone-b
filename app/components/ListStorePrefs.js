import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStorePrefs } from "../store/storePrefs";

export default function ListStorePrefs(props) {
  // storePrefs is an array of preferred stores.
  const storePrefs = props.storePrefs;
  const renderItem = ({ item }) => (
    <View>
      <Text>Store: {item.store.storeName}</Text>
    </View>
  );

  return (
    <View>
      {storePrefs !== undefined && storePrefs.length !== 0 ? (
        <SafeAreaView style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <FlatList data={storePrefs} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </SafeAreaView>
      ) : (
        <Text> No Stores Saved!</Text>
      )}
    </View>
  );
}
