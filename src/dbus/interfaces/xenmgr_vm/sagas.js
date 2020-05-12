import { put, call, select } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import vm, { XENMGR_VM_INITIALIZED } from './actions';
import xenmgr from '../xenmgr/actions';


const loadVm = function* (vmPath) {
  yield call(sendMessage, vm(vmPath).getAllProperties());
  yield put({
    type: XENMGR_VM_INITIALIZED,
    payload: {
      vmPath,
    },
  });
};

const initialize = function* () {
  yield call(sendMessage, xenmgr.listVms());
  const vms = yield select((state) => state.dbus.vms);
  for (const vmPath of Object.keys(vms)) {
    yield call(loadVm, vmPath);
  }

  yield put({ type: XENMGR_VM_INITIALIZED });
};

export default initialize;
