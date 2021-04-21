import {
  all, call, fork, put, take, takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import xenmgr, { signals as xenmgrSignals } from '../interfaces/xenmgr';
import vm from '../interfaces/xenmgr_vm';
import vmDisk from '../interfaces/vm_disk';
import vmNic from '../interfaces/vm_nic';
import { fixKeys, toCamelCase } from '../fixKeys';
import dbusActions from '../actions';
import { interfaces } from '../constants';

function* loadProperty(dbus, vmPath, prop) {
  const [value] = yield call(dbus.send, vm.getProperty(vmPath, prop));
  yield put({
    type: actions.VM_PROPERTY_LOADED,
    data: {
      vmPath,
      value,
      prop: toCamelCase(prop),
    },
  });
}

function* loadProperties(dbus, vmPath) {
  const [properties] = yield call(dbus.send, vm.getAllProperties(vmPath));
  yield put({
    type: actions.VM_PROPERTIES_LOADED,
    data: { vmPath, properties: fixKeys(properties) },
  });
}

function* loadArgoFirewallRules(dbus, vmPath) {
  const [argoFirewallRules] = yield call(dbus.send, vm.listArgoFirewallRules(vmPath));
  yield put({
    type: actions.VM_ARGO_FIREWALL_RULES_LOADED,
    data: { vmPath, argoFirewallRules },
  });
}

function* loadPtPciDevices(dbus, vmPath) {
  const [ptPciDevices] = yield call(dbus.send, vm.listPtPciDevices(vmPath));
  yield put({
    type: actions.VM_PT_PCI_DEVICES_LOADED,
    data: { vmPath, ptPciDevices },
  });
}

function* loadPtRules(dbus, vmPath) {
  const [ptRules] = yield call(dbus.send, vm.listPtRules(vmPath));
  yield put({
    type: actions.VM_PT_RULES_LOADED,
    data: { vmPath, ptRules },
  });
}

function* loadNetFirewallRules(dbus, vmPath) {
  const [netFirewallRules] = yield call(dbus.send, vm.listNetFirewallRules(vmPath));
  yield put({
    type: actions.VM_NET_FIREWALL_RULES_LOADED,
    data: { vmPath, netFirewallRules },
  });
}

function* loadProductProperties(dbus, vmPath) {
  const [productProperties] = yield call(dbus.send, vm.listProductProperties(vmPath));
  yield put({
    type: actions.VM_PRODUCT_PROPERTIES_LOADED,
    data: { vmPath, productProperties },
  });
}

function* loadVmNic(dbus, vmPath, nicPath) {
  const [properties] = yield call(dbus.send, vmNic.getAllProperties(nicPath));
  yield put({
    type: actions.VM_NIC_LOADED,
    data: {
      vmPath,
      nic: {
        path: nicPath.replace(vmPath, ''),
        ...fixKeys(properties),
      },
    },
  });
}

function* loadVmNics(dbus, vmPath) {
  const [nicPaths] = yield call(dbus.send, vm.listNics(vmPath));
  yield all(nicPaths.map((nicPath) => loadVmNic(dbus, vmPath, nicPath)));
}

function* loadVmDisk(dbus, vmPath, diskPath) {
  const [properties] = yield call(dbus.send, vmDisk.getAllProperties(diskPath));
  yield put({
    type: actions.VM_DISK_LOADED,
    data: {
      vmPath,
      disk: {
        path: diskPath.replace(vmPath, ''),
        ...fixKeys(properties),
      },
    },
  });
}

function* loadVmDisks(dbus, vmPath) {
  const [diskPaths] = yield call(dbus.send, vm.listDisks(vmPath));
  yield all(diskPaths.map((diskPath) => loadVmDisk(dbus, vmPath, diskPath)));
}

function* loadVm(dbus, vmPath) {
  yield put({ type: actions.VM_PATH_ACQUIRED, data: { vmPath } });
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
  yield put({ type: actions.VM_LOADED, data: { vmPath } });
}

function* loadVms(dbus) {
  const [vmPaths] = yield call(dbus.send, xenmgr.listVms());
  yield all(vmPaths.map((vmPath) => loadVm(dbus, vmPath)));
}

function* watchLoadProperties(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_PROPERTIES);
    yield fork(loadProperties, dbus, action.data.vmPath);
  }
}

function* watchLoadArgoFirewallRules(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_ARGO_FIREWALL_RULES);
    yield fork(loadArgoFirewallRules, dbus, action.data.vmPath);
  }
}

function* watchLoadPtPciDevices(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_PT_PCI_DEVICES);
    yield fork(loadPtPciDevices, dbus, action.data.vmPath);
  }
}

function* watchLoadPtRules(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_PT_RULES);
    yield fork(loadPtRules, dbus, action.data.vmPath);
  }
}

function* watchLoadNetFirewallRules(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_NET_FIREWALL_RULES);
    yield fork(loadNetFirewallRules, dbus, action.data.vmPath);
  }
}

function* watchLoadProductProperties(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_PRODUCT_PROPERTIES);
    yield fork(loadProductProperties, dbus, action.data.vmPath);
  }
}

function* watchLoadVmNics(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_NICS);
    yield fork(loadVmNics, dbus, action.data.vmPath);
  }
}

function* watchLoadVmDisks(dbus) {
  while (true) {
    const action = yield take(actions.VM_LOAD_DISKS);
    yield fork(loadVmDisks, dbus, action.data.vmPath);
  }
}

const signalMatcher = (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED
  && action.data.signal.interface === interfaces.XENMGR
);

function* signalHandler(dbus, action) {
  const { signal } = action.data;
  switch (signal.member) {
    case xenmgrSignals.VM_CREATED: {
      const [, vmPath] = signal.args;
      yield fork(loadVm, dbus, vmPath);
      break;
    }
    case xenmgrSignals.VM_DELETED: {
      const [, vmPath] = signal.args;
      yield put({
        type: actions.VM_REMOVE,
        data: { vmPath },
      });
      break;
    }
    case xenmgrSignals.VM_STATE_CHANGED: {
      const [, vmPath, vmState, vmAcpiState] = signal.args;
      yield put({
        type: actions.VM_STATE_UPDATED,
        data: { vmPath, vmState, vmAcpiState },
      });
      break;
    }
    case xenmgrSignals.VM_TRANSFER_CHANGED: {
      const [, vmPath] = signal.args;
      yield fork(loadProperty, dbus, vmPath, 'download-progress');
      break;
    }
    case xenmgrSignals.VM_CONFIG_CHANGED: {
      const [, vmPath] = signal.args;
      yield fork(loadVm, dbus, vmPath);
      break;
    }
    case xenmgrSignals.VM_NAME_CHANGED: {
      const [, vmPath] = signal.args;
      yield fork(loadProperty, dbus, vmPath, 'name');
      break;
    }
  }
}

function* startWatchers(dbus) {
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

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    loadVms(dbus),
  ]);
}
