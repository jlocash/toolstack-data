import * as DBus from '../dbus';
import { services, interfaces } from '../constants';

const signals = {
  NETWORK_ADDED: 'network_added',
  NETWORK_REMOVED: 'network_removed',
  NETWORK_STATE_CHANGED: 'network_state_changed',
  NETWORKDAEMON_UP: 'networkdaemon_up',
};

export default {
  signals,
  addVif: (domId: number, backendDomid: number, mac: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'add_vif',
    domId, backendDomid, mac,
  ),
  createNetwork: (
    networkType: string,
    id: number,
    config: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'create_network',
    networkType, id, config,
  ),
  getNetworkBackend: (network: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'get_network_backend',
    network,
  ),
  isInitialized: (): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'is_initialized',
  ),
  isNetworkingActive: (): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'is_networking_active',
  ),
  list: (): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'list',
  ),
  listBackends: (): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'list_backends',
  ),
  moveToNetwork: (vif: string, network: string): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'move_to_network',
    vif, network,
  ),
  ndvmStatus: (uuid: string, domId: number, status: number): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'ndvm_status',
    uuid, domId, status,
  ),
  shutdown: (): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'shutdown',
  ),
  vifConnected: (vif: string, domId: number): Promise<DBus.Arguments> => DBus.send(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'vif_connected',
    vif, domId,
  ),
};
