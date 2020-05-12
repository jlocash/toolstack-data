import { put, call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import host, { XENMGR_HOST_INITIALIZED } from './actions';


const initialize = function* () {
  yield call(sendMessage, host.getAllProperties());
  yield put({ type: XENMGR_HOST_INITIALIZED });
};

export default initialize;
