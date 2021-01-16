import dbusActions from '../../actions';
import { methods } from './constants';

export const UPDATEMGR_INITIALIZED = 'UPDATEMGR_INITIALIZED';

const service = 'com.citrix.xenclient.updatemgr';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
  getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
  getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
  setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
  applyUpdateAndReboot: () => dbusActions.sendMessage(service, path, iface, methods.APPLY_UPDATE_AND_REBOOT),
  applyUpdateAndShutdown: () => dbusActions.sendMessage(service, path, iface, methods.APPLY_UPDATE_AND_SHUTDOWN),
  cancelUpdate: () => dbusActions.sendMessage(service, path, iface, methods.CANCEL_UPDATE),
  checkUpdate: (url) => dbusActions.sendMessage(service, path, iface, methods.CHECK_UPDATE, url),
  checkUpdateLatest: (url) => dbusActions.sendMessage(service, path, iface, methods.CHECK_UPDATE_LATEST, url),
  downloadUpdate: (url) => dbusActions.sendMessage(service, path, iface, methods.DOWNLOAD_UPDATE, url),
  downloadUpdateLatest: (url) => dbusActions.sendMessage(service, path, iface, methods.DOWNLOAD_UPDATE_LATEST, url),
};

export default actions;
