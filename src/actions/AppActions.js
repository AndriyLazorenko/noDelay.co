import AppConstants from '../constants/AppConstants';
import { dispatch } from '../dispatchers/AppDispatcher';

export default {
  clear() {
    dispatch({
      actionType: AppConstants.CLEAR,
    });
  },
  selectFrom(airport) {
    dispatch({
      actionType: AppConstants.SELECT_FROM, airport,
    });
  },
  selectTo(airport) {
    dispatch({
      actionType: AppConstants.SELECT_TO, airport,
    });
  },
  setDatetime(datetime) {
    dispatch({
      actionType: AppConstants.SET_DATETIME, datetime,
    });
  },
  loadDelay() {
    dispatch({
      actionType: AppConstants.LOAD_DELAY,
    });
  },
};
