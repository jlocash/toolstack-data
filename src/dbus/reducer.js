import { combineReducers } from 'redux';
import hostReducer from './host/reducer';
import vmReducer from './vm/reducer';
import updateReducer from './update/reducer';
import ndvmReducer from './ndvm/reducer';
import batteryReducer from './battery/reducer';

export default combineReducers({
  host: hostReducer,
  vms: vmReducer,
  update: updateReducer,
  ndvms: ndvmReducer,
  batteries: batteryReducer,
});
