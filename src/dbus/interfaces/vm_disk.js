import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const methods = {
  ATTACH_PHYSICAL: 'attach_physical',
  ATTACH_VHD: 'attach_vhd',
  DELETE: 'delete',
  GENERATE_CRYPTO_KEY: 'generate_crypto_key',
  GENERATE_CRYPTO_KEY_IN: 'generate_crypto_key_in',
  MOUNT: 'mount',
  UMOUNT: 'umount',
};

const vmDisk = (diskPath, method, ...args) => buildMessage(
  services.XENMGR,
  diskPath,
  interfaces.VM_DISK,
  method,
  ...args,
);

export default {
  getProperty: (diskPath, name) => buildMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_DISK, name,
  ),
  getAllProperties: (diskPath) => buildMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_DISK,
  ),
  setProperty: (diskPath, name, value) => buildMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_DISK, name, value,
  ),
  attachPhysical: (diskPath, physPath) => vmDisk(diskPath, methods.ATTACH_PHYSICAL, physPath),
  attachVhd: (diskPath, vhdPath) => vmDisk(diskPath, methods.ATTACH_VHD, vhdPath),
  delete: (diskPath) => vmDisk(diskPath, methods.DELETE),
  generateCryptoKey: (diskPath, keySize) => vmDisk(diskPath, methods.GENERATE_CRYPTO_KEY, keySize),
  generateCryptoKeyIn: (diskPath, keySize, dirPath) => vmDisk(
    diskPath,
    methods.GENERATE_CRYPTO_KEY_IN,
    parseInt(keySize, 10), dirPath,
  ),
  mount: (diskPath, dirPath, readOnly) => vmDisk(diskPath, methods.MOUNT, dirPath, readOnly),
  umount: (diskPath) => vmDisk(diskPath, methods.UMOUNT),
};
