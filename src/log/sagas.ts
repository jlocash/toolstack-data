import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeEvery } from 'redux-saga/effects';
import { Signal } from '../dbus/dbus';
import { actions as dbusActions } from '../dbus/slice';

const log = (...args: unknown[]) => console.log(...args);

function* logSignal(action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  log('Signal received:', signal.interface, signal.member, JSON.stringify(signal.args));
  yield;
}

function* logConnection(action: PayloadAction<{ url: string }>) {
  const { url } = action.payload;
  log('WebSocket opened on:', url);
  yield;
}

function* logSignalsRegistered(action: PayloadAction<{ interface: string }>) {
  log('Registered for signals with interface:', action.payload.interface);
  yield;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* logSaga() {
  yield all([
    takeEvery(dbusActions.signalReceived.match, logSignal),
    takeEvery(dbusActions.connectionEstablished.match, logConnection),
    takeEvery(dbusActions.signalsRegistered.match, logSignalsRegistered),
  ]);
}
