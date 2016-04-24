import { register } from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';
import fetch from '../core/fetch';

const CHANGE_EVENT = 'change';

let _airports = '';
let _from = '';
let _to = '';
let _datetime = '';
let _delay = '';

const _clearFrom = () => { _from = ''; };
const _clearTo = () => { _to = ''; };
const _clearDatetime = () => { _datetime = ''; };
const _clearDelay = () => { _delay = ''; };

const _getAirports = () => _airports;
const _getDelay = () => {
  if (!_from || !_to || !_datetime) {
    return;
  }
  const delays = [
    {
      from: '0',
      to: '15 minutes',
    },
    {
      from: '15',
      to: '30 minutes',
    },
    {
      from: '30 minutes',
      to: '1 hour',
    },
    {
      from: '1',
      to: '6 hours',
    },
    {
      from: '6',
      to: '24 hours',
    },
  ];
  const myDelay = delays[parseInt(Math.random() * 4)];
  _delay = {
    from: myDelay.from,
    to: myDelay.to,
    reliability: parseInt(Math.random() * 29 + 21),
  };
};

const _setAirports = () => {
  const airportsData = fetch('/airports.json').then(function(res) {
		return res.json();
	}).then(function(json) {
		_airports = json;
	});
};
_setAirports();
const _setFrom = from => { _from = from; };
const _setTo = to => { _to = to; };
const _setDelay = delay => { _delay = delay; };
const _setDatetime = datetime => { _datetime = datetime; };

const _interpretExpression = (expression) => {
  try {
    expression = _validateExpression(expression);
    _addToStack('Interpreting started...');
    expression = new Interpreter(expression[0]);
    let values = '';
    expression.values.map(value => {
      values += `${value}\n`;
      return values;
    });
    _result = values;
    _addToStack('Interpreting finished.');
  } catch (e) {
    _addToStack(`${e.name}: ${e.message}`);
  }
};

const _validateExpression = (expression) => {
  try {
    _addToStack('Validation started...');
    expression = new Lexer(_expression);
    expression = new Validator(expression);
    if (expression.error) {
      _addToStack(expression.error);
      return;
    }
    expression.map(item => _addToStack(item.type + ':' + item.value));
    expression = new TreeBuilder(expression);
    return expression;
  } catch (e) {
    _addToStack(e.name + ':' + e.message);
  }
}

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAirports() {
    return _airports;
  },

  getFrom() {
    return _from;
  },

  getTo() {
    return _to;
  },

  getDatetime() {
    return _datetime;
  },

  getDelay() {
    return _delay;
  },

  dispatcherIndex: register(action => {
    switch (action.actionType) {
      case AppConstants.CLEAR:
        _clearFrom();
        _clearTo();
        _clearDatetime();
        _clearDelay();
        break;

      case AppConstants.LOAD_AIRPORTS:
        _getAirports();
        break;

      case AppConstants.LOAD_DELAY:
        _getDelay();
        break;

      case AppConstants.SELECT_FROM:
        _setFrom(action.airport);
        break;

      case AppConstants.SELECT_TO:
        _setTo(action.airport);
        break;

      case AppConstants.SET_DATETIME:
        _setDatetime(action.datetime);
        break;

      default:
        break;
    }

    AppStore.emitChange();
  }),
});

export default AppStore;
