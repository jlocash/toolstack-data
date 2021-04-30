/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */

import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { Signal } from '../dbus';
import { actions } from './slice';
import updatemgr, { UpdatemgrProperties } from '../interfaces/updatemgr';
import { toUnderscore, translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';

export function* load() {
  const [properties]: [Record<string, unknown>] = yield call(updatemgr.getAllProperties);
  yield put(actions.loaded(translate<UpdatemgrProperties>(properties, toUnderscore)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.UPDATEMGR
);

export function* signalHandler(action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case updatemgr.signals.UPDATE_STATE_CHANGE:
    case updatemgr.signals.UPDATE_DOWNLOAD_PROGRESS: {
      yield fork(load);
    }
  }
}

export function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    takeEvery(actions.load().type, load),
  ]);
}

export default function* initialize() {
  yield all([
    startWatchers(),
    load(),
  ]);
}
