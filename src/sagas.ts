/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */

import { all } from 'redux-saga/effects';
import dbusSaga from './dbus/sagas';
import logSaga from './log/sagas';

export default function* rootSaga() {
  yield all([
    dbusSaga(),
    logSaga(),
  ]);
}
