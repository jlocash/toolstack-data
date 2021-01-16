import { combineReducers } from 'redux';
import inputDaemonReducer from './interfaces/input_daemon/reducer';
import networkDaemonReducer from './interfaces/network_daemon/reducer';
import updatemgrReducer from './interfaces/updatemgr/reducer';
import usbReducer from './interfaces/usb_daemon/reducer';
import xcpmdReducer from './interfaces/xcpmd/reducer';
import xenmgrReducer from './interfaces/xenmgr/reducer';
import xenmgrHostReducer from './interfaces/xenmgr_host/reducer';
import xenmgrUiReducer from './interfaces/xenmgr_ui/reducer';
import xenmgrVmReducer from './interfaces/xenmgr_vm/reducer';
import vmNicReducer from './interfaces/vm_nic/reducer';
import vmDiskReducer from './interfaces/vm_disk/reducer';

const dbusReducer = combineReducers({
  input: inputDaemonReducer,
  ndvms: networkDaemonReducer,
  updatemgr: updatemgrReducer,
  usbDevices: usbReducer,
  batteries: xcpmdReducer,
  xenmgr: xenmgrReducer,
  host: xenmgrHostReducer,
  ui: xenmgrUiReducer,
  vms: xenmgrVmReducer,
  vmNics: vmNicReducer,
  vmDisks: vmDiskReducer,
});

export default dbusReducer;
