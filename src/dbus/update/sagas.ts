import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import * as DBus from '../dbus';
import { actions } from './slice';
import updatemgr, { signals, UpdatemgrProperties } from '../interfaces/updatemgr';
import { translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';

function* load() {
  const [properties]: [Record<string, unknown>] = yield call(updatemgr.getAllProperties);
  yield put(actions.loaded(translate<UpdatemgrProperties>(properties)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.UPDATEMGR
);

function* signalHandler(action: PayloadAction<{ signal: DBus.Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case signals.UPDATE_STATE_CHANGE:
    case signals.UPDATE_DOWNLOAD_PROGRESS: {
      yield fork(load);
    }
  }
}

function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    takeEvery(actions.load().type, load),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize() {
  yield all([
    startWatchers(),
    load(),
  ]);
}
