import React, { useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { fetchStorePrefs } from "../store/storePrefs";

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
        storePrefs.map( (store) => {return (<Marker key={store.storeId} coordinate={{"latitude": Number(store.store.latitude), "longitude": Number(store.store.longitude)}}  pinColor="green"/>)}) 
        :
        null
      }
      
    </MapView>
  );
};
export default MyMapView;
