import { all } from 'redux-saga/effects';
import dbusSaga from './dbus/sagas';

export default function* rootSaga() {
  yield all([
    dbusSaga(),
  ]);
}
