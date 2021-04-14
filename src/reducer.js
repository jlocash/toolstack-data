import { combineReducers } from 'redux';
import dbusReducer from './dbus/reducer';

const rootReducer = combineReducers({
  dbus: dbusReducer,
});

export default rootReducer;
