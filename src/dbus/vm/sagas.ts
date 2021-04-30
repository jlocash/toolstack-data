/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */

import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { Signal } from '../dbus';
import { actions } from './slice';
import xenmgr from '../interfaces/xenmgr';
import vm, { PCIRule, VMProperties } from '../interfaces/xenmgr_vm';
import vmDisk, { VMDiskProperties } from '../interfaces/vm_disk';
import vmNic, { VMNicProperties } from '../interfaces/vm_nic';
import { toUnderscore, translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';
import { PCIDevice } from '../interfaces/xenmgr_host';

export function* loadProperty(vmPath: string, prop: keyof VMProperties) {
  const [value]: [string] = yield call(vm.getProperty, vmPath, prop);
  yield put(actions.propertyLoaded({ vmPath, prop, value }));
}

export function* loadProperties(vmPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(vm.getAllProperties, vmPath);
  yield put(actions.propertiesLoaded({
    vmPath,
    properties: translate<VMProperties>(properties, toUnderscore),
  }));
}

export function* loadArgoFirewallRules(vmPath: string) {
  const [argoFirewallRules]: string[][] = yield call(vm.listArgoFirewallRules, vmPath);
  yield put(actions.argoFirewallRulesLoaded({ vmPath, argoFirewallRules }));
}

export function* loadPtPciDevices(vmPath: string) {
  const [ptPciDevices]: PCIDevice[][] = yield call(vm.listPtPciDevices, vmPath);
  yield put(actions.ptPciDevicesLoaded({ vmPath, ptPciDevices }));
}

export function* loadPtRules(vmPath: string) {
  const [ptRules]: PCIRule[][] = yield call(vm.listPtRules, vmPath);
  yield put(actions.ptRulesLoaded({ vmPath, ptRules }));
}

export function* loadNetFirewallRules(vmPath: string) {
  const [netFirewallRules]: unknown[][] = yield call(vm.listNetFirewallRules, vmPath);
  yield put(actions.netFirewallRulesLoaded({ vmPath, netFirewallRules }));
}

export function* loadProductProperties(vmPath: string) {
  const [productProperties]: unknown[][] = yield call(vm.listProductProperties, vmPath);
  yield put(actions.productPropertiesLoaded({ vmPath, productProperties }));
}

export function* loadVmNic(vmPath: string, nicPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(vmNic.getAllProperties, nicPath);
  yield put(actions.nicLoaded({
    vmPath,
    nic: {
      path: nicPath.replace(vmPath, ''),
      ...translate<VMNicProperties>(properties, toUnderscore),
    },
  }));
}

export function* loadVmNics(vmPath: string) {
  const [nicPaths]: [string[]] = yield call(vm.listNics, vmPath);
  yield all(nicPaths.map((nicPath) => loadVmNic(vmPath, nicPath)));
}

export function* loadVmDisk(vmPath: string, diskPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(vmDisk.getAllProperties, diskPath);
  yield put(actions.diskLoaded({
    vmPath,
    disk: {
      path: diskPath.replace(vmPath, ''),
      ...translate<VMDiskProperties>(properties, toUnderscore),
    },
  }));
}

export function* loadVmDisks(vmPath: string) {
  const [diskPaths]: [string[]] = yield call(vm.listDisks, vmPath);
  yield all(diskPaths.map((diskPath) => loadVmDisk(vmPath, diskPath)));
}

export function* loadVm(vmPath: string) {
  yield put(actions.pathAcquired({ vmPath }));
  yield all([
    loadProperties(vmPath),
    loadArgoFirewallRules(vmPath),
    loadPtPciDevices(vmPath),
    loadPtRules(vmPath),
    loadNetFirewallRules(vmPath),
    loadProductProperties(vmPath),
    loadVmNics(vmPath),
    loadVmDisks(vmPath),
  ]);
  yield put(actions.loaded({ vmPath }));
}

export function* loadVms() {
  const [vmPaths]: string[][] = yield call(xenmgr.listVms);
  yield all(vmPaths.map((vmPath) => loadVm(vmPath)));
}

export function* watchLoadProperties() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadProperties.match);
    yield fork(loadProperties, action.payload.vmPath);
  }
}

export function* watchLoadArgoFirewallRules() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadArgoFirewallRules.match,
    );
    yield fork(loadArgoFirewallRules, action.payload.vmPath);
  }
}

export function* watchLoadPtPciDevices() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadPtPciDevices.match);
    yield fork(loadPtPciDevices, action.payload.vmPath);
  }
}

export function* watchLoadPtRules() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadPtRules.match);
    yield fork(loadPtRules, action.payload.vmPath);
  }
}

export function* watchLoadNetFirewallRules() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadNetFirewallRules.match,
    );
    yield fork(loadNetFirewallRules, action.payload.vmPath);
  }
}

export function* watchLoadProductProperties() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadProductProperties.match,
    );
    yield fork(loadProductProperties, action.payload.vmPath);
  }
}

export function* watchLoadVmNics() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadNics.match);
    yield fork(loadVmNics, action.payload.vmPath);
  }
}

export function* watchLoadVmDisks() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadDisks.match);
    yield fork(loadVmDisks, action.payload.vmPath);
  }
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.XENMGR
);

export function* signalHandler(action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case xenmgr.signals.VM_CREATED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadVm, vmPath);
      break;
    }
    case xenmgr.signals.VM_DELETED: {
      const [, vmPath] = (signal.args as string[]);
      yield put(actions.remove({ vmPath }));
      break;
    }
    case xenmgr.signals.VM_STATE_CHANGED: {
      const [, vmPath, vmState, vmAcpiState] = (
        signal.args as [string, string, string, number]
      );
      yield put(actions.stateUpdated({ vmPath, vmState, vmAcpiState }));
      break;
    }
    case xenmgr.signals.VM_TRANSFER_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadProperty, vmPath, 'download_progress');
      break;
    }
    case xenmgr.signals.VM_CONFIG_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadVm, vmPath);
      break;
    }
    case xenmgr.signals.VM_NAME_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadProperty, vmPath, 'name');
      break;
    }
  }
}

export function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    watchLoadProperties(),
    watchLoadArgoFirewallRules(),
    watchLoadPtPciDevices(),
    watchLoadPtRules(),
    watchLoadNetFirewallRules(),
    watchLoadProductProperties(),
    watchLoadVmNics(),
    watchLoadVmDisks(),
  ]);
}

export default function* initialize() {
  yield all([
    startWatchers(),
    loadVms(),
  ]);
}
