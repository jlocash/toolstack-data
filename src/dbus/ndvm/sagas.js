import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import networkDaemon, { signals as networkDaemonSignals } from '../interfaces/network_daemon';
import networkDomain, { signals as networkDomainSignals } from '../interfaces/network_domain';
import network from '../interfaces/network';
import actions from './actions';
import { fixKeys } from '../fixKeys';
import dbusActions from '../actions';
import { interfaces } from '../constants';

function* loadNdvmNetwork(dbus, ndvmPath, networkPath) {
  const [properties] = yield call(dbus.send, network.getAllProperties(networkPath));
  yield put({
    type: actions.NDVM_NETWORK_LOADED,
    data: {
      ndvmPath,
      network: {
        path: networkPath,
        ...fixKeys(properties),
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

const signalMatcher = (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEVIED
  && [
    interfaces.NETWORK_DOMAIN_NOTIFY,
    interfaces.NETWORK_DAEMON_NOTIFY,
  ].includes(action.data.signal.interface)
);

function* signalHandler(dbus, action) {
  const { signal } = action.data;
  switch (signal.member) {
    case networkDaemonSignals.NETWORK_ADDED:
    case networkDaemonSignals.NETWORK_REMOVED:
      break;
    case networkDaemonSignals.NETWORK_STATE_CHANGED: {
      const [,, ndvmPath] = signal.args;
      yield fork(loadNdvmNetworks, dbus, ndvmPath);
      break;
    }
    case networkDomainSignals.BACKEND_STATE_CHANGED: {
      const ndvmPath = signal.path;
      const [ndvmState] = signal.args;

      // 1 = started, 0 = stopped
      if (ndvmState) {
        yield fork(loadNdvm, dbus, ndvmPath);
      } else {
        yield put({
          type: actions.NDVM_REMOVE,
          data: { ndvmPath },
        });
      }
      break;
    }
  }
}

function* watchLoadNdvmProperties(dbus) {
  while (true) {
    const action = yield take(actions.NDVM_LOAD_PROPERTIES);
    yield fork(loadNdvmProperties, dbus, action.data.ndvmPath);
  }
}

function* watchLoadNdvmNetworks(dbus) {
  while (true) {
    const action = yield take(actions.NDVM_LOAD_NETWORKS);
    yield fork(loadNdvmNetworks, dbus, action.data.ndvmPath);
  }
}

function* startWatchers(dbus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    watchLoadNdvmProperties(dbus),
    watchLoadNdvmNetworks(dbus),
  ]);
}

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    loadNdvms(dbus),
  ]);
}
