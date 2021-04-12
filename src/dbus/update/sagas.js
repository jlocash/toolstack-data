import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import updatemgr, { signals } from '../interfaces/updatemgr';
import fixKeys from '../fixKeys';
import dbusActions from '../actions';
import { interfaces } from '../constants';

function* loadProperties(dbus) {
  const [properties] = yield call(dbus.send, updatemgr.getAllProperties());
  yield put({
    type: actions.UPDATE_PROPERTIES_LOADED,
    data: { properties: fixKeys(properties) },
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
      yield fork(loadProperties, dbus);
    }
  }
}

function* startWatchers(dbus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.UPDATE_LOAD_PROPERTIES, loadProperties, dbus),
  ]);
}

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    loadProperties(dbus),
  ]);
}
