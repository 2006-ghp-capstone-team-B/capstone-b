import React from "react";
// import { MapView } from "expo";
import MapView from "react-native-maps";
// import MapView, { Marker } from "expo";
import { View } from "react-native";
const MyMapView = (props) => {
  console.log(props, "my map view props");
  return (
    <View>
      <MapView
        style={{ flex: 1 }}
        region={props.region}
        showsUserLocation={true}
        onRegionChange={(reg) => props.onRegionChange(reg)}
      >
        {/* <Marker coordinate={props.region} /> */}
      </MapView>
    </View>
  );
};
export default MyMapView;
