import React from 'react';
import AppStore from '../../stores/AppStore.js';
import { Row, Column, Link, Callout, Colors } from 'react-foundation';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

const getAirports = () => AppStore.getAirports();
const getFrom = () => AppStore.getFrom();
const getTo = () => AppStore.getTo();

class Map extends React.Component {
  constructor() {
    super();
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  getState() {
    const state = {
      airports: getAirports(),
      from: getFrom(),
      to: getTo(),
    };
    return state;
  }

  _onChange() {
    this.setState(this.getState());
  }

  render() {
    const airports = this.state.airports.filter(airport =>
      airport.name === this.state.from ||
      airport.name === this.state.to
    );
    return (
      <Callout>
        <h1 className="{s.title}">Map</h1>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: '60vw',
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => console.log(map)}
              defaultZoom={4}
              defaultCenter={{ lat: 39.833333, lng: -98.583333 }}
            >
              {airports.map(marker => (
                <Marker
                  position={{ lat: marker.lat, lng: marker.lon }}
                  title={ marker.name }
                />
              ))}
            </GoogleMap>
          }
        />
      </Callout>
    );
  }
}

export default Map;