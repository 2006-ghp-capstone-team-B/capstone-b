import React from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
const MyMapView = (props) => {
  console.log( "~~~~~~~my map view props~~~~~~~", props);
  return (
      <MapView
        region={props.region}
        showsUserLocation={true}
        onRegionChange={(reg) => props.onRegionChange(reg)}
        style={{height: '50%',
      width: '100%'}}
      provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={props.region} />
      </MapView>
  );
};
export default MyMapView;
