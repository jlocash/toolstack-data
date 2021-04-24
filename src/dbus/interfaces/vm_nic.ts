import { buildMessage, Message } from '../dbus';
import { interfaces, services } from '../constants';

export type VMNicProperties = {
  backend_name: string;
  backend_uuid: string;
  enabled: boolean;
  mac: string;
  mac_actual: string;
  model: string;
  network: string;
  wireless_driver: boolean;
};

export default {
  getProperty: (nicPath: string, name: string): Message => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_NIC, name.replace(/_/g, '-'),
  ),
  getAllProperties: (nicPath: string): Message => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_NIC,
  ),
  setProperty: (nicPath: string, name: string, value: string): Message => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_NIC,
    name.replace(/_/g, '-'), value,
  ),
  delete: (nicPath: string): Message => buildMessage(
    services.XENMGR,
    nicPath,
    interfaces.VM_NIC,
    'delete',
  ),
};
