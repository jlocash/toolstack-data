import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const methods = {
  APPLY_UPDATE_AND_REBOOT: 'apply_update_and_reboot',
  APPLY_UPDATE_AND_SHUTDOWN: 'apply_update_and_shutdown',
  CANCEL_UPDATE: 'cancel_update',
  CHECK_UPDATE: 'check_update',
  CHECK_UPDATE_LATEST: 'check_update_latest',
  DOWNLOAD_UPDATE: 'download_update',
  DOWNLOAD_UPDATE_LATEST: 'download_update_latest',
};

export const signals = {
  UPDATE_STATE_CHANGE: 'update_state_change',
  UPDATE_DOWNLOAD_PROGRESS: 'update_download_progress',
};

const path = '/';

const updatemgr = (method, ...args) => buildMessage(
  services.UPDATEMGR,
  path,
  interfaces.UPDATEMGR,
  method,
  ...args,
);

export default {
  getProperty: (name) => buildMessage(
    services.UPDATEMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.UPDATEMGR, name,
  ),
  getAllProperties: () => buildMessage(
    services.UPDATEMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.UPDATEMGR,
  ),
  setProperty: (name, value) => buildMessage(
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
