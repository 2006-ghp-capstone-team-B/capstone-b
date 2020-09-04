import React from "react";
import * as Location from "expo-location";
import haversine from "haversine";
import { newLocationMessage } from "../store/notifications";
import { fetchStorePrefs } from "../store/storePrefs";
import Geofence from "react-native-expo-geofence";
import {connect} from 'react-redux'
import { RegisterBackgroundTask } from '../../background'

class BackgroundComponent extends React.Component {
  constructor () {
    super()
    this.getLocation = this.getLocation.bind(this)
    this.checkGeofence = this.checkGeofence.bind(this)
  }
  state = {
    permissionStatus: '',
    location: {}
  }

  async componentDidMount() {
    await this.props.loadStorePrefs(this.props.singleUser.id)
    this.getLocation()
    this.intervalId = setInterval(
      () => this.tick(),
      10000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    this.setState({permissionStatus: status})

    if (this.state.permissionStatus !== 'granted') {
      this.props.sendLocationMessage(this.props.singleUser.id)
    }
    else {
      let currentLocation = await Location.getCurrentPositionAsync({});
      this.setState({location: currentLocation.coords});
    }
  }

  tick() {
    this.checkGeofence()
  }

  checkGeofence = async () => {
    if(this.props.storePrefs && this.state.location !== {}) {

      const maxDistanceInKM = 1;
      const startPoint = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
      };

      const storePrefCoords = await this.props.storePrefs.map(store => {
        return {
          latitude: store.store.latitude,
          longitude: store.store.longitude,
          title: store.store.storeName
        }
      })

      const result = await Geofence.filterByProximity(startPoint, storePrefCoords, maxDistanceInKM);

      const title = `Reminder, you are passing ${result[0].title}`
      const body = `You have X items to pick up`

      RegisterBackgroundTask('hello', 'goodbye')
      // await createNotification(title, body)

    }
  }

  render () {
    return (null);
  }
}

const MapState = (state) => ({
  singleUser: state.singleUser,
  storePrefs: state.storePrefs
})

const mapDispatch = (dispatch) => ({
  loadStorePrefs: (userId) => { dispatch(fetchStorePrefs(userId)) },
  sendLocationMessage: (userId) => dispatch(newLocationMessage(userId))
});

export default connect(MapState, mapDispatch)(BackgroundComponent);
