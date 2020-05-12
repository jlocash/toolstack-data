import { put, call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import inputDaemon, { INPUT_DAEMON_INITIALIZED } from './actions';


const initialize = function* () {
  yield call(sendMessage, inputDaemon.authCollectPassword());
  yield call(sendMessage, inputDaemon.getAllProperties());
  yield put({ type: INPUT_DAEMON_INITIALIZED });
};

export default initialize;
