import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import type { DBus, Signal } from '../dbus';
import { actions } from './slice';
import updatemgr, { signals, UpdatemgrProperties } from '../interfaces/updatemgr';
import { translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';

function* load(dbus: DBus) {
  const [properties]: [Record<string, unknown>] = yield call(
    dbus.send,
    updatemgr.getAllProperties(),
  );
  yield put(actions.loaded(translate<UpdatemgrProperties>(properties)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.UPDATEMGR
);

function* signalHandler(dbus: DBus, action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case signals.UPDATE_STATE_CHANGE:
    case signals.UPDATE_DOWNLOAD_PROGRESS: {
      yield fork(load, dbus);
    }
  }
}

function* startWatchers(dbus: DBus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.load().type, load, dbus),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize(dbus: DBus) {
  yield all([
    startWatchers(dbus),
    load(dbus),
  ]);
}
