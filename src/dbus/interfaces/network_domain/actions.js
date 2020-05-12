import dbusActions from '../../actions';
import { methods } from './constants';

export const NETWORK_DOMAIN_INITIALIZED = 'NETWORK_DOMAIN_INITIALZED';

const service = 'com.citrix.xenclient.networkdaemon';
const iface = 'com.citrix.xenclient.networkdomain';
const configIface = `${iface}.config`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = (networkPath) => ({
  getProperty: (name) => dbusActions.sendMessage(service, networkPath, freedesktopIface, 'Get', configIface, name),
  getAllProperties: () => dbusActions.sendMessage(service, networkPath, freedesktopIface, 'GetAll', configIface),
  setProperty: (name, value) => dbusActions.sendMessage(service, networkPath, freedesktopIface, 'Set', configIface, name, value),
  closeNetworkMenu: () => dbusActions.sendMessage(service, networkPath, iface, methods.CLOSE_NETWORK_MENU),
  listNetworks: () => dbusActions.sendMessage(service, networkPath, iface, methods.LIST_NETWORKS),
  popupNetworkMenu: (xOffset, yOffset) => dbusActions.sendMessage(service, networkPath, iface, methods.POPUP_NETWORK_MENU, xOffset, yOffset),
});

export default actions;
