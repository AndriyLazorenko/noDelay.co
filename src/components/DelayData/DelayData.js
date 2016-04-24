import React from 'react';
import AppStore from '../../stores/AppStore.js';
import AppAction from '../../actions/AppActions.js';
import { Row, Column, Link, Callout, Colors } from 'react-foundation';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

const getDelay = () => AppStore.getDelay();

class DelayData extends React.Component {
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
      delay: getDelay(),
    };
    return state;
  }

  _onChange() {
    this.setState(this.getState());
  }

  clearDelay() {
    AppAction.clear();
  }

  render() {
    if (this.state.delay) {
      return (
        <Callout color={Colors.PRIMARY}>
        <h1 className="{s.title}">Your delay is..</h1>
        <p>
        From <strong>{this.state.delay.from}</strong> to
        <strong> {this.state.delay.to}</strong> minutes
        with <strong>{this.state.delay.reliability}%</strong>

        </p>
        <Link
          color={Colors.WARNING}
          onClick={this.clearDelay}
        >Clear</Link>
        </Callout>
      );
    } else {
      return (false);
    }
  }
}

export default DelayData;