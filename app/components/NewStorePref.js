import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createNewPref } from "../store/storePrefs";
import { globalStyles } from '../../styles/globalStyles';

export default function NewStorePref (props) {
  const {name, latitude, longitude, category} = props
  const storeObj = {storeName: name, latitude, longitude, category}
  const dispatch = useDispatch();
  return (
    <View style={{alignItems: "stretch", flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
      <View style={{flex: 2, marginLeft: '5%'}}>
        <Text>Add {props.name} to your list?</Text>
        <Text>{props.address}</Text>
      </View>

      <View style={{flex:1}}>
          <TouchableOpacity onPress={() => dispatch(createNewPref(1, storeObj))} title="save">
            <Text style={{
              backgroundColor: "#6F9A88",
              color: "#fff",
              width: "50%",
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "25%",
              padding: "3%",
              fontSize: 15,
              marginTop: "5%",
              marginBottom: '5%'
              }}>Save</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}
