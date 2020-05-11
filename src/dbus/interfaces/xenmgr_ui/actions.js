import dbusActions from '../../actions';

const service = 'com.citrix.xenclient.xenmgr';
const iface = service;
const configIface = `${iface}.config.ui`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
    getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', configIface, name),
    getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', configIface),
    setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', configIface, name, value),
};

export default actions;
