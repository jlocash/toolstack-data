import { all } from 'redux-saga/effects';
import dbusSaga from './dbus/sagas';
import logSaga from './log/sagas';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([
    dbusSaga(),
    logSaga(),
  ]);
}
