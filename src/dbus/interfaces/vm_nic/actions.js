import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import methods from './constants';

export const types = {
  VM_NIC_INITIALIZED: 'VM_NIC_INITIALIZED',
};

const actions = (nicPath) => ({
  getProperty: (name) => dbusActions.sendMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_NIC, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_NIC,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_NIC,
    name, value,
  ),
  delete: () => dbusActions.sendMessage(
    services.XENMGR,
    nicPath,
    interfaces.VM_NIC,
    methods.DELETE,
  ),
});

export default actions;
