import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';

export const types = {
  XENMGR_UI_INITIALIZED: 'XENMGR_UI_INITIALIZED',
};

const path = '/';

export default {
  // properties
  getProperty: (name) => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.UI_CONFIG, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.UI_CONFIG,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.UI_CONFIG, name, value,
  ),
};
