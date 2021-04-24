import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export type UpdatemgrProperties = {
  update_applicable: string;
  update_description: string;
  update_download_percent: number;
  update_download_speed: number;
  update_fail_reason: string;
  update_state: string;
  update_url: string;
};

export const signals = {
  UPDATE_DOWNLOAD_PROGRESS: 'update_download_progress',
  UPDATE_STATE_CHANGE: 'update_state_change',
};

export default {
  getProperty: (name: string): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.UPDATEMGR, name.replace(/_/g, '-'),
  ),
  getAllProperties: (): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.UPDATEMGR,
  ),
  setProperty: (name: string, value: string): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.UPDATEMGR, name.replace(/_/g, '-'), value,
  ),
  applyUpdateAndReboot: (): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'apply_update_and_reboot',
  ),
  applyUpdateAndShutdown: (): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'apply_update_and_shutdown',
  ),
  cancelUpdate: (): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'cancel_update',
  ),
  checkUpdate: (url: string): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'check_update',
    url,
  ),
  checkUpdateLatest: (url: string): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'check_update_latest',
    url,
  ),
  downloadUpdate: (url: string): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'download_update',
    url,
  ),
  downloadUpdateLatest: (url: string): Message => buildMessage(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'download_update_latest',
    url,
  ),
};
