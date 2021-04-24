import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import type { DBus, Signal } from '../dbus';
import { actions } from './slice';
import xenmgr, { signals as xenmgrSignals } from '../interfaces/xenmgr';
import vm, { PCIRule, VMProperties } from '../interfaces/xenmgr_vm';
import vmDisk, { VMDiskProperties } from '../interfaces/vm_disk';
import vmNic, { VMNicProperties } from '../interfaces/vm_nic';
import { translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';
import { PCIDevice } from '../interfaces/xenmgr_host';

function* loadProperty(dbus: DBus, vmPath: string, prop: keyof VMProperties) {
  const [value]: string[] = yield call(dbus.send, vm.getProperty(vmPath, prop));
  yield put(actions.propertyLoaded({
    vmPath,
    prop,
    value,
  }));
}

function* loadProperties(dbus: DBus, vmPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(
    dbus.send,
    vm.getAllProperties(vmPath),
  );
  yield put(actions.propertiesLoaded({ vmPath, properties: translate<VMProperties>(properties) }));
}

function* loadArgoFirewallRules(dbus: DBus, vmPath: string) {
  const [argoFirewallRules]: string[][] = yield call(dbus.send, vm.listArgoFirewallRules(vmPath));
  yield put(actions.argoFirewallRulesLoaded({ vmPath, argoFirewallRules }));
}

function* loadPtPciDevices(dbus: DBus, vmPath: string) {
  const [ptPciDevices]: PCIDevice[][] = yield call(dbus.send, vm.listPtPciDevices(vmPath));
  yield put(actions.ptPciDevicesLoaded({ vmPath, ptPciDevices }));
}

function* loadPtRules(dbus: DBus, vmPath: string) {
  const [ptRules]: PCIRule[][] = yield call(dbus.send, vm.listPtRules(vmPath));
  yield put(actions.ptRulesLoaded({ vmPath, ptRules }));
}

function* loadNetFirewallRules(dbus: DBus, vmPath: string) {
  const [netFirewallRules]: unknown[][] = yield call(dbus.send, vm.listNetFirewallRules(vmPath));
  yield put(actions.netFirewallRulesLoaded({ vmPath, netFirewallRules }));
}

function* loadProductProperties(dbus: DBus, vmPath: string) {
  const [productProperties]: unknown[][] = yield call(dbus.send, vm.listProductProperties(vmPath));
  yield put(actions.productPropertiesLoaded({ vmPath, productProperties }));
}

function* loadVmNic(dbus: DBus, vmPath: string, nicPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(
    dbus.send,
    vmNic.getAllProperties(nicPath),
  );
  yield put(actions.nicLoaded({
    vmPath,
    nic: {
      path: nicPath.replace(vmPath, ''),
      ...translate<VMNicProperties>(properties),
    },
  }));
}

function* loadVmNics(dbus: DBus, vmPath: string) {
  const [nicPaths]: [[string]] = yield call(dbus.send, vm.listNics(vmPath));
  yield all(nicPaths.map((nicPath) => loadVmNic(dbus, vmPath, nicPath)));
}

function* loadVmDisk(dbus: DBus, vmPath: string, diskPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(
    dbus.send,
    vmDisk.getAllProperties(diskPath),
  );
  yield put(actions.diskLoaded({
    vmPath,
    disk: {
      path: diskPath.replace(vmPath, ''),
      ...translate<VMDiskProperties>(properties),
    },
  }));
}

function* loadVmDisks(dbus: DBus, vmPath: string) {
  const [diskPaths]: [[string]] = yield call(dbus.send, vm.listDisks(vmPath));
  yield all(diskPaths.map((diskPath) => loadVmDisk(dbus, vmPath, diskPath)));
}

function* loadVm(dbus: DBus, vmPath: string) {
  yield put(actions.pathAcquired({ vmPath }));
  yield all([
    loadProperties(dbus, vmPath),
    loadArgoFirewallRules(dbus, vmPath),
    loadPtPciDevices(dbus, vmPath),
    loadPtRules(dbus, vmPath),
    loadNetFirewallRules(dbus, vmPath),
    loadProductProperties(dbus, vmPath),
    loadVmNics(dbus, vmPath),
    loadVmDisks(dbus, vmPath),
  ]);
  yield put(actions.loaded({ vmPath }));
}

function* loadVms(dbus: DBus) {
  const [vmPaths]: string[][] = yield call(dbus.send, xenmgr.listVms());
  yield all(vmPaths.map((vmPath) => loadVm(dbus, vmPath)));
}

function* watchLoadProperties(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadProperties.match);
    yield fork(loadProperties, dbus, action.payload.vmPath);
  }
}

function* watchLoadArgoFirewallRules(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadArgoFirewallRules.match,
    );
    yield fork(loadArgoFirewallRules, dbus, action.payload.vmPath);
  }
}

function* watchLoadPtPciDevices(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadPtPciDevices.match);
    yield fork(loadPtPciDevices, dbus, action.payload.vmPath);
  }
}

function* watchLoadPtRules(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadPtRules.match);
    yield fork(loadPtRules, dbus, action.payload.vmPath);
  }
}

function* watchLoadNetFirewallRules(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadNetFirewallRules.match,
    );
    yield fork(loadNetFirewallRules, dbus, action.payload.vmPath);
  }
}

function* watchLoadProductProperties(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadProductProperties.match,
    );
    yield fork(loadProductProperties, dbus, action.payload.vmPath);
  }
}

function* watchLoadVmNics(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadNics.match);
    yield fork(loadVmNics, dbus, action.payload.vmPath);
  }
}

function* watchLoadVmDisks(dbus: DBus) {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadDisks.match);
    yield fork(loadVmDisks, dbus, action.payload.vmPath);
  }
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.XENMGR
);

function* signalHandler(dbus: DBus, action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case xenmgrSignals.VM_CREATED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadVm, dbus, vmPath);
      break;
    }
    case xenmgrSignals.VM_DELETED: {
      const [, vmPath] = (signal.args as string[]);
      yield put(actions.remove({ vmPath }));
      break;
    }
    case xenmgrSignals.VM_STATE_CHANGED: {
      const [, vmPath, vmState, vmAcpiState] = (
        signal.args as [string, string, string, number]
      );
      yield put(actions.stateUpdated({ vmPath, vmState, vmAcpiState }));
      break;
    }
    case xenmgrSignals.VM_TRANSFER_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadProperty, dbus, vmPath, 'download_progress');
      break;
    }
    case xenmgrSignals.VM_CONFIG_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadVm, dbus, vmPath);
      break;
    }
    case xenmgrSignals.VM_NAME_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadProperty, dbus, vmPath, 'name');
      break;
    }
  }
}

function* startWatchers(dbus: DBus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    watchLoadProperties(dbus),
    watchLoadArgoFirewallRules(dbus),
    watchLoadPtPciDevices(dbus),
    watchLoadPtRules(dbus),
    watchLoadNetFirewallRules(dbus),
    watchLoadProductProperties(dbus),
    watchLoadVmNics(dbus),
    watchLoadVmDisks(dbus),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize(dbus: DBus) {
  yield all([
    startWatchers(dbus),
    loadVms(dbus),
  ]);
}
