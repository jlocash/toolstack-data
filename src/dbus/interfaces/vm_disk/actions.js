import dbusActions from '../../actions';

const service = 'com.citrix.xenclient.vmdisk';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = diskPath => ({
    getProperty: (name) => dbusActions.sendMessage(service, diskPath, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, diskPath, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, diskPath, freedesktopIface, 'Set', iface, name, value),
    attachPhysical: (physPath) => dbusActions.sendMessage(service, diskPath, iface, physPath),
    attachVhd: (vhdPath) => dbusActions.sendMessage(service, diskPath, iface, vhdPath),
    delete: () => dbusActions.sendMessage(service, diskPath, iface),
    generateCryptoKey: (keySize) => dbusActions.sendMessage(service, diskPath, iface, keySize),
    generateCryptoKeyIn: (keySize, dirPath) => dbusActions.sendMessage(service, diskPath, iface, keySize, dirPath),
    mount: (dirPath, readOnly) => dbusActions.sendMessage(service, diskPath, iface, dirPath, readOnly),
    umount: () => dbusActions.sendMessage(service, diskPath, iface),
});

export default actions;
