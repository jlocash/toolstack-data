import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import methods from './constants';

export const types = {
  BATTERY_INITIALIZED: 'BATTERY_INITIALIZED',
};

const path = '/';

const xcpmd = (method, ...args) => dbusActions.sendMessage(
  services.XCPMD,
  path,
  interfaces.XCPMD,
  method,
  ...args,
);

export default {
  addRule: (name, conditions, actions, undoActions) => xcpmd(
    methods.ADD_RULE,
    name, conditions, actions, undoActions,
  ),
  addVar: (name, value) => xcpmd(methods.ADD_VAR, name, value),
  aggregateBatteryPercentage: () => xcpmd(methods.AGGREGATE_BATTERY_PERCENTAGE),
  aggregateBatteryState: () => xcpmd(methods.AGGREGATE_BATTERY_STATE),
  aggregateBatteryTimeToEmpty: () => xcpmd(methods.AGGREGATE_BATTERY_TIME_TO_EMPTY),
  aggregateBatteryTimeToFull: () => xcpmd(methods.AGGREGATE_BATTERY_TIME_TO_FULL),
  batteriesPresent: () => xcpmd(methods.BATTERIES_PRESENT),
  batteryIsPresent: (batteryId) => xcpmd(methods.BATTERY_IS_PRESENT, batteryId),
  batteryPercentage: (batteryId) => xcpmd(methods.BATTERY_PERCENTAGE, batteryId),
  batteryState: (batteryId) => xcpmd(methods.BATTERY_STATE, batteryId),
  batteryTimeToEmpty: (batteryId) => xcpmd(methods.BATTERY_TIME_TO_EMPTY, batteryId),
  batteryTimeToFull: (batteryId) => xcpmd(methods.BATTERY_TIME_TO_FULL, batteryId),
  clearPolicy: () => xcpmd(methods.CLEAR_POLICY),
  clearRules: () => xcpmd(methods.CLEAR_RULES),
  clearVars: () => xcpmd(methods.CLEAR_VARS),
  getAcAdapterState: () => xcpmd(methods.GET_AC_ADAPTER_STATE),
  getActions: () => xcpmd(methods.GET_ACTIONS),
  getBif: () => xcpmd(methods.GET_BIF),
  getBst: () => xcpmd(methods.GET_BST),
  getConditions: () => xcpmd(methods.GET_CONDITIONS),
  getCriticalTemperature: () => xcpmd(methods.GET_CRITICAL_TEMPERATURE),
  getCurrentBatteryLevel: () => xcpmd(methods.GET_CURRENT_BATTERY_LEVEL),
  getCurrentTemperature: () => xcpmd(methods.GET_CURRENT_TEMPERATURE),
  getRules: () => xcpmd(methods.GET_RULES),
  getVars: () => xcpmd(methods.GET_VARS),
  hotkeySwitch: (reset) => xcpmd(methods.HOTKEY_SWITCH, reset),
  indicateInput: (inputValue) => xcpmd(methods.INDICATE_INPUT, inputValue),
  loadPolicyFromDb: () => xcpmd(methods.LOAD_POLICY_FROM_DB),
  loadPolicyFromFile: (filename) => xcpmd(methods.LOAD_POLICY_FROM_FILE, filename),
  removeRule: (name) => xcpmd(methods.REMOVE_RULE, name),
  removeVar: (name) => xcpmd(methods.REMOVE_VAR, name),
};
