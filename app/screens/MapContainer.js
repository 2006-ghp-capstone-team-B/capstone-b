import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapInput from "../components/MapInput";
import MyMapView from "../components/MyMapView";
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
          <View style={{ marginTop: 350, width: '100%' }}>
            <Text>My Stores:</Text>
            <MyMapView region={this.state.region} onRegionChange={(reg) => this.onMapRegionChange(reg)} />
          </View>
        ) : null}

        <View >
          <Text>Type in the name of your favorite grocery store:</Text>
          <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />
        </View>
      </View>
    );
  }
}

export default MapContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
