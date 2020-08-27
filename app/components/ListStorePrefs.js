import React, { useEffect } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import { fetchStorePrefs } from "../store/storePrefs";

export default function ListStorePrefs() {
  const renderStores = ({ store }) => (
    <View>
      <Text>store: {store.store.storeName}</Text>
      <Text>category: {store.category}</Text>
      <Text>address: {store.address}</Text>
    </View>
  );

  const storePrefs = useSelector((state) => state.storePrefs);
  const user = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();
  const loadStorePrefs = (userId) => {
    dispatch(fetchStorePrefs(userId));
  };

  useEffect(() => {
    loadStorePrefs(user.id);
  }, [user.id]);

  if (!user.id || !storePrefs) {
    return (
      <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
        <Text>You don't have any store saved</Text>
      </ImageBackground>
    );
  } else {
    return (
      // <ImageBackground source={require("../../assets/peas.jpg")} style={globalStyles.background}>
      //   <SafeAreaView>
      //     <FlatList data={storePrefs} renderStores={renderStores} keyExtractor={(store) => store.store.id} />
      //   </SafeAreaView>
      // </ImageBackground>
      <Text> Hello From ListStorePRefs</Text>
    );
  }
}
