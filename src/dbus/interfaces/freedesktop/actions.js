import dbusActions from '../../actions';

const service = 'org.freedesktop.DBus';
const iface = service;
const path = '/org/freedesktop/DBus';

export const propertiesIface = `${iface}.Properties`

const actions = {
    hello: () => dbusActions.sendMessage(service, path, iface, 'Hello'),
    signalRegister: (name) => dbusActions.sendMessage(service, path, iface, 'AddMatch', `type='signal',interface='${name}'`),
    signalDeregister: (name) => dbusActions.sendMessage(service, path, iface, 'RemoveMatch', `type='signal',interface='${name}'`),
}

export default actions;
