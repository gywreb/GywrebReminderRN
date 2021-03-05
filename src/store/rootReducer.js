import { combineReducers } from 'redux';
import remindersReducer from './remiders/reminders.reducer';

const reducer = combineReducers({
  reminders: remindersReducer,
});

export default reducer;
