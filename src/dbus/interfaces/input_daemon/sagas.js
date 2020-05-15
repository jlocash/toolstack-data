import { all, call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import inputDaemon, { INPUT_DAEMON_INITIALIZED } from './actions';

function* initialize() {
  yield all([
    call(sendMessage, inputDaemon.authCollectPassword()),
    call(sendMessage, inputDaemon.getAllProperties()),
  ]);
  yield put({ type: INPUT_DAEMON_INITIALIZED });
}

export default initialize;
