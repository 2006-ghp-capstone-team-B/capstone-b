import React from "react";
import MapView, {Marker} from "react-native-maps";
const MyMapView = (props) => {
  console.log( "~~~~~~~my map view props~~~~~~~", props);
  return (
      <MapView
        region={props.region}
        showsUserLocation={true}
        onRegionChange={(reg) => props.onRegionChange(reg)}
      >
        <Marker coordinate={props.region} />
      </MapView>
  );
};
export default MyMapView;
