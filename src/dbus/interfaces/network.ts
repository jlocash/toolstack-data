import * as DBus from '../dbus';
import { services, interfaces } from '../constants';

export type NetworkProperties = {
  active: boolean;
  backend_uuid: string;
  bridge: string;
  connection: string;
  driver: string;
  // extra_info" type=": a{ss}"
  interface: string;
  label: string;
  mac_address: string;
  name: string;
  nat_prefix: string;
  nm_managed: boolean;
  nm_state: number;
  type: string;
};

const signals = {
  STATE_CHANGED: 'state_changed',
};

export default {
  signals,
  getProperty: (networkPath: string, name: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.NETWORK_CONFIG, name.replace(/_/g, '-'),
  ),
  getAllProperties: (networkPath: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.NETWORK_CONFIG,
  ),
  setProperty: (
    networkPath: string,
    name: string,
    value: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.NETWORK_CONFIG, name.replace(/_/g, '-'), value,
  ),
  configure: (networkPath: string, subnet: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.NETWORK,
    'configure',
    subnet,
  ),
  isConfigured: (networkPath: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.NETWORK,
    'is_configured',
  ),
  join: (networkPath: string, vif: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.NETWORK,
    'join',
    vif,
  ),
  leave: (networkPath: string, vif: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    networkPath,
    interfaces.NETWORK,
    'leave',
    vif,
  ),
};
