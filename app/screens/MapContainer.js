import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapInput from "../components/MapInput";
import MyMapView from "../components/MyMapView";
import NewStorePref from "../components/NewStorePref";
import ListStorePrefs from "../components/ListStorePrefs";
import { getLocation, geocodeLocationByName } from "../components/services";
import { connect } from "react-redux";
import { fetchStorePrefs, createNewPref } from "../store/storePrefs";

class MapContainer extends React.Component {
  state = {
    region: {},
    name: '',
    address: '',
    category: ''
  };

  componentDidMount() {
    this.getInitialState();
    this.props.loadStorePrefs()
  }

  getInitialState() {
    getLocation().then((data) => {
      this.setState({
        region: {
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
      });
    });
  }

  getCoordsFromName(loc, name, address, category) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      name, address, category
    });
  }

  onMapRegionChange(region) {
    this.setState({ region});
  }

  async addNewPreference (newPref) {
    await createNewPref(1, newPref)
  }

  render() {
    console.log('user', this.props)
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
          <View style={{ width: "100%", height: '70%', flexDirection: 'column' }}>

            <View style={{ width: "100%", height: '100%', flex:1}}>
              <MyMapView region={this.state.region} onRegionChange={(reg) => this.onMapRegionChange(reg)} />
            </View>

            {this.state.name !== ''
            ? <View style={{width: '100%', marginTop: '5%', marginBottom: '2.5%'}}>
                <NewStorePref name={this.state.name} address={this.state.address} category={this.state.category} latitude={this.state.region.latitude} longitude={this.state.region.longitude} addNewPreference={this.addNewPreference(newPref)}/>
              </View>
            : null}

            <View styles={{flex:1, marginTop: '2.5%' }}>
              <ListStorePrefs />
            </View>

          </View>
            ) : null}

          <View style={{ width: "90%", position: 'absolute', top: 10, justifyContent: "flex-start", alignItems: 'stretch',borderWidth: 4, borderColor: 'green', borderRadius: 6, backgroundColor: 'white'}}>
            <MapInput notifyChange={(loc, name, address, category) => this.getCoordsFromName(loc, name, address, category)} />
          </View>
      </View>
    );
  }
}
const mapState = (state) => {
  console.log('state~~~~~~~~~', state)
  return ({
singleUser: state.singleUser,
})}

const mapDispatch = (dispatch) => ({
  loadStorePrefs: (user) => dispatch(fetchStorePrefs(user)),
});

export default connect(mapState, mapDispatch)(MapContainer);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
