import {
  all, call, put,
} from 'redux-saga/effects';
import networkDaemon from '../interfaces/network_daemon';
import networkDomain from '../interfaces/network_domain';
import network from '../interfaces/network';
import actions from './actions';
import fixKeys from '../fixKeys';

function* loadNdvmNetwork(dbus, ndvmPath, networkPath) {
  const [properties] = yield call(dbus.send, network.getAllProperties(networkPath));
  yield put({
    type: actions.NDVM_NETWORK_LOADED,
    data: {
      ndvmPath,
      network: {
        path: networkPath,
        properties: fixKeys(properties),
      },
    },
  });
}

function* loadNdvmNetworks(dbus, ndvmPath) {
  const [networkPaths] = yield call(dbus.send, networkDomain.listNetworks(ndvmPath));
  yield all(networkPaths.map((networkPath) => loadNdvmNetwork(dbus, ndvmPath, networkPath)));
}

function* loadNdvmProperties(dbus, ndvmPath) {
  const [properties] = yield call(dbus.send, networkDomain.getAllProperties(ndvmPath));
  yield put({
    type: actions.NDVM_PROPERTIES_LOADED,
    data: {
      ndvmPath,
      properties: fixKeys(properties),
    },
  });
}

function* loadNdvm(dbus, ndvmPath) {
  yield loadNdvmProperties(dbus, ndvmPath);
  yield loadNdvmNetworks(dbus, ndvmPath);
}

function* loadNdvms(dbus) {
  const [ndvmPaths] = yield call(dbus.send, networkDaemon.listBackends());
  yield all(ndvmPaths.map((ndvmPath) => loadNdvm(dbus, ndvmPath)));
}

function* startWatchers(dbus) {
  yield all([
  ]);
}

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    loadNdvms(dbus),
  ]);
}
