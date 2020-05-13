import { call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions, { VM_DISK_INITIALIZED } from './actions';

export function* loadVmDisk(vmPath, diskPath) {
  yield call(sendMessage, actions(diskPath).getAllProperties());
  yield put({
    type: VM_DISK_INITIALIZED,
    payload:{
      vmPath, 
      diskPath,
    },
  });
}
