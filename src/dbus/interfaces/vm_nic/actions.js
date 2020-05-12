import dbusActions from '../../actions';
import { methods } from './constants';

export const VM_NIC_INITIALIZED = 'VM_NIC_INITIALIZED';

const service = 'com.citrix.xenclient.vmnic';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = (nicPath) => ({
  getProperty: (name) => dbusActions.sendMessage(service, nicPath, freedesktopIface, 'Get', iface, name),
  getAllProperties: () => dbusActions.sendMessage(service, nicPath, freedesktopIface, 'GetAll', iface),
  setProperty: (name, value) => dbusActions.sendMessage(service, nicPath, freedesktopIface, 'Set', iface, name, value),
  delete: () => dbusActions.sendMessage(service, nicPath, iface, methods.DELETE),
});

export default actions;
