import { put, call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import updatemgr, { UPDATEMGR_INITIALIZED } from './actions';


const initialize = function* () {
  yield call(sendMessage, updatemgr.getAllProperties());
  yield put({ type: UPDATEMGR_INITIALIZED });
};

export default initialize;
