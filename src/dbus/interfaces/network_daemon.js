import { services, interfaces } from '../constants';
import { buildMessage } from '../dbus';

export const signals = {
  NETWORKDAEMON_UP: 'networkdaemon_up',
  NETWORK_ADDED: 'network_added',
  NETWORK_REMOVED: 'network_removed',
  NETWORK_STATE_CHANGED: 'network_state_changed',
};

export const methods = {
  ADD_VIF: 'add_vif',
  CREATE_NETWORK: 'create_network',
  GET_NETWORK_BACKEND: 'get_network_backend',
  IS_INITIALIZED: 'is_initialized',
  IS_NETWORKING_ACTIVE: 'is_networking_active',
  LIST: 'list',
  LIST_BACKENDS: 'list_backends',
  MOVE_TO_NETWORK: 'move_to_network',
  NDVM_STATUS: 'ndvm_status',
  SHUTDOWN: 'shutdown',
  VIF_CONNECTED: 'vif_connected',
};

const path = '/';

const networkDaemon = (method, ...args) => buildMessage(
  services.NETWORK_DAEMON,
  path,
  interfaces.NETWORK_DAEMON,
  method,
  ...args,
);

const actions = {
  addVif: (domId, backendDomId, mac) => networkDaemon(
    methods.ADD_VIF,
    parseInt(domId, 10), parseInt(backendDomId, 10), mac,
  ),
  createNetwork: (networkType, id, config) => networkDaemon(
    methods.CREATE_NETWORK,
    networkType, parseInt(id, 10), config,
  ),
  getNetworkBackend: (network) => networkDaemon(methods.GET_NETWORK_BACKEND, network),
  isInitialized: () => networkDaemon(methods.IS_INITIALIZED),
  isNetworkingActive: () => networkDaemon(methods.IS_NETWORKING_ACTIVE),
  list: () => networkDaemon(methods.LIST),
  listBackends: () => networkDaemon(methods.LIST_BACKENDS),
  moveToNetwork: (vif, network) => networkDaemon(methods.MOVE_TO_NETWORK, vif, network),
  ndvmStatus: (uuid, domId, status) => networkDaemon(
    methods.NDVM_STATUS,
    uuid, parseInt(domId, 10), status,
  ),
  shutdown: () => networkDaemon(methods.SHUTDOWN),
  vifConnected: (vif, domId) => networkDaemon(methods.VIF_CONNECTED, vif, parseInt(domId, 10)),
};

export default actions;
