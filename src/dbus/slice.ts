import { combineReducers, createAction } from '@reduxjs/toolkit';
import hostReducer from './host/slice';
import vmReducer from './vm/slice';
import updateReducer from './update/slice';
import ndvmReducer from './ndvm/slice';
import batteryReducer from './battery/slice';
import { Signal } from './dbus';

export const actions = {
  signalReceived: createAction<{ signal: Signal }>('dbus/signalReceived'),
  errorReceived: createAction<{ err: Event }>('dbus/errorReceived'),
  connectionError: createAction<{ err: unknown }>('dbus/connectionError'),
  connectionEstablished: createAction<{ url: string }>('dbus/connectionEstablished'),
  signalsRegistered: createAction<{ interface: string }>('dbus/signalsRegistered'),
};

export default combineReducers({
  host: hostReducer,
  vms: vmReducer,
  update: updateReducer,
  ndvms: ndvmReducer,
  batteries: batteryReducer,
});
