import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import type { DBus, Signal } from '../dbus';
import networkDaemon, { signals as networkDaemonSignals } from '../interfaces/network_daemon';
import networkDomain, { signals as networkDomainSignals, NetworkDomainProperties } from '../interfaces/network_domain';
import network, { NetworkProperties } from '../interfaces/network';
import { actions } from './slice';
import { translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';

function* loadNdvmNetwork(dbus: DBus, ndvmPath: string,
  networkPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(
    dbus.send,
    network.getAllProperties(networkPath),
  );

  yield put(actions.networkLoaded({
    ndvmPath,
    network: {
      path: networkPath,
      ...translate<NetworkProperties>(properties),
    },
  }));
}

function* loadNdvmNetworks(dbus: DBus, ndvmPath: string) {
  const [networkPaths]: string[][] = yield call(dbus.send, networkDomain.listNetworks(ndvmPath));
  yield all(networkPaths.map((networkPath) => loadNdvmNetwork(dbus, ndvmPath, networkPath)));
}

function* loadNdvmProperties(dbus: DBus, ndvmPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(
    dbus.send,
    networkDomain.getAllProperties(ndvmPath),
  );
  yield put(actions.propertiesLoaded({
    ndvmPath,
    properties: translate<NetworkDomainProperties>(properties),
  }));
}

function* loadNdvm(dbus: DBus, ndvmPath: string) {
  yield put(actions.pathAcquired({ ndvmPath }));
  yield loadNdvmProperties(dbus, ndvmPath);
  yield loadNdvmNetworks(dbus, ndvmPath);
  yield put(actions.loaded({ ndvmPath }));
}

function* loadNdvms(dbus: DBus) {
  const [ndvmPaths]: string[][] = yield call(dbus.send, networkDaemon.listBackends());
  yield all(ndvmPaths.map((ndvmPath) => loadNdvm(dbus, ndvmPath)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && [
    interfaces.NETWORK_DOMAIN_NOTIFY,
    interfaces.NETWORK_DAEMON_NOTIFY,
  ].includes(action.payload.signal.interface)
);

function* signalHandler(dbus: DBus, action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case networkDaemonSignals.NETWORK_ADDED:
    case networkDaemonSignals.NETWORK_REMOVED:
      break;
    case networkDaemonSignals.NETWORK_STATE_CHANGED: {
      const [, , ndvmPath] = (signal.args as string[]);
      yield fork(loadNdvmNetworks, dbus, ndvmPath);
      break;
    }
    case networkDomainSignals.BACKEND_STATE_CHANGED: {
      const ndvmPath = signal.path;
      const [ndvmState] = (signal.args as number[]);

      // 1 = started, 0 = stopped
      if (ndvmState === 1) {
        yield fork(loadNdvm, dbus, ndvmPath);
      } else if (ndvmState === 0) {
        yield put(actions.remove({ ndvmPath }));
      }
      break;
    }
  }
}

function* watchLoadNdvmProperties(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ ndvmPath: string }> = yield take(actions.loadProperties.match);
    yield fork(loadNdvmProperties, dbus, action.payload.ndvmPath);
  }
}

function* watchLoadNdvmNetworks(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ ndvmPath: string }> = yield take(actions.loadNetworks.match);
    yield fork(loadNdvmNetworks, dbus, action.payload.ndvmPath);
  }
}

function* startWatchers(dbus: DBus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    watchLoadNdvmProperties(dbus),
    watchLoadNdvmNetworks(dbus),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize(dbus: DBus) {
  yield all([
    startWatchers(dbus),
    loadNdvms(dbus),
  ]);
}
