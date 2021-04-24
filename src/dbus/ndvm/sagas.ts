import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import * as DBus from '../dbus';
import networkDaemon, { signals as networkDaemonSignals } from '../interfaces/network_daemon';
import networkDomain, { signals as networkDomainSignals, NetworkDomainProperties } from '../interfaces/network_domain';
import network, { NetworkProperties } from '../interfaces/network';
import { actions } from './slice';
import { translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';

function* loadNdvmNetwork(ndvmPath: string,
  networkPath: string) {
  const [data]: [Record<string, unknown>] = yield call(network.getAllProperties, networkPath);
  yield put(actions.networkLoaded({
    ndvmPath,
    network: {
      path: networkPath,
      ...translate<NetworkProperties>(data),
    },
  }));
}

function* loadNdvmNetworks(ndvmPath: string) {
  const [networkPaths]: string[][] = yield call(networkDomain.listNetworks, ndvmPath);
  yield all(networkPaths.map((networkPath) => loadNdvmNetwork(ndvmPath, networkPath)));
}

function* loadNdvmProperties(ndvmPath: string) {
  const [data]: [Record<string, unknown>] = yield call(networkDomain.getAllProperties, ndvmPath);
  yield put(actions.propertiesLoaded({
    ndvmPath,
    properties: translate<NetworkDomainProperties>(data),
  }));
}

function* loadNdvm(ndvmPath: string) {
  yield put(actions.pathAcquired({ ndvmPath }));
  yield loadNdvmProperties(ndvmPath);
  yield loadNdvmNetworks(ndvmPath);
  yield put(actions.loaded({ ndvmPath }));
}

function* loadNdvms() {
  const [ndvmPaths]: string[][] = yield call(networkDaemon.listBackends);
  yield all(ndvmPaths.map((ndvmPath) => loadNdvm(ndvmPath)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && [
    interfaces.NETWORK_DOMAIN_NOTIFY,
    interfaces.NETWORK_DAEMON_NOTIFY,
  ].includes(action.payload.signal.interface)
);

function* signalHandler(action: PayloadAction<{ signal: DBus.Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case networkDaemonSignals.NETWORK_ADDED:
    case networkDaemonSignals.NETWORK_REMOVED:
      break;
    case networkDaemonSignals.NETWORK_STATE_CHANGED: {
      const [, , ndvmPath] = (signal.args as string[]);
      yield fork(loadNdvmNetworks, ndvmPath);
      break;
    }
    case networkDomainSignals.BACKEND_STATE_CHANGED: {
      const ndvmPath = signal.path;
      const [ndvmState] = (signal.args as number[]);

      // 1 = started, 0 = stopped
      if (ndvmState === 1) {
        yield fork(loadNdvm, ndvmPath);
      } else if (ndvmState === 0) {
        yield put(actions.remove({ ndvmPath }));
      }
      break;
    }
  }
}

function* watchLoadNdvmProperties() {
  while (true) {
    const action: PayloadAction<{ ndvmPath: string }> = yield take(actions.loadProperties.match);
    yield fork(loadNdvmProperties, action.payload.ndvmPath);
  }
}

function* watchLoadNdvmNetworks() {
  while (true) {
    const action: PayloadAction<{ ndvmPath: string }> = yield take(actions.loadNetworks.match);
    yield fork(loadNdvmNetworks, action.payload.ndvmPath);
  }
}

function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    watchLoadNdvmProperties(),
    watchLoadNdvmNetworks(),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize() {
  yield all([
    startWatchers(),
    loadNdvms(),
  ]);
}
