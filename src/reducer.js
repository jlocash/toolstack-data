import { combineReducers } from 'redux';
import websocketReducer from './websocket/reducer';
import dbusReducer from './dbus/reducer';

const rootReducer = combineReducers({
  dbus: dbusReducer,
  websocket: websocketReducer,
});

export default rootReducer;
