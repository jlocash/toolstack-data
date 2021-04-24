import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import type { DBus, Signal } from '../dbus';
import { interfaces } from '../constants';
import xcpmd, { signals as xcpmdSignals } from '../interfaces/xcpmd';
import { actions } from './slice';
import { actions as dbusActions } from '../slice';

function* loadBattery(dbus: DBus, batteryId: number) {
  const [
    [present],
    [timeToEmpty],
    [timeToFull],
    [state],
    [percentage],
  ]: unknown[][] = yield all([
    call(dbus.send, xcpmd.batteryIsPresent(batteryId)),
    call(dbus.send, xcpmd.batteryTimeToEmpty(batteryId)),
    call(dbus.send, xcpmd.batteryTimeToFull(batteryId)),
    call(dbus.send, xcpmd.batteryState(batteryId)),
    call(dbus.send, xcpmd.batteryPercentage(batteryId)),
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

function* loadBatteries(dbus: DBus) {
  yield put(actions.clearAll());
  const [batteries]: number[][] = yield call(dbus.send, xcpmd.batteriesPresent());
  yield all(batteries.map((batteryId) => loadBattery(dbus, batteryId)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.XCPMD
);

function* signalHandler(dbus: DBus, action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case xcpmdSignals.BATTERY_INFO_CHANGED:
    case xcpmdSignals.BATTERY_STATUS_CHANGED:
    case xcpmdSignals.AC_ADAPTER_STATE_CHANGED: {
      yield fork(loadBatteries, dbus);
      break;
    }
  }
}

function* startWatchers(dbus: DBus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.loadAll().type, loadBatteries, dbus),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize(dbus: DBus) {
  yield all([
    startWatchers(dbus),
    loadBatteries(dbus),
  ]);
}
