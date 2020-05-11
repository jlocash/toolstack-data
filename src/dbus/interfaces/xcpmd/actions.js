import dbusActions from '../../actions';

const service = 'com.citrix.xenclient.xcpmd';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
    getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
    addRule: (name, conditions, actions, undoActions) => dbusActions.sendMessage(service, path, iface, 'add_rule', name, conditions, actions, undoActions),
    addVar: (name, value) => dbusActions.sendMessage(service, path, iface, 'add_var', name, value),
    aggregateBatteryPercentage: () => dbusActions.sendMessage(service, path, iface, 'aggregate_battery_percentage'),
    aggregateBatteryState: () => dbusActions.sendMessage(service, path, iface, 'aggregate_battery_state'),
    aggregateBatteryTimeToEmpty: () => dbusActions.sendMessage(service, path, iface, 'aggregate_battery_time_to_empty'),
    aggregateBatteryTimeToFull: () => dbusActions.sendMessage(service, path, iface, 'aggregate_battery_time_to_full'),
    batteriesPresent: () => dbusActions.sendMessage(service, path, iface, 'batteries_present'),
    batteryIsPresent: (batteryId) => dbusActions.sendMessage(service, path, iface, 'battery_is_present', batteryId),
    batteryPercentage: (batteryId) => dbusActions.sendMessage(service, path, iface, 'battery_percentage', batteryId),
    batteryState: (batteryId) => dbusActions.sendMessage(service, path, iface, 'battery_state', batteryId),
    batteryTimeToEmpty: (batteryId) => dbusActions.sendMessage(service, path, iface, 'battery_time_to_empty', batteryId),
    batteryTimeToFull: (batteryId) => dbusActions.sendMessage(service, path, iface, 'battery_time_to_full', batteryId),
    clearPolicy: () => dbusActions.sendMessage(service, path, iface, 'clear_policy'),
    clearRules: () => dbusActions.sendMessage(service, path, iface, 'clear_rules'),
    clearVars: () => dbusActions.sendMessage(service, path, iface, 'clear_vars'),
    getAcAdapterState: () => dbusActions.sendMessage(service, path, iface, 'get_ac_adapter_state'),
    getActions: () => dbusActions.sendMessage(service, path, iface, 'get_actions'),
    getBif: () => dbusActions.sendMessage(service, path, iface, 'get_bif'),
    getBst: () => dbusActions.sendMessage(service, path, iface, 'get_bst'),
    getConditions: () => dbusActions.sendMessage(service, path, iface, 'get_conditions'),
    getCriticalTemperature: () => dbusActions.sendMessage(service, path, iface, 'get_critical_temperature'),
    getCurrentBatteryLevel: () => dbusActions.sendMessage(service, path, iface, 'get_current_battery_level'),
    getCurrentTemperature: () => dbusActions.sendMessage(service, path, iface, 'get_current_temperature'),
    getRules: () => dbusActions.sendMessage(service, path, iface, 'get_rules'),
    getVars: () => dbusActions.sendMessage(service, path, iface, 'get_vars'),
    hotkeySwitch: (reset) => dbusActions.sendMessage(service, path, iface, 'hotkey_switch', reset),
    indicateInput: (inputValue) => dbusActions.sendMessage(service, path, iface, 'indicate_input', inputValue),
    loadPolicyFromDb: () => dbusActions.sendMessage(service, path, iface, 'load_policy_from_db'),
    loadPolicyFromFile: (filename) => dbusActions.sendMessage(service, path, iface, 'load_policy_from_file', filename),
    removeRule: (name) => dbusActions.sendMessage(service, path, iface, 'remove_rule', name),
    removeVar: (name) => dbusActions.sendMessage(service, path, iface, 'remove_var', name),
};

export default actions;
