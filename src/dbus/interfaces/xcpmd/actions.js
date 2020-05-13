import dbusActions from '../../actions';
import { methods } from './constants';

export const BATTERY_INITIALIZED = 'BATTERY_INITIALIZED';

const service = 'com.citrix.xenclient.xcpmd';
const iface = service;
const path = '/';

const actions = {
  addRule: (name, conditions, actions, undoActions) => dbusActions.sendMessage(service, path, iface, methods.ADD_RULE, name, conditions, actions, undoActions),
  addVar: (name, value) => dbusActions.sendMessage(service, path, iface, methods.ADD_VAR, name, value),
  aggregateBatteryPercentage: () => dbusActions.sendMessage(service, path, iface, methods.AGGREGATE_BATTERY_PERCENTAGE),
  aggregateBatteryState: () => dbusActions.sendMessage(service, path, iface, methods.AGGREGATE_BATTERY_STATE),
  aggregateBatteryTimeToEmpty: () => dbusActions.sendMessage(service, path, iface, methods.AGGREGATE_BATTERY_TIME_TO_EMPTY),
  aggregateBatteryTimeToFull: () => dbusActions.sendMessage(service, path, iface, methods.AGGREGATE_BATTERY_TIME_TO_FULL),
  batteriesPresent: () => dbusActions.sendMessage(service, path, iface, methods.BATTERIES_PRESENT),
  batteryIsPresent: (batteryId) => dbusActions.sendMessage(service, path, iface, methods.BATTERY_IS_PRESENT, batteryId),
  batteryPercentage: (batteryId) => dbusActions.sendMessage(service, path, iface, methods.BATTERY_PERCENTAGE, batteryId),
  batteryState: (batteryId) => dbusActions.sendMessage(service, path, iface, methods.BATTERY_STATE, batteryId),
  batteryTimeToEmpty: (batteryId) => dbusActions.sendMessage(service, path, iface, methods.BATTERY_TIME_TO_EMPTY, batteryId),
  batteryTimeToFull: (batteryId) => dbusActions.sendMessage(service, path, iface, methods.BATTERY_TIME_TO_FULL, batteryId),
  clearPolicy: () => dbusActions.sendMessage(service, path, iface, methods.CLEAR_POLICY),
  clearRules: () => dbusActions.sendMessage(service, path, iface, methods.CLEAR_RULES),
  clearVars: () => dbusActions.sendMessage(service, path, iface, methods.CLEAR_VARS),
  getAcAdapterState: () => dbusActions.sendMessage(service, path, iface, methods.GET_AC_ADAPTER_STATE),
  getActions: () => dbusActions.sendMessage(service, path, iface, methods.GET_ACTIONS),
  getBif: () => dbusActions.sendMessage(service, path, iface, methods.GET_BIF),
  getBst: () => dbusActions.sendMessage(service, path, iface, methods.GET_BST),
  getConditions: () => dbusActions.sendMessage(service, path, iface, methods.GET_CONDITIONS),
  getCriticalTemperature: () => dbusActions.sendMessage(service, path, iface, methods.GET_CRITICAL_TEMPERATURE),
  getCurrentBatteryLevel: () => dbusActions.sendMessage(service, path, iface, methods.GET_CURRENT_BATTERY_LEVEL),
  getCurrentTemperature: () => dbusActions.sendMessage(service, path, iface, methods.GET_CURRENT_TEMPERATURE),
  getRules: () => dbusActions.sendMessage(service, path, iface, methods.GET_RULES),
  getVars: () => dbusActions.sendMessage(service, path, iface, methods.GET_VARS),
  hotkeySwitch: (reset) => dbusActions.sendMessage(service, path, iface, methods.HOTKEY_SWITCH, reset),
  indicateInput: (inputValue) => dbusActions.sendMessage(service, path, iface, methods.INDICATE_INPUT, inputValue),
  loadPolicyFromDb: () => dbusActions.sendMessage(service, path, iface, methods.LOAD_POLICY_FROM_DB),
  loadPolicyFromFile: (filename) => dbusActions.sendMessage(service, path, iface, methods.LOAD_POLICY_FROM_FILE, filename),
  removeRule: (name) => dbusActions.sendMessage(service, path, iface, methods.REMOVE_RULE, name),
  removeVar: (name) => dbusActions.sendMessage(service, path, iface, methods.REMOVE_VAR, name),
};

export default actions;
