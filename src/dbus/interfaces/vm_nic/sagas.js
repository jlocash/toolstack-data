import { put } from 'redux-saga/effects';
import { VM_NIC_INITIALIZED } from './actions';

const initialize = function* () {
  yield put({ type: VM_NIC_INITIALIZED });
};

export default initialize;
