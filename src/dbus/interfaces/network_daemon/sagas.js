import { put, call, select } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import networkDomain, { NETWORK_DOMAIN_INITIALIZED } from '../network_domain/actions';
import networkDaemon from './actions';

import networkConfig, { NETWORK_INITIALIZED } from '../network/actions';

const loadNdvm = function* (ndvmPath) {
  yield call(sendMessage, networkDomain(ndvmPath).getAllProperties());
  yield call(sendMessage, networkDomain(ndvmPath).listNetworks());
  const networks = yield select((state) => state.dbus.ndvms[ndvmPath].networks);

  // initialize each network
  for (const network of Object.keys(networks)) {
    yield call(sendMessage, networkConfig(network).getAllProperties());
    yield put({
      type: NETWORK_INITIALIZED,
      payload: {
        network,
        ndvmPath,
      },
    });
  }

  yield put({
    type: NETWORK_DOMAIN_INITIALIZED,
    payload: {
      ndvmPath,
    },
  });
};

const initialize = function* () {
  yield call(sendMessage, networkDaemon.listBackends());
  const ndvms = yield select((state) => state.dbus.ndvms);

  // initialize each ndvm
  for (const ndvmPath of Object.keys(ndvms)) {
    yield call(loadNdvm, ndvmPath);
  }
};

export default initialize;
