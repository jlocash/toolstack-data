import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const signals = {
  BACKEND_STATE_CHANGED: 'backend_state_changed',
};

export const methods = {
  CLOSE_NETWORK_MENU: 'close_network_menu',
  LIST_NETWORKS: 'list_networks',
  POPUP_NETWORK_MENU: 'popup_network_menu',
};

const networkDomain = (networkPath, method, ...args) => buildMessage(
  services.NETWORK_DAEMON,
  networkPath,
  interfaces.NETWORK_DOMAIN,
  method,
  ...args,
);

export default {
  getProperty: (networkPath, name) => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.NETWORK_DOMAIN_CONFIG, name,
  ),
  getAllProperties: (networkPath) => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.NETWORK_DOMAIN_CONFIG,
  ),
  setProperty: (networkPath, name, value) => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.NETWORK_DOMAIN_CONFIG, name, value,
  ),
  closeNetworkMenu: (networkPath) => networkDomain(networkPath, methods.CLOSE_NETWORK_MENU),
  listNetworks: (networkPath) => networkDomain(networkPath, methods.LIST_NETWORKS),
  popupNetworkMenu: (networkPath, xOffset, yOffset) => networkDomain(
    networkPath,
    methods.POPUP_NETWORK_MENU,
    xOffset, yOffset,
  ),
};
