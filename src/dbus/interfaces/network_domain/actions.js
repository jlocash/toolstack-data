import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { methods } from './constants';

export const NDVM_INITIALIZED = 'NDVM_INITIALIZED';

const service = 'com.citrix.xenclient.networkdaemon';
const iface = 'com.citrix.xenclient.networkdomain';
const configIface = `${iface}.config`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const networkDomain = (networkPath, method, ...args) => dbusActions.sendMessage(
  services.NETWORK_DAEMON,
  networkPath,
  interfaces.NETWORK_DOMAIN,
  method,
  ...args,
);

const actions = (networkPath) => ({
  getProperty: (name) => dbusActions.sendMessage(
    service,
    networkPath,
    freedesktopIface,
    'Get',
    configIface,
    name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    service,
    networkPath,
    freedesktopIface,
    'GetAll',
    configIface,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    service,
    networkPath,
    freedesktopIface,
    'Set',
    configIface,
    name, value,
  ),
  closeNetworkMenu: () => networkDomain(networkPath, methods.CLOSE_NETWORK_MENU),
  listNetworks: () => networkDomain(networkPath, methods.LIST_NETWORKS),
  popupNetworkMenu: (xOffset, yOffset) => networkDomain(
    networkPath,
    methods.POPUP_NETWORK_MENU,
    xOffset, yOffset,
  ),
});

export default actions;
