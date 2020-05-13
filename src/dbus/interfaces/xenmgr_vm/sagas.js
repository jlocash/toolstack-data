import { all, call, put, select } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions, { VM_INITIALIZED } from './actions';
import xenmgr from '../xenmgr/actions';
import { loadVmDisk } from '../vm_disk/sagas';
import { loadVmNic } from '../vm_nic/sagas';

function* loadVmNics(vmPath) {
  yield call(sendMessage, actions(vmPath).listNics());
  const vmNics = yield select(state => state.dbus.vms[vmPath].nics);
  yield all(Object.keys(vmNics).map(nicPath => call(loadVmNic, vmPath, nicPath)));
}

function* loadVmDisks(vmPath) {
  yield call(sendMessage, actions(vmPath).listDisks());
  const vmDisks = yield select(state => state.dbus.vms[vmPath].disks);
  yield all(Object.keys(vmDisks).map(diskPath => call(loadVmDisk, vmPath, diskPath)));
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
    type: VM_INITIALIZED,
    payload: {
      vmPath,
    },
  });
}

function* initialize() {
  yield call(sendMessage, xenmgr.listVms());
  const vms = yield select((state) => state.dbus.vms);
  yield all(Object.keys(vms).map(vmPath => call(loadVm, vmPath)));
}

export default initialize;
