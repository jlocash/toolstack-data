import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const methods = {
  DELETE: 'delete',
};

export default {
  getProperty: (nicPath, name) => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_NIC, name,
  ),
  getAllProperties: (nicPath) => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_NIC,
  ),
  setProperty: (nicPath, name, value) => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_NIC,
    name, value,
  ),
  delete: (nicPath) => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.VM_NIC,
    methods.DELETE,
  ),
};
