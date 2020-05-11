import dbusActions from '../../actions';

const service = 'com.citrix.xenclient.updatemgr';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
    getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
    applyUpdateAndReboot: () => dbusActions.sendMessage(service, path, iface, 'apply_update_and_reboot'),
    applyUpdateAndShutdown: () => dbusActions.sendMessage(service, path, iface, 'apply_update_and_shutdown'),
    cancelUpdate: () => dbusActions.sendMessage(service, path, iface, 'cancel_update'),
    checkUpdate: (url) => dbusActions.sendMessage(service, path, iface, 'check_update', url),
    checkUpdateLatest: (url) => dbusActions.sendMessage(service, path, iface, 'check_update_latest', url),
    downloadUpdate: (url) => dbusActions.sendMessage(service, path, iface, 'download_update', url),
    downloadUpdateLatest: (url) => dbusActions.sendMessage(service, path, iface, 'download_update_latest', url),
};

export default actions;
