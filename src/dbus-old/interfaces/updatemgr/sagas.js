import { call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import updatemgr, { UPDATEMGR_INITIALIZED } from './actions';

function* initialize() {
  yield call(sendMessage, updatemgr.getAllProperties());
  yield put({ type: UPDATEMGR_INITIALIZED });
}

export default initialize;
