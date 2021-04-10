import dbusActions from '../../actions';
import { methods } from './constants';
import { services, interfaces } from '../../constants';

export const types = {
  NDVM_INITIALIZED: 'NDVM_INITIALIZED',
  NETWORK_DAEMON_INITIALIZED: 'NETWORK_DAEMON_INITIALIZED',
};

const path = '/';

const networkDaemon = (method, ...args) => dbusActions.sendMessage(
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
