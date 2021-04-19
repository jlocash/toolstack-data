import { all, takeEvery } from 'redux-saga/effects';
import dbusActions from '../dbus/actions';

const log = (...args) => console.log(...args);

function* logSignal(action) {
  const { signal } = action.data;
  log('Signal received:', signal.interface, signal.member, JSON.stringify(signal.args));
  yield;
}

function* logConnection(action) {
  const { url } = action.data;
  log('WebSocket opened on:', url);
  yield;
}

function* logSignalsRegistered(action) {
  const { data } = action;
  log('Registered for signals with interface:', data.interface);
  yield;
}

export default function* logSaga() {
  yield all([
    takeEvery(dbusActions.DBUS_SIGNAL_RECEIVED, logSignal),
    takeEvery(dbusActions.DBUS_CONNECTION_ESTABLISHED, logConnection),
    takeEvery(dbusActions.DBUS_SIGNALS_REGISTERED, logSignalsRegistered),
  ]);
}
