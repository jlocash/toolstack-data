/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */

import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { Signal } from '../dbus';
import networkDaemon from '../interfaces/network_daemon';
import networkDomain, { NetworkDomainProperties } from '../interfaces/network_domain';
import network, { NetworkProperties } from '../interfaces/network';
import { actions } from './slice';
import { toUnderscore, translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';

export function* loadNdvmNetwork(ndvmPath: string, networkPath: string) {
  const [data]: [Record<string, unknown>] = yield call(network.getAllProperties, networkPath);
  yield put(actions.networkLoaded({
    ndvmPath,
    network: {
      path: networkPath,
      ...translate<NetworkProperties>(data, toUnderscore),
    },
  }));
}

export function* loadNdvmNetworks(ndvmPath: string) {
  const [networkPaths]: string[][] = yield call(networkDomain.listNetworks, ndvmPath);
  yield all(networkPaths.map((networkPath) => loadNdvmNetwork(ndvmPath, networkPath)));
}

export function* loadNdvmProperties(ndvmPath: string) {
  const [data]: [Record<string, unknown>] = yield call(networkDomain.getAllProperties, ndvmPath);
  yield put(actions.propertiesLoaded({
    ndvmPath,
    properties: translate<NetworkDomainProperties>(data, toUnderscore),
  }));
}

export function* loadNdvm(ndvmPath: string) {
  yield put(actions.pathAcquired({ ndvmPath }));
  yield loadNdvmProperties(ndvmPath);
  yield loadNdvmNetworks(ndvmPath);
  yield put(actions.loaded({ ndvmPath }));
}

export function* loadNdvms() {
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

export function* signalHandler(action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case networkDaemon.signals.NETWORK_ADDED:
    case networkDaemon.signals.NETWORK_REMOVED:
      break;
    case networkDaemon.signals.NETWORK_STATE_CHANGED: {
      const [, , ndvmPath] = (signal.args as string[]);
      yield fork(loadNdvmNetworks, ndvmPath);
      break;
    }
    case networkDomain.signals.BACKEND_STATE_CHANGED: {
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

export function* watchLoadNdvmProperties() {
  while (true) {
    const action: PayloadAction<{ ndvmPath: string }> = yield take(actions.loadProperties.match);
    yield fork(loadNdvmProperties, action.payload.ndvmPath);
  }
}

export function* watchLoadNdvmNetworks() {
  while (true) {
    const action: PayloadAction<{ ndvmPath: string }> = yield take(actions.loadNetworks.match);
    yield fork(loadNdvmNetworks, action.payload.ndvmPath);
  }
}

export function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    watchLoadNdvmProperties(),
    watchLoadNdvmNetworks(),
  ]);
}

export default function* initialize() {
  yield all([
    startWatchers(),
    loadNdvms(),
  ]);
}
