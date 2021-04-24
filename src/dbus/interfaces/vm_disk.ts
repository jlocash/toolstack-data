import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export type VMDiskProperties = {
  backend_name: string;
  backend_uuid: string;
  devtype: string;
  enabled: boolean;
  encryption_key_set: boolean;
  managed_disktype: string;
  mode: string;
  phys_path: string;
  phys_type: string;
  shared: boolean;
  snapshot: string;
  // utilization_bytes: type="x"
  virt_path: string;
  virtual_size_mb: number;
};

export default {
  getProperty: (diskPath: string, name: string): Message => buildMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_DISK, name.replace(/_/g, '-'),
  ),
  getAllProperties: (diskPath: string): Message => buildMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_DISK,
  ),
  setProperty: (diskPath: string, name: string, value: string): Message => buildMessage(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_DISK, name.replace(/_/g, '-'), value,
  ),
  attachPhy: (phyPath: string): Message => buildMessage(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'attach_phy',
    phyPath,
  ),
  attachVhd: (vhdPath: string): Message => buildMessage(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'attach_vhd',
    vhdPath,
  ),
  delete: (): Message => buildMessage(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'delete',
  ),
  generateCryptoKey: (keySize: number): Message => buildMessage(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'generate_crypto_key',
    keySize,
  ),
  generateCryptoKeyIn: (keySize: number, dirPath: string): Message => buildMessage(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'generate_crypto_key_in',
    keySize, dirPath,
  ),
  mount: (dirPath: string, readOnly: boolean): Message => buildMessage(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'mount',
    dirPath, readOnly,
  ),
  umount: (): Message => buildMessage(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'umount',
  ),
};
