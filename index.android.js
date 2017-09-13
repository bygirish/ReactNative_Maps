/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

export default class Maps extends Component {

  constructor(props){
    super(props);

    this.state = {
      latitude: 28.459496499999997,
      longitude: 77.0266383,
      error: null,
      name: 'India',
      address: '',
    };
  }

   openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
        this.setState({latitude: place.latitude, longitude: place.longitude, name: place.name, address: place.address});
        this.maps.animateToCoordinate( {   latitude: this.state.latitude,  longitude: this.state.longitude }, 3000 );
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {

    const markers = [
      {
        title: this.state.name,
        description : this.state.address,
        latlng: {   latitude: this.state.latitude,  longitude: this.state.longitude },
      }
    ];

    return (

      <View style = { styles.container } >

        <TouchableOpacity onPress = { () => this.openSearchModal() } >
          <Text style = {{ fontSize: 20, marginTop: 30 }}> Pick a Place </Text>
        </TouchableOpacity>

        <MapView
          ref = { (mapy) => this.maps = mapy }
          style = { styles.map }
          followsUserLocation = { true }
          showsCompass = { true }
          showsUserLocation = { true }
          showsMyLocationButton = { true }
          initialRegion = {{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          { markers.map(marker => (
            <MapView.Marker
              key = { marker.title }
              coordinate = { marker.latlng }
              title = { marker.title }
              description = { marker.description }
            />
          ))}

        </MapView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').height,
  },
  map: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
  },
});

AppRegistry.registerComponent('Maps', () => Maps);
