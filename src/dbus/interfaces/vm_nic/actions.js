import dbusActions from '../../actions';

const service = 'com.citrix.xenclient.vmnic';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = nicPath => ({
    getProperty: (name) => dbusActions.sendMessage(service, nicPath, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, nicPath, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, nicPath, freedesktopIface, 'Set', iface, name, value),
    delete: () => dbusActions.sendMessage(service, nicPath, iface),
});

export default actions;
