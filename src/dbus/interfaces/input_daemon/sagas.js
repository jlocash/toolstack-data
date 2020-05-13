import { call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import inputDaemon, { INPUT_DAEMON_INITIALIZED } from './actions';

function* initialize() {
  yield call(sendMessage, inputDaemon.authCollectPassword());
  yield call(sendMessage, inputDaemon.getAllProperties());
  yield put({ type: INPUT_DAEMON_INITIALIZED });
}

export default initialize;
