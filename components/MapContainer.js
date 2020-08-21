import React from "react";
import { View } from "react-native";
import MapInput from "./MapInput";
import MyMapView from "./MyMapView";
import { getLocation, geocodeLocationByName } from "./services";

class MapContainer extends React.Component {
  state = {
    region: {},
  };

  componentDidMount() {
    this.getInitialState();
    console.log(this.state, "state in didmount");
  }

  getInitialState() {
    getLocation().then((data) => {
      console.log("data from getInitial State", data);

      this.setState({
        region: {
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
      });

      console.log(this.state, "state after setting");
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />
        </View>

        {this.state.region.latitude ? (
          <View style={{ flex: 1 }}>
            {/* <MyMapView region={this.state.region} onRegionChange={(reg) => this.onMapRegionChange(reg)} /> */}
            <MyMapView region={this.state.region} />
          </View>
        ) : null}
      </View>
    );
  }
}

export default MapContainer;
