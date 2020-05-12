import { put, call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import xenmgr, { XENMGR_INITIALIZED } from './actions';


const initialize = function* () {
  yield call(sendMessage, xenmgr.getAllProperties());
  yield put({ type: XENMGR_INITIALIZED });
};

export default initialize;
