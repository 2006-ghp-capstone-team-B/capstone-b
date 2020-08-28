import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStorePrefs } from "../store/storePrefs";
import { connect } from "formik";

export default function ListStorePrefs(props) {
  // storePrefs is an array of preferred stores.

  const dispatch = useDispatch();
  const storePrefs = useSelector((state) => state.storePrefs);
  const user = useSelector((state) => state.singleUser);
  const getUpdatedStores = (userId) => {
    dispatch(fetchStorePrefs(userId));
  };
  console.log("storePrefs", storePrefs);

  useEffect(() => {
    getUpdatedStores(user.id);
  }, [user.id]);

  const renderItem = ({ item }) => (
    <View>{item.store !== undefined ? <Text>Store: {item.store.storeName}</Text> : null}</View>
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
