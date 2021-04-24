import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import * as DBus from '../dbus';
import { actions } from './slice';
import xenmgr, { signals as xenmgrSignals } from '../interfaces/xenmgr';
import vm, { PCIRule, VMProperties } from '../interfaces/xenmgr_vm';
import vmDisk, { VMDiskProperties } from '../interfaces/vm_disk';
import vmNic, { VMNicProperties } from '../interfaces/vm_nic';
import { translate } from '../utils';
import { actions as dbusActions } from '../slice';
import { interfaces } from '../constants';
import { PCIDevice } from '../interfaces/xenmgr_host';

function* loadProperty(vmPath: string, prop: keyof VMProperties) {
  const [value]: string[] = yield call(vm.getProperty, vmPath, prop);
  yield put(actions.propertyLoaded({
    vmPath,
    prop,
    value,
  }));
}

function* loadProperties(vmPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(vm.getAllProperties, vmPath);
  yield put(actions.propertiesLoaded({ vmPath, properties: translate<VMProperties>(properties) }));
}

function* loadArgoFirewallRules(vmPath: string) {
  const [argoFirewallRules]: string[][] = yield call(vm.listArgoFirewallRules, vmPath);
  yield put(actions.argoFirewallRulesLoaded({ vmPath, argoFirewallRules }));
}

function* loadPtPciDevices(vmPath: string) {
  const [ptPciDevices]: PCIDevice[][] = yield call(vm.listPtPciDevices, vmPath);
  yield put(actions.ptPciDevicesLoaded({ vmPath, ptPciDevices }));
}

function* loadPtRules(vmPath: string) {
  const [ptRules]: PCIRule[][] = yield call(vm.listPtRules, vmPath);
  yield put(actions.ptRulesLoaded({ vmPath, ptRules }));
}

function* loadNetFirewallRules(vmPath: string) {
  const [netFirewallRules]: unknown[][] = yield call(vm.listNetFirewallRules, vmPath);
  yield put(actions.netFirewallRulesLoaded({ vmPath, netFirewallRules }));
}

function* loadProductProperties(vmPath: string) {
  const [productProperties]: unknown[][] = yield call(vm.listProductProperties, vmPath);
  yield put(actions.productPropertiesLoaded({ vmPath, productProperties }));
}

function* loadVmNic(vmPath: string, nicPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(vmNic.getAllProperties, nicPath);
  yield put(actions.nicLoaded({
    vmPath,
    nic: {
      path: nicPath.replace(vmPath, ''),
      ...translate<VMNicProperties>(properties),
    },
  }));
}

function* loadVmNics(vmPath: string) {
  const [nicPaths]: [[string]] = yield call(vm.listNics, vmPath);
  yield all(nicPaths.map((nicPath) => loadVmNic(vmPath, nicPath)));
}

function* loadVmDisk(vmPath: string, diskPath: string) {
  const [properties]: [Record<string, unknown>] = yield call(vmDisk.getAllProperties, diskPath);
  yield put(actions.diskLoaded({
    vmPath,
    disk: {
      path: diskPath.replace(vmPath, ''),
      ...translate<VMDiskProperties>(properties),
    },
  }));
}

function* loadVmDisks(vmPath: string) {
  const [diskPaths]: [[string]] = yield call(vm.listDisks, vmPath);
  yield all(diskPaths.map((diskPath) => loadVmDisk(vmPath, diskPath)));
}

function* loadVm(vmPath: string) {
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

function* loadVms() {
  const [vmPaths]: string[][] = yield call(xenmgr.listVms);
  yield all(vmPaths.map((vmPath) => loadVm(vmPath)));
}

function* watchLoadProperties() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadProperties.match);
    yield fork(loadProperties, action.payload.vmPath);
  }
}

function* watchLoadArgoFirewallRules() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadArgoFirewallRules.match,
    );
    yield fork(loadArgoFirewallRules, action.payload.vmPath);
  }
}

function* watchLoadPtPciDevices() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadPtPciDevices.match);
    yield fork(loadPtPciDevices, action.payload.vmPath);
  }
}

function* watchLoadPtRules() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadPtRules.match);
    yield fork(loadPtRules, action.payload.vmPath);
  }
}

function* watchLoadNetFirewallRules() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadNetFirewallRules.match,
    );
    yield fork(loadNetFirewallRules, action.payload.vmPath);
  }
}

function* watchLoadProductProperties() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(
      actions.loadProductProperties.match,
    );
    yield fork(loadProductProperties, action.payload.vmPath);
  }
}

function* watchLoadVmNics() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadNics.match);
    yield fork(loadVmNics, action.payload.vmPath);
  }
}

function* watchLoadVmDisks() {
  while (true) {
    const action: PayloadAction<{ vmPath: string }> = yield take(actions.loadDisks.match);
    yield fork(loadVmDisks, action.payload.vmPath);
  }
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && action.payload.signal.interface === interfaces.XENMGR
);

function* signalHandler(action: PayloadAction<{ signal: DBus.Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case xenmgrSignals.VM_CREATED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadVm, vmPath);
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
      yield fork(loadProperty, vmPath, 'download_progress');
      break;
    }
    case xenmgrSignals.VM_CONFIG_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadVm, vmPath);
      break;
    }
    case xenmgrSignals.VM_NAME_CHANGED: {
      const [, vmPath] = (signal.args as string[]);
      yield fork(loadProperty, vmPath, 'name');
      break;
    }
  }
}

function* startWatchers() {
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize() {
  yield all([
    startWatchers(),
    loadVms(),
  ]);
}
