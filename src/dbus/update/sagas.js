import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import updatemgr, { signals } from '../interfaces/updatemgr';
import { fixKeys } from '../fixKeys';
import dbusActions from '../actions';
import { interfaces } from '../constants';

function* load(dbus) {
  const [properties] = yield call(dbus.send, updatemgr.getAllProperties());
  yield put({
    type: actions.UPDATE_LOADED,
    data: { ...fixKeys(properties) },
  });
}

const signalMatcher = (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED
  && action.data.signal.interface === interfaces.UPDATEMGR
);

function* signalHandler(dbus, action) {
  const { signal } = action.data;
  switch (signal.member) {
    case signals.UPDATE_STATE_CHANGE:
    case signals.UPDATE_DOWNLOAD_PROGRESS: {
      yield fork(load, dbus);
    }
  }
}

function* startWatchers(dbus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.UPDATE_LOAD, load, dbus),
  ]);
}

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    load(dbus),
  ]);
}
