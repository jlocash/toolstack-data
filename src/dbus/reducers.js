import { combineReducers } from 'redux';
import usbReducer from './interfaces/ctxusb_daemon/reducer';
import inputDaemon from './interfaces/input_daemon/reducer';
import networkReducer from './interfaces/network/reducer';
import networkDomainReducer from './interfaces/network_domain/reducer';
import updatemgrReducer from './interfaces/updatemgr/reducer';
import vmDiskReducer from './interfaces/vm_disk/reducer';
import vmNicReducer from './interfaces/vm_nic/reducer';
import xenmgrReducer from './interfaces/xenmgr/reducer';
import xenmgrHostReducer from './interfaces/xenmgr_host/reducer';
import xenmgrUiReducer from './interfaces/xenmgr_ui/reducer';
import xenmgrVmReducer from './interfaces/xenmgr_vm/reducer';

const dbusReducer = combineReducers({
    usb: usbReducer,
    input: inputDaemon,
    network: networkReducer,
    networkDomain: networkDomainReducer,
    updatemgr: updatemgrReducer,
    vmDisk: vmDiskReducer,
    vmNic: vmNicReducer,
    xenmgr: xenmgrReducer,
    host: xenmgrHostReducer,
    ui: xenmgrUiReducer,
    vms: xenmgrVmReducer,
});

export default dbusReducer;
