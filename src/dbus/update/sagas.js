import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import updatemgr from '../interfaces/updatemgr';
import fixKeys from '../fixKeys';

function* loadProperties(dbus) {
  const [properties] = yield call(dbus.send, updatemgr.getAllProperties());
  yield put({
    type: actions.UPDATE_PROPERTIES_LOADED,
    data: { properties: fixKeys(properties) },
  });
}

export default function* initialize(dbus) {
  yield all([
    loadProperties(dbus),
    takeEvery(actions.UPDATE_LOAD_PROPERTIES, loadProperties, dbus),
  ]);
}
