import { call, put } from 'redux-saga/effects';
import actions, { NETWORK_INITIALIZED } from '../network/actions';
import { sendMessage } from '../../sagas';

export function* loadNetwork(ndvmPath, networkPath) {
  yield call(sendMessage, actions(networkPath).getAllProperties());
  yield put({
    type: NETWORK_INITIALIZED,
    payload: {
      ndvmPath,
      networkPath,
    },
  });
}
