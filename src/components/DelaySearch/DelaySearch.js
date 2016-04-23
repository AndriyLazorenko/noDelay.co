import React from 'react';
import AppStore from '../../stores/AppStore.js';
import AppAction from '../../actions/AppActions.js';
import Autosuggest from 'react-autosuggest';

const getState = () => {
  return {
    airports: AppStore.getAirports(),
    from: AppStore.getFrom(),
    to: AppStore.getTo(),
  };
}

const getAirports = () => AppStore.getAirports();
const getFrom = () => AppStore.getFrom();
const getTo = () => AppStore.getTo();

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : getState().airports.filter(airport =>
    airport.name.toLowerCase().slice(0, inputLength) === inputValue ||
    airport.iata.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
};

const renderSuggestion = suggestion => {
  return (
    <span>{suggestion.name}</span>
  );
};

class DelaySearch extends React.Component {
  constructor() {
    super();
    this.state = {
      airports: getAirports(),
      from: getFrom(),
      to: getTo(),
      suggestionsTo: getSuggestions(getTo()),
      suggestionsFrom: getSuggestions(getFrom()),
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  getState() {
    this.state = {
      airports: getAirports(),
      from: getFrom(),
      to: getTo(),
      suggestionsTo: getSuggestions(getTo()),
      suggestionsFrom: getSuggestions(getFrom()),
    };
  }

  _onChange() {
    this.setState(this.getState());
  }

  render() {
    return (
      <Autosuggest suggestions={suggestions}
         onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
         getSuggestionValue={getSuggestionValue}
         renderSuggestion={renderSuggestion}
         inputProps={inputProps} />
    );
  }
}

export default DelaySearch;