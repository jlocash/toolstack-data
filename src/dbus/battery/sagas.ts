import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import * as DBus from '../dbus';
import { interfaces } from '../constants';
import xcpmd, { signals as xcpmdSignals } from '../interfaces/xcpmd';
import { actions } from './slice';
import { actions as dbusActions } from '../slice';

function* loadBattery(batteryId: number) {
  const [
    [present],
    [timeToEmpty],
    [timeToFull],
    [state],
    [percentage],
  ]: unknown[][] = yield all([
    call(xcpmd.batteryIsPresent, batteryId),
    call(xcpmd.batteryTimeToEmpty, batteryId),
    call(xcpmd.batteryTimeToFull, batteryId),
    call(xcpmd.batteryState, batteryId),
    call(xcpmd.batteryPercentage, batteryId),
  ]);

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

function* loadBatteries() {
  yield put(actions.clearAll());
  const [batteries]: number[][] = yield call(xcpmd.batteriesPresent);
  yield all(batteries.map((batteryId) => loadBattery(batteryId)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.XCPMD
);

function* signalHandler(action: PayloadAction<{ signal: DBus.Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case xcpmdSignals.BATTERY_INFO_CHANGED:
    case xcpmdSignals.BATTERY_STATUS_CHANGED:
    case xcpmdSignals.AC_ADAPTER_STATE_CHANGED: {
      yield fork(loadBatteries);
      break;
    }
  }
}

function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    takeEvery(actions.loadAll().type, loadBatteries),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize() {
  yield all([
    startWatchers(),
    loadBatteries(),
  ]);
}
