import { call, put } from 'redux-saga/effects';
import actions, { types } from './actions';
import sendMessage from '../../sendMessage';

export default function* loadNetwork(ndvmPath, networkPath) {
  yield call(sendMessage, actions(networkPath).getAllProperties());
  yield put({
    type: types.NETWORK_INITIALIZED,
    data: {
      ndvmPath,
      networkPath,
    },
  });
}
