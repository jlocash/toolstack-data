/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */

import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, takeEvery } from 'redux-saga/effects';
import { Signal } from '../dbus/dbus';
import { actions as dbusActions } from '../dbus/slice';
import actions from './slice';

const log = async (...args: unknown[]): Promise<Response> => {
  const message = args.join(' ');
  console.log(message);

  return fetch('/log/0', {
    method: 'POST',
    headers: {
      Accept: 'text',
    },
    body: `UI: ${message}`,
  });
};

function* logMessage(action: PayloadAction<unknown[]>) {
  yield call(log, ...action.payload);
}

function* logSignal(action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  yield call(
    log,
    'Signal received:',
    signal.interface,
    signal.member,
    JSON.stringify(signal.args),
  );
  yield;
}

function* logConnection(action: PayloadAction<{ url: string }>) {
  const { url } = action.payload;
  yield call(log, 'WebSocket opened on:', url);
  yield;
}

function* logSignalsRegistered(action: PayloadAction<{ interface: string }>) {
  yield call(log, 'Registered for signals with interface:', action.payload.interface);
  yield;
}

export default function* logSaga() {
  yield all([
    takeEvery(actions.log.match, logMessage),
    takeEvery(dbusActions.signalReceived.match, logSignal),
    takeEvery(dbusActions.connectionEstablished.match, logConnection),
    takeEvery(dbusActions.signalsRegistered.match, logSignalsRegistered),
  ]);
}
