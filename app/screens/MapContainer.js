import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapInput from "../components/MapInput";
import MyMapView from "../components/MyMapView";
import ListStorePrefs from "../components/ListStorePrefs";
import { getLocation, geocodeLocationByName } from "../components/services";

class MapContainer extends React.Component {
  state = {
    region: {},
  };

  componentDidMount() {
    this.getInitialState();
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

  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
    });
  }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
          <View style={{ marginTop: 200, width: "100%" }}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <MyMapView region={this.state.region} onRegionChange={(reg) => this.onMapRegionChange(reg)} />

              <Text> Place holder for ListStorePrefs</Text>

              <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default MapContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
