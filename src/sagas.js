import { all } from 'redux-saga/effects';
import { websocketSaga } from './websocket/sagas';
import { dbusSaga } from './dbus/sagas';

export const rootSaga = function* () {
    yield all([
        websocketSaga(),
        dbusSaga(),
    ]);
};
