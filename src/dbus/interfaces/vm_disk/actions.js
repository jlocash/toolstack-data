import dbusActions from '../../actions';
import { methods } from './constants';

export const VM_DISK_INITIALIZED = 'VM_DISK_INITIALIZED';

const service = 'com.citrix.xenclient.xenmgr';
const iface = 'com.citrix.xenclient.vmdisk';
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = (diskPath) => ({
  getProperty: (name) => dbusActions.sendMessage(service, diskPath, freedesktopIface, 'Get', iface, name),
  getAllProperties: () => dbusActions.sendMessage(service, diskPath, freedesktopIface, 'GetAll', iface),
  setProperty: (name, value) => dbusActions.sendMessage(service, diskPath, freedesktopIface, 'Set', iface, name, value),
  attachPhysical: (physPath) => dbusActions.sendMessage(service, diskPath, iface, methods.ATTACH_PHYSICAL, physPath),
  attachVhd: (vhdPath) => dbusActions.sendMessage(service, diskPath, iface, methods.ATTACH_VHD, vhdPath),
  delete: () => dbusActions.sendMessage(service, diskPath, iface, methods.DELETE),
  generateCryptoKey: (keySize) => dbusActions.sendMessage(service, diskPath, iface, methods.GENERATE_CRYPTO_KEY, keySize),
  generateCryptoKeyIn: (keySize, dirPath) => dbusActions.sendMessage(service, diskPath, iface, methods.GENERATE_CRYPTO_KEY_IN, parseInt(keySize), dirPath),
  mount: (dirPath, readOnly) => dbusActions.sendMessage(service, diskPath, iface, methods.MOUNT, dirPath, readOnly),
  umount: () => dbusActions.sendMessage(service, diskPath, iface, methods.UMOUNT),
});

export default actions;
