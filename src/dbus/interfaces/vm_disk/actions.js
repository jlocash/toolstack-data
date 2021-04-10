import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import methods from './constants';

export const types = {
  VM_DISK_INITIALIZED: 'VM_DISK_INITIALIZED',
};

const vmDisk = (diskPath, method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  diskPath,
  interfaces.VM_DISK,
  method,
  ...args,
);

export default (diskPath) => ({
  getProperty: (name) => dbusActions.sendMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_DISK, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_DISK,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_DISK, name, value,
  ),
  attachPhysical: (physPath) => vmDisk(diskPath, methods.ATTACH_PHYSICAL, physPath),
  attachVhd: (vhdPath) => vmDisk(diskPath, methods.ATTACH_VHD, vhdPath),
  delete: () => vmDisk(diskPath, methods.DELETE),
  generateCryptoKey: (keySize) => vmDisk(diskPath, methods.GENERATE_CRYPTO_KEY, keySize),
  generateCryptoKeyIn: (keySize, dirPath) => vmDisk(
    diskPath,
    methods.GENERATE_CRYPTO_KEY_IN,
    parseInt(keySize, 10), dirPath,
  ),
  mount: (dirPath, readOnly) => vmDisk(diskPath, methods.MOUNT, dirPath, readOnly),
  umount: () => vmDisk(diskPath, methods.UMOUNT),
});
