import React from 'react';
import AppStore from '../../stores/AppStore.js';
import AppAction from '../../actions/AppActions.js';
import { Row, Column, Link, Callout, Colors } from 'react-foundation';
import Autosuggest from 'react-autosuggest';
import Datetime from 'react-datetime';

const getAirports = () => AppStore.getAirports();
const getFrom = () => AppStore.getFrom();
const getTo = () => AppStore.getTo();
const getDatetime = () => AppStore.getDatetime();

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
    <span>{suggestion.name} ({suggestion.iata})</span>
  );
};

class DelaySearch extends React.Component {
  constructor() {
    super();
    this.state = this.getState();
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
    console.log('states', getDatetime());
    const state = {
      airports: getAirports(),
      from: getFrom(),
      to: getTo(),
      datetime: getDatetime(),
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

  handleChangeDatetime(moment) {
    if (typeof moment === 'string') {
      AppAction.setDatetime(event);
    } else {
      AppAction.setDatetime(moment._d.toString());
    }
  }

  datetimeValidation(currentDate) {
    const yesterday = Datetime.moment().subtract(1, 'day');
    const in5days = Datetime.moment().subtract(-5, 'day');
    return currentDate.isAfter(yesterday) && currentDate.isBefore(in5days);
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
    const inputPropsDatetime = {
      placeholder: 'Select departing date and time'
    }
    return (
      <div className="search-grid">
        <Callout>
          <Callout color={Colors.SECONDARY}>
            So, choose your departing and destinations airports (USA only) and date
          </Callout>
          <Row className="display">
            <Column medium={6} large={4}>
              <Autosuggest suggestions={suggestionsFrom}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputPropsFrom}
                />
            </Column>
            <Column medium={6} large={4}>
              <Autosuggest suggestions={suggestionsTo}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputPropsTo}
                />
            </Column>
            <Column medium={12} large={4}>
              <Datetime
                value={this.state.datetime}
                onChange={this.handleChangeDatetime}
                isValidDate={this.datetimeValidation}
                locale="us"
                inputProps={inputPropsDatetime}
            />
            </Column>
          </Row>
          <Row className="display">
            <Column medium={12} large={12}>
              <Link isExpanded>Have I time for coffee?</Link>
            </Column>
          </Row>
        </Callout>
      </div>
    );
  }
}

export default DelaySearch;