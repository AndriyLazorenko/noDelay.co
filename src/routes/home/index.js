/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export const path = '/';
export const action = async (state) => {
  const response = await fetch('/graphql?query={news{title,link,contentSnippet}}');
  const { data } = await response.json();
  // var airports;
  // const airportsData = await fetch('/airports.json').then(function(res) {
	// 	return res.text();
	// }).then(function(body) {
	// 	console.log(body);
	// });
  const airportsData = await fetch('/airports.json');
  const airports = await airportsData.json();
  state.context.onSetTitle('React.js Starter Kit');
  return <Home news={data.news} airports={airports} />;
};
