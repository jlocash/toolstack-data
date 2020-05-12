import { combineReducers } from 'redux';
import inputDaemonReducer from './interfaces/input_daemon/reducer';
import networkDaemonReducer from './interfaces/network_daemon/reducer';
import updatemgrReducer from './interfaces/updatemgr/reducer';
import usbReducer from './interfaces/usb_daemon/reducer';
import vmDiskReducer from './interfaces/vm_disk/reducer';
import vmNicReducer from './interfaces/vm_nic/reducer';
import xenmgrReducer from './interfaces/xenmgr/reducer';
import xenmgrHostReducer from './interfaces/xenmgr_host/reducer';
import xenmgrUiReducer from './interfaces/xenmgr_ui/reducer';
import xenmgrVmReducer from './interfaces/xenmgr_vm/reducer';

const dbusReducer = combineReducers({
  input: inputDaemonReducer,
  ndvms: networkDaemonReducer,
  updatemgr: updatemgrReducer,
  usbDevices: usbReducer,
  vmDisk: vmDiskReducer,
  vmNic: vmNicReducer,
  xenmgr: xenmgrReducer,
  host: xenmgrHostReducer,
  ui: xenmgrUiReducer,
  vms: xenmgrVmReducer,
});

export default dbusReducer;
