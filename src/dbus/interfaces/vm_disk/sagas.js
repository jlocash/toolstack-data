import { put } from 'redux-saga/effects';
import { VM_DISK_INITIALIZED } from './actions';

const initialize = function* () {
  yield put({ type: VM_DISK_INITIALIZED });
};

export default initialize;
