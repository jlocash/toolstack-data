import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

const path = '/';

export default {
  // properties
  getProperty: (name) => buildMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.UI_CONFIG, name,
  ),
  getAllProperties: () => buildMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.UI_CONFIG,
  ),
  setProperty: (name, value) => buildMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.UI_CONFIG, name, value,
  ),
};
