import {
  all, call, fork, put, select, take,
} from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import actions, { types } from './actions';
import xenmgr from '../xenmgr/actions';
import loadVmDisk from '../vm_disk/sagas';
import loadVmNic from '../vm_nic/sagas';
import { signals as xenmgrSignals } from '../xenmgr/constants';
import dbusActions from '../../actions';

function* loadVmNics(vmPath) {
  yield call(sendMessage, actions(vmPath).listNics());
  const vmNics = yield select((state) => state.dbus.vmNics);
  yield all(Object.keys(vmNics).map((nicPath) => call(loadVmNic, vmPath, nicPath)));
}

function* loadVmDisks(vmPath) {
  yield call(sendMessage, actions(vmPath).listDisks());
  const vmDisks = yield select((state) => state.dbus.vmDisks);
  yield all(Object.keys(vmDisks).map((diskPath) => call(loadVmDisk, vmPath, diskPath)));
}

function* loadVm(vmPath) {
  yield all([
    call(sendMessage, actions(vmPath).getAllProperties()),
    call(sendMessage, actions(vmPath).listArgoFirewallRules()),
    call(sendMessage, actions(vmPath).listPtPciDevices()),
    call(sendMessage, actions(vmPath).listPtRules()),
    call(sendMessage, actions(vmPath).listNetFirewallRules()),
    call(sendMessage, actions(vmPath).listProductProperties()),
    call(loadVmNics, vmPath),
    call(loadVmDisks, vmPath),
  ]);

  yield put({
    type: types.SET_VM_INITIALIZED,
    data: {
      vmPath,
      initialized: true,
    },
  });
}

function* loadVms() {
  yield call(sendMessage, xenmgr.listVms());
  const vms = yield select((state) => state.dbus.vms);
  yield all(Object.keys(vms).map((vmPath) => call(loadVm, vmPath)));
}

const signalMatcher = (action) => {
  const { type, data } = action;
  if (type === dbusActions.DBUS_SIGNAL_RECEIVED) {
    switch (data.interface) {
      case 'com.citrix.xenclient.xenmgr':
        return true;
    }
  }

  return false;
};

function* watchSignals() {
  while (true) {
    const { data } = yield take(signalMatcher);
    switch (data.member) {
      case xenmgrSignals.VM_CONFIG_CHANGED: {
        const [, vmPath] = data.args;
        yield fork(loadVm, vmPath);
        break;
      }
      case xenmgrSignals.VM_NAME_CHANGED: {
        const [, vmPath] = data.args;
        yield fork(sendMessage, actions(vmPath).getProperty('name'));
      }
    }
  }
}

function* initialize() {
  yield all([
    loadVms(),
    watchSignals(),
  ]);
}

export default initialize;
