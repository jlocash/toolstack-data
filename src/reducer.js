import { combineReducers } from 'redux';
import dbusReducer from './dbus/reducers';
import websocketReducer from './websocket/reducer';

const rootReducer = combineReducers({
  dbus: dbusReducer,
  websocket: websocketReducer,
});

export default rootReducer;
