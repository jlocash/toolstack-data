import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const networkType = {
  UNKNOWN: 'unknown',
  WIRED: 'wired',
  WIFI: 'wifi',
  MODEM: 'modem',
  INTERNAL: 'internal',
  ANY: 'any',
  VPN: 'vpn',
};

export const connectionType = {
  UNKNOWN: 'unknown',
  SHARED: 'shared',
  BRIDGED: 'bridged',
};

export const activeAccessPoint = {
  SSID: 'ssid',
  MODE: 'mode',
  FREQUENCY: 'frequency',
  STRENGTH: 'strength',
  HWADDRESS: 'hwaddress',
  MAXBITRATE: 'maxbitrate',
  WPAFLAGS: 'wpaflags',
  RSNFLAGS: 'rsnflags',
};

export const signals = {
  STATE_CHANGED: 'state_changed',
};

export const methods = {
  CONFIGURE: 'configure',
  IS_CONFIGURED: 'is_configured',
  JOIN: 'join',
  LEAVE: 'leave',
};

const network = (networkPath, method, ...args) => buildMessage(
  services.NETWORK_DAEMON,
  networkPath,
  interfaces.NETWORK,
  method,
  ...args,
);

export default {
  getProperty: (networkPath, name) => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.NETWORK_CONFIG, name,
  ),
  getAllProperties: (networkPath) => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.NETWORK_CONFIG,
  ),
  setProperty: (networkPath, name, value) => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.NETWORK_CONFIG, name, value,
  ),
  configure: (networkPath, subnet) => network(networkPath, methods.CONFIGURE, subnet),
  isConfigured: (networkPath) => network(networkPath, methods.IS_CONFIGURED),
  join: (networkPath, vif) => network(networkPath, methods.JOIN, vif),
  leave: (networkPath, vif) => network(networkPath, methods.LEAVE, vif),
};
