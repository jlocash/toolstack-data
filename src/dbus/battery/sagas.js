import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import dbusActions from '../actions';
import { interfaces } from '../constants';
import xcpmd, { signals as xcpmdSignals } from '../interfaces/xcpmd';
import actions from './actions';

function* loadBattery(dbus, batteryId) {
  const [
    [present],
    [timeToEmpty],
    [timeToFull],
    [state],
    [percentage],
  ] = yield all([
    call(dbus.send, xcpmd.batteryIsPresent(batteryId)),
    call(dbus.send, xcpmd.batteryTimeToEmpty(batteryId)),
    call(dbus.send, xcpmd.batteryTimeToFull(batteryId)),
    call(dbus.send, xcpmd.batteryState(batteryId)),
    call(dbus.send, xcpmd.batteryPercentage(batteryId)),
  ]);

  yield put({
    type: actions.BATTERY_LOADED,
    data: {
      battery: {
        id: batteryId,
        present,
        timeToEmpty,
        timeToFull,
        percentage,
        state,
      },
    },
  });
}

function* loadBatteries(dbus) {
  yield put({ type: actions.BATTERY_CLEAR_ALL });
  const [batteries] = yield call(dbus.send, xcpmd.batteriesPresent());
  yield all(batteries.map((batteryId) => loadBattery(dbus, batteryId)));
}

const signalMatcher = (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED
  && action.data.signal.interface === interfaces.XCPMD
);

function* signalHandler(dbus, action) {
  const { signal } = action.data;
  switch (signal.member) {
    case xcpmdSignals.BATTERY_INFO_CHANGED:
    case xcpmdSignals.BATTERY_STATUS_CHANGED:
    case xcpmdSignals.AC_ADAPTER_STATE_CHANGED: {
      yield fork(loadBatteries, dbus);
      break;
    }
  }
}

function* startWatchers(dbus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.BATTERY_LOAD_ALL, loadBatteries, dbus),
  ]);
}

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    loadBatteries(dbus),
  ]);
}
