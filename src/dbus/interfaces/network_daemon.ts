import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export const signals = {
  NETWORK_ADDED: 'network_added',
  NETWORK_REMOVED: 'network_removed',
  NETWORK_STATE_CHANGED: 'network_state_changed',
  NETWORKDAEMON_UP: 'networkdaemon_up',
};

export default {
  addVif: (domId: number, backendDomid: number, mac: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'add_vif',
    domId, backendDomid, mac,
  ),
  createNetwork: (networkType: string, id: number, config: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'create_network',
    networkType, id, config,
  ),
  getNetworkBackend: (network: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'get_network_backend',
    network,
  ),
  isInitialized: (): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'is_initialized',
  ),
  isNetworkingActive: (): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'is_networking_active',
  ),
  list: (): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'list',
  ),
  listBackends: (): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'list_backends',
  ),
  moveToNetwork: (vif: string, network: string): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'move_to_network',
    vif, network,
  ),
  ndvmStatus: (uuid: string, domId: number, status: number): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'ndvm_status',
    uuid, domId, status,
  ),
  shutdown: (): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'shutdown',
  ),
  vifConnected: (vif: string, domId: number): Message => buildMessage(
    services.NETWORK_DAEMON,
    '/',
    interfaces.NETWORK_DAEMON,
    'vif_connected',
    vif, domId,
  ),
};
