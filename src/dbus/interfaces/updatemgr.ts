import * as DBus from '../dbus';
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
  getProperty: (name: string): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.UPDATEMGR, name.replace(/_/g, '-'),
  ),
  getAllProperties: (): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.UPDATEMGR,
  ),
  setProperty: (name: string, value: string): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.UPDATEMGR, name.replace(/_/g, '-'), value,
  ),
  applyUpdateAndReboot: (): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'apply_update_and_reboot',
  ),
  applyUpdateAndShutdown: (): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'apply_update_and_shutdown',
  ),
  cancelUpdate: (): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'cancel_update',
  ),
  checkUpdate: (url: string): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'check_update',
    url,
  ),
  checkUpdateLatest: (url: string): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'check_update_latest',
    url,
  ),
  downloadUpdate: (url: string): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'download_update',
    url,
  ),
  downloadUpdateLatest: (url: string): Promise<DBus.Arguments> => DBus.send(
    services.UPDATEMGR,
    '/',
    interfaces.UPDATEMGR,
    'download_update_latest',
    url,
  ),
};
