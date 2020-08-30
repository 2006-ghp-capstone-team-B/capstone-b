import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStorePrefs, deleteStoreThunk } from "../store/storePrefs";
import { connect } from "formik";

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
          style={{
            backgroundColor: "white",
            width: "80%",
            alignSelf: "center",
            margin: "1%",
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 6,
            padding: "2%",
            flexDirection: "row",
          }}
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
              <Text
                style={{
                  backgroundColor: "#6F9A88",
                  color: "#fff",
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginRight: "50%",
                  padding: "3%",
                  fontSize: 14,
                  marginTop: "5%",
                  marginBottom: "5%",
                }}
              >
                remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );

  console.log("ListStsorePrefs props", props);

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
