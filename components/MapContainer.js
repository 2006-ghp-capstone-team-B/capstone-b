import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapInput from "./MapInput";
import MyMapView from "./MyMapView";
import { getLocation, geocodeLocationByName } from "./services";

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
        <View style={{ flex: 1 }}>
          <Text >MAP INPUT GOES HERE       .</Text>
          <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />
        </View>

        {this.state.region.latitude ? (
          <View style={{ flex: 1 }}>
            <Text >MAP VIEW GOES HERE       .</Text>
            <MyMapView region={this.state.region} onRegionChange={(reg) => this.onMapRegionChange(reg)} />
          </View>
        ) : null}
      </View>
    );
  }
}

export default MapContainer;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 700,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
