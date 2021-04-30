/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */

import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { unwrap } from '../utils';
import { Signal } from '../dbus';
import { interfaces } from '../constants';
import xcpmd from '../interfaces/xcpmd';
import { actions } from './slice';
import { actions as dbusActions } from '../slice';

export function* loadBattery(batteryId: number) {
  const [present, timeToEmpty, timeToFull, state, percentage] = unwrap(yield all([
    call(xcpmd.batteryIsPresent, batteryId),
    call(xcpmd.batteryTimeToEmpty, batteryId),
    call(xcpmd.batteryTimeToFull, batteryId),
    call(xcpmd.batteryState, batteryId),
    call(xcpmd.batteryPercentage, batteryId),
  ]));

  yield put(actions.batteryLoaded({
    battery: {
      id: batteryId,
      present: (present as boolean),
      timeToEmpty: (timeToEmpty as number),
      timeToFull: (timeToFull as number),
      percentage: (percentage as number),
      state: (state as number),
    },
  }));
}

export function* loadBatteries() {
  yield put(actions.clearAll());
  const [batteries]: number[][] = yield call(xcpmd.batteriesPresent);
  yield all(batteries.map((batteryId) => loadBattery(batteryId)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.XCPMD
);

export function* signalHandler(action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case xcpmd.signals.BATTERY_INFO_CHANGED:
    case xcpmd.signals.BATTERY_STATUS_CHANGED:
    case xcpmd.signals.AC_ADAPTER_STATE_CHANGED: {
      yield fork(loadBatteries);
      break;
    }
  }
}

export function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    takeEvery(actions.loadAll().type, loadBatteries),
  ]);
}

export default function* initialize() {
  yield all([
    startWatchers(),
    loadBatteries(),
  ]);
}
