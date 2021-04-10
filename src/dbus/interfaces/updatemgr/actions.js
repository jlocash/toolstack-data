import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { methods } from './constants';

export const UPDATEMGR_INITIALIZED = 'UPDATEMGR_INITIALIZED';

const path = '/';

const updatemgr = (method, ...args) => dbusActions.sendMessage(
  services.UPDATEMGR,
  path,
  interfaces.UPDATEMGR,
  method,
  ...args,
);

const actions = {
  getProperty: (name) => dbusActions.sendMessage(
    services.UPDATEMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.UPDATEMGR, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.UPDATEMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.UPDATEMGR,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.UPDATEMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.UPDATEMGR, name, value,
  ),
  applyUpdateAndReboot: () => updatemgr(methods.APPLY_UPDATE_AND_REBOOT),
  applyUpdateAndShutdown: () => updatemgr(methods.APPLY_UPDATE_AND_SHUTDOWN),
  cancelUpdate: () => updatemgr(methods.CANCEL_UPDATE),
  checkUpdate: (url) => updatemgr(methods.CHECK_UPDATE, url),
  checkUpdateLatest: (url) => updatemgr(methods.CHECK_UPDATE_LATEST, url),
  downloadUpdate: (url) => updatemgr(methods.DOWNLOAD_UPDATE, url),
  downloadUpdateLatest: (url) => updatemgr(methods.DOWNLOAD_UPDATE_LATEST, url),
};

export default actions;
