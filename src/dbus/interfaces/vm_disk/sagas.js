import { call, put } from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import actions, { types } from './actions';

export default function* loadVmDisk(vmPath, diskPath) {
  yield call(sendMessage, actions(diskPath).getAllProperties());
  yield put({
    type: types.VM_DISK_INITIALIZED,
    data: {
      vmPath,
      diskPath,
    },
  });
}
