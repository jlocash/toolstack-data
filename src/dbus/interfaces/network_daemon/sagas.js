import { all, call, put, select } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import networkDomainActions, { NETWORK_DOMAIN_INITIALIZED } from '../network_domain/actions';
import networkDaemon from './actions';
import { loadNetwork } from '../network/sagas';

function* loadNdvmNetworks(ndvmPath) {
  yield call(sendMessage, networkDomainActions(ndvmPath).listNetworks());
  const networks = yield select((state) => state.dbus.ndvms[ndvmPath].networks);
  yield all(Object.keys(networks).map(network => call(loadNetwork, ndvmPath, network)));
}

function* loadNdvm(ndvmPath) {
  yield all([
    call(sendMessage, networkDomainActions(ndvmPath).getAllProperties()),
    call(loadNdvmNetworks, ndvmPath),
  ]);

  yield put({
    type: NETWORK_DOMAIN_INITIALIZED,
    payload: {
      ndvmPath,
    },
  });
}

function* initialize() {
  yield call(sendMessage, networkDaemon.listBackends());
  const ndvms = yield select((state) => state.dbus.ndvms);

  // initialize each ndvm
  yield all(Object.keys(ndvms).map(ndvmPath => call(loadNdvm, ndvmPath)));
}

export default initialize;
