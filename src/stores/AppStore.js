import { register } from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _stack = [];

let _expression = '';
let _result = '';

const _addToStack = message => _stack.push({ message });

const _clearStack = () => { _stack = []; };

const _clearExpression = () => { _expression = ''; };

const _clearResult = () => { _result = ''; };

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

const _setExpression = expression => { _expression = expression; };

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
  emitChange(){
    this.emit( CHANGE_EVENT )
  },

  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getStack() {
    return _stack;
  },

  getExpression() {
    return _expression;
  },

  getResult() {
    return _result;
  },

  dispatcherIndex: register(action => {
    switch (action.actionType) {
      case AppConstants.CLEAR:
        _clearStack();
        _clearExpression();
        _clearResult();
        break;

      case AppConstants.INTERPRET:
        _interpretExpression();
        break;

      case AppConstants.PUT_EXPRESSION:
        _setExpression(action.expression);
        break;

      case AppConstants.PUT_STACK:
        _addToStack(action.message);
        break;

      case AppConstants.VALIDATE:
        _validateExpression();
        break;

      default:
        break;
    }

    AppStore.emitChange();
  }),
});

export default AppStore;
