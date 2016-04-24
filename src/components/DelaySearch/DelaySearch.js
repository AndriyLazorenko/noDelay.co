import React from 'react';
import AppStore from '../../stores/AppStore.js';
import AppAction from '../../actions/AppActions.js';
import { Row, Column } from 'react-foundation';
import Autosuggest from 'react-autosuggest';

const getAirports = () => AppStore.getAirports();
const getFrom = () => AppStore.getFrom();
const getTo = () => AppStore.getTo();

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : getAirports().filter(airport =>
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
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
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
      suggestionsTo: getSuggestions(getTo()),
      suggestionsFrom: getSuggestions(getFrom()),
    };
    return state;
  }

  _onChange() {
    this.setState(this.getState());
  }

  handleChangeTo(event, newValue) {
    AppAction.selectTo(newValue.newValue);
  }

  handleChangeFrom(event, newValue) {
    AppAction.selectFrom(newValue.newValue);
  }

  render() {
    const suggestionsTo = this.state.suggestionsTo;
    const inputPropsFrom = {
      placeholder: 'Type departure airport name or code',
      value: this.state.from,
      onChange: this.handleChangeFrom,
    };
    const suggestionsFrom = this.state.suggestionsFrom;
    const inputPropsTo = {
      placeholder: 'Type destination airport name or code',
      value: this.state.to,
      onChange: this.handleChangeTo,
    };
    return (
      <div className="search-grid">
        <Row className="display">
          <Column medium={6} large={6}>
            <Autosuggest suggestions={suggestionsFrom}
              onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputPropsFrom}
            />
          </Column>
          <Column medium={6} large={6}>
            <Autosuggest suggestions={suggestionsTo}
              onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputPropsTo}
            />
          </Column>
        </Row>
      </div>
    );
  }
}

export default DelaySearch;