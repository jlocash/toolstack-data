import { call, put } from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import actions, { types } from './actions';

export default function* loadVmNic(vmPath, nicPath) {
  yield call(sendMessage, actions(nicPath).getAllProperties());
  yield put({
    type: types.VM_NIC_INITIALIZED,
    data: {
      vmPath,
      nicPath,
    },
  });
}
