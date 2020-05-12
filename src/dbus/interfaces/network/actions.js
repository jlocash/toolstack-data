import dbusActions from '../../actions';
import { methods } from './constants';

export const NETWORK_INITIALIZED = 'NETWORK_INITIALIZED';

const service = 'com.citrix.xenclient.networkdaemon';
const iface = 'com.citrix.xenclient.network';
const configIface = `${iface}.config`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = (networkPath) => ({
  getProperty: (name) => dbusActions.sendMessage(service, networkPath, freedesktopIface, 'Get', configIface, name),
  getAllProperties: () => dbusActions.sendMessage(service, networkPath, freedesktopIface, 'GetAll', configIface),
  setProperty: (name, value) => dbusActions.sendMessage(service, networkPath, freedesktopIface, 'Set', configIface, name, value),
  configure: (subnet) => dbusActions.sendMessage(service, networkPath, iface, methods.CONFIGURE, subnet),
  isConfigured: () => dbusActions.sendMessage(service, networkPath, iface, methods.IS_CONFIGURED),
  join: (vif) => dbusActions.sendMessage(service, networkPath, iface, methods.JOIN, vif),
  leave: (vif) => dbusActions.sendMessage(service, networkPath, iface, methods.LEAVE, vif),
});

export default actions;
