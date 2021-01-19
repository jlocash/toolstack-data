import dbusActions from '../../actions';
import { methods } from './constants';

export const NDVM_INITIALIZED = 'NDVM_INITIALIZED';
export const NETWORK_DAEMON_INITIALIZED = 'NETWORK_DAEMON_INITIALIZED';

const service = 'com.citrix.xenclient.networkdaemon';
const iface = service;
const path = '/';

const actions = {
  addVif: (domId, backendDomId, mac) => dbusActions.sendMessage(service, path, iface, methods.ADD_VIF, parseInt(domId), parseInt(backendDomId), mac),
  createNetwork: (networkType, id, config) => dbusActions.sendMessage(service, path, iface, methods.CREATE_NETWORK, networkType, parseInt(id), config),
  getNetworkBackend: (network) => dbusActions.sendMessage(service, path, iface, methods.GET_NETWORK_BACKEND, network),
  isInitialized: () => dbusActions.sendMessage(service, path, iface, methods.IS_INITIALIZED),
  isNetworkingActive: () => dbusActions.sendMessage(service, path, iface, methods.IS_NETWORKING_ACTIVE),
  list: () => dbusActions.sendMessage(service, path, iface, methods.LIST),
  listBackends: () => dbusActions.sendMessage(service, path, iface, methods.LIST_BACKENDS),
  moveToNetwork: (vif, network) => dbusActions.sendMessage(service, path, iface, methods.MOVE_TO_NETWORK, vif, network),
  ndvmStatus: (uuid, domId, status) => dbusActions.sendMessage(service, path, iface, methods.NDVM_STATUS, uuid, parseInt(domId), status),
  shutdown: () => dbusActions.sendMessage(service, path, iface, methods.SHUTDOWN),
  vifConnected: (vif, domId) => dbusActions.sendMessage(service, path, iface, methods.VIF_CONNECTED, vif, parseInt(domId)),
};

export default actions;
