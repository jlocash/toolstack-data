import { all } from 'redux-saga/effects';
import { websocketSaga } from './websocket/sagas';
import { dbusSaga } from './dbus/sagas';

export function* rootSaga() {
  yield all([
    websocketSaga(),
    dbusSaga(),
  ]);
}
