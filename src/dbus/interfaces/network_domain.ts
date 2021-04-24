import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export type NetworkDomainProperties = {
  domid: number;
  is_networking_active: boolean;
  name: string;
  nm_state: number;
  uuid: string;
};

export const signals = {
  BACKEND_STATE_CHANGED: 'backend_state_changed',
};

export default {
  getProperty: (networkPath: string, name: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.NETWORK_DOMAIN_CONFIG, name.replace(/_/g, '-'),
  ),
  getAllProperties: (networkPath: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.NETWORK_DOMAIN_CONFIG,
  ),
  setProperty: (networkPath: string, name: string, value: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.NETWORK_DOMAIN_CONFIG, name.replace(/_/g, '-'), value,
  ),
  closeNetworkMenu: (networkPath: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.NETWORK_DOMAIN,
    'close_network_menu',
  ),
  listNetworks: (networkPath: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.NETWORK_DOMAIN,
    'list_networks',
  ),
  popupNetworkMenu: (networkPath: string, xOff: number, yOff: number): Message => buildMessage(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.NETWORK_DOMAIN,
    'popup_network_menu',
    xOff, yOff,
  ),
};
