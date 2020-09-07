import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStorePrefs, deleteStoreThunk } from "../store/storePrefs";
import { connect } from "formik";
import { globalStyles } from "../../styles/globalStyles";

export default function ListStorePrefs(props) {
  // storePrefs is an array of preferred stores.

  const dispatch = useDispatch();
  const storePrefs = useSelector((state) => state.storePrefs);
  const user = useSelector((state) => state.singleUser);
  const getUpdatedStores = (userId) => {
    dispatch(fetchStorePrefs(userId));
  };
  const deleteStore = (userId, storeId) => {
    dispatch(deleteStoreThunk(userId, storeId));
  };

  useEffect(() => {
    getUpdatedStores(user.id);
  }, [user.id]);

  const renderItem = ({ item }) => (
    <View>
      {item.store !== undefined ? (
        <View
          style={globalStyles.storePrefs}
        >
          <View style={{ flex: 3, marginLeft: "5%" }}>
            <Text>Store: {item.store.storeName}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                deleteStore(user.id, item.store.id);
              }}
            >
              <Text style={globalStyles.buttonRemove}>
                remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );

  return (
    <View>
      {storePrefs !== undefined && storePrefs.length !== 0 ? (
        <SafeAreaView style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <FlatList
            data={storePrefs}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      ) : (
          <Text> No Stores Saved!</Text>
        )}
    </View>
  );
}
