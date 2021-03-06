import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapInput from "../components/MapInput";
import MyMapView from "../components/MyMapView";
import NewStorePref from "../components/NewStorePref";
import ListStorePrefs from "../components/ListStorePrefs";
import { getLocation, geocodeLocationByName } from "../components/services";
import { connect } from "react-redux";
import { fetchStorePrefs, createNewPref, deleteStoreThunk } from "../store/storePrefs";

class MapContainer extends React.Component {
  constructor() {
    super();
    this.addNewPreference = this.addNewPreference.bind(this);
  }
  state = {
    region: {},
    name: "",
    address: "",
    category: "",
  };

  componentDidMount() {
    this.getInitialState();
    this.props.loadStorePrefs(this.props.singleUser.id);
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
      name,
      address,
      category,
    });
  }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  addNewPreference(newPref) {
    return async (newPref) => {
      await this.props.addNewPref(this.props.singleUser.id, newPref);
      await this.props.loadStorePrefs(this.props.singleUser.id);
      this.setState({ name: "", address: "", category: "" });
    };
  }

  render() {
    const newPref = {
      name: this.state.name,
      category: this.state.category,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    };
    return (
      <View style={styles.container}>

        {this.state.region.latitude ? (
          <View style={{ width: "100%", height: "100%", flexDirection: "column" }}>
            {/* This is the map area */}
            <View style={{ width: "100%", height: "100%", flex: 1 }}>
              <MyMapView region={this.state.region} onRegionChange={(reg) => this.onMapRegionChange(reg)} />
            </View>
            {/* This is the new store to be added to preferences */}
            <View style={{ width: "100%", height: "100%", flex: 1 }}>
              {this.state.name !== "" ? (
                <View>
                  <NewStorePref
                    name={this.state.name}
                    address={this.state.address}
                    category={this.state.category}
                    latitude={this.state.region.latitude}
                    longitude={this.state.region.longitude}
                    addNewPreference={this.addNewPreference(newPref)}
                  />
                </View>
              )
                : null
              }
              {/* These are the saved favorite stores */}
              <View styles={{ flex: 1, marginTop: "2.5%" }}>
                <ListStorePrefs />
              </View>
            </View>
          </View>
        ) : null}

        {/* This is the input bar */}
        <View style={styles.searchBar}>
          <MapInput
            notifyChange={(loc, name, address, category) => this.getCoordsFromName(loc, name, address, category)}
          />
        </View>
      </View>
    );
  }
}
const mapState = (state) => {
  return {
    singleUser: state.singleUser,
    storePrefs: state.storePrefs,
  };
};

const mapDispatch = (dispatch) => ({
  loadStorePrefs: (user) => dispatch(fetchStorePrefs(user)),
  addNewPref: (userId, newPref) => dispatch(createNewPref(userId, newPref)),
  deleteOldPref: (userId, storeId) => dispatch(deleteStoreThunk(userId, storeId)),
});

export default connect(mapState, mapDispatch)(MapContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBar: {
    width: "90%",
    position: "absolute",
    top: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
    borderWidth: 4,
    borderColor: "#1BB49D",
    borderRadius: 6,
    backgroundColor: "white",
  }
});
