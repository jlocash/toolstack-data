import { combineReducers } from 'redux';
import actions from './actions';

import inputReducer from './interfaces/input_daemon/reducer';
import ndvmReducer from './interfaces/network_daemon/reducer';
import updatemgrReducer from './interfaces/updatemgr/reducer';
import usbDaemonReducer from './interfaces/usb_daemon/reducer';
import vmDiskReducer from './interfaces/vm_disk/reducer';
import vmNicReducer from './interfaces/vm_nic/reducer';
import xcpmdReducer from './interfaces/xcpmd/reducer';
import xenmgrReducer from './interfaces/xenmgr/reducer';
import hostReducer from './interfaces/xenmgr_host/reducer';
import uiReducer from './interfaces/xenmgr_ui/reducer';
import vmReducer from './interfaces/xenmgr_vm/reducer';

const initialState = {
  currentId: 0,
  outgoing: {},
  interfaces: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DBUS_INCREMENT_CURRENT_ID: {
      return {
        ...state,
        currentId: state.currentId + 1,
      };
    }
    case actions.DBUS_MESSAGE_SENT: {
      return {
        ...state,
        outgoing: {
          ...state.outgoing,
          [action.data.id]: action.data,
        },
      };
    }
    case actions.DBUS_REGISTER_INTERFACE: {
      return {
        ...state,
        interfaces: [
          ...state.interfaces,
          action.data,
        ],
      };
    }
    case actions.DBUS_ERROR_RECEIVED:
    case actions.DBUS_RESPONSE_RECEIVED: {
      const outgoing = { ...state.outgoing };
      if (outgoing[action.data.received['response-to']]) {
        delete outgoing[action.data.received['response-to']];
      }

      return {
        ...state,
        outgoing,
      };
    }
  }

  return state;
};

export default combineReducers({
  messages: messageReducer,
  input: inputReducer,
  ndvms: ndvmReducer,
  updatemgr: updatemgrReducer,
  usbDevices: usbDaemonReducer,
  vmDisks: vmDiskReducer,
  vmNics: vmNicReducer,
  xcpmd: xcpmdReducer,
  xenmgr: xenmgrReducer,
  host: hostReducer,
  ui: uiReducer,
  vms: vmReducer,
});
