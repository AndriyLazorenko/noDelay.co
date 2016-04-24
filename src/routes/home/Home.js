/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import DelaySearch from '../../components/DelaySearch/DelaySearch'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

function Home({ news, airports }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <DelaySearch />
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
      </div>
    </div>
  );
}

Home.propTypes = {
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   contentSnippet: PropTypes.string,
  // })).isRequired,
  airports: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
  })).isRequired,
};

export default withStyles(Home, s);
