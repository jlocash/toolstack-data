import * as DBus from '../dbus';
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
  getProperty: (diskPath: string, name: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_DISK, name.replace(/_/g, '-'),
  ),
  getAllProperties: (diskPath: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_DISK,
  ),
  setProperty: (
    diskPath: string,
    name: string,
    value: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    diskPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_DISK, name.replace(/_/g, '-'), value,
  ),
  attachPhy: (phyPath: string): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'attach_phy',
    phyPath,
  ),
  attachVhd: (vhdPath: string): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'attach_vhd',
    vhdPath,
  ),
  delete: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'delete',
  ),
  generateCryptoKey: (keySize: number): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'generate_crypto_key',
    keySize,
  ),
  generateCryptoKeyIn: (keySize: number, dirPath: string): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'generate_crypto_key_in',
    keySize, dirPath,
  ),
  mount: (dirPath: string, readOnly: boolean): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'mount',
    dirPath, readOnly,
  ),
  umount: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'umount',
  ),
};
