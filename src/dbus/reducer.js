import { combineReducers } from 'redux';
import hostReducer from './host/reducer';
import usbReducer from './usb/reducer';
import vmReducer from './vm/reducer';
import updateReducer from './update/reducer';

export default combineReducers({
  host: hostReducer,
  usb: usbReducer,
  vms: vmReducer,
  update: updateReducer,
});
