import { call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import xenmgr, { XENMGR_INITIALIZED } from './actions';


function* initialize() {
  yield call(sendMessage, xenmgr.getAllProperties());
  yield put({ type: XENMGR_INITIALIZED });
}

export default initialize;
