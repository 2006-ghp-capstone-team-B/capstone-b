import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { Image } from "react-native";

const MyMapView = (props) => {
  

  const storePrefs = useSelector((state) => state.storePrefs);

  
  return (
    <MapView
      region={props.region}
      showsUserLocation={true}
      onRegionChange={(reg) => props.onRegionChange(reg)}
      style={{ height: '100%', width: '100%' }}
      provider={PROVIDER_GOOGLE}
    >
      <Marker coordinate={props.region} />
      {
        storePrefs.length 
        ? 
        storePrefs.map( (store) => {return (
                <Marker key={store.storeId} coordinate={{"latitude": Number(store.store.latitude), "longitude": Number(store.store.longitude)}} >
                  <Image source={require('../../public/heart_marker.png')} style={{height: 45, width:45 }} />
                </Marker>
                )
          }) 
        :
        null
      }
      
    </MapView>
  );
};
export default MyMapView;


