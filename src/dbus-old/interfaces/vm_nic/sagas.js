import { call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions, { VM_NIC_INITIALIZED } from './actions';

export function* loadVmNic(vmPath, nicPath) {
  yield call(sendMessage, actions(nicPath).getAllProperties());
  yield put({
    type: VM_NIC_INITIALIZED,
    payload: {
      vmPath,
      nicPath,
    },
  });
}
