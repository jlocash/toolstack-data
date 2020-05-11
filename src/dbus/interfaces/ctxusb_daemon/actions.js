import dbusActions from '../../actions';
import methods from './methods';

const service = 'com.citrix.xenclient.usbdaemon';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/'

const actions = {
    getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
    assignDevice: (deviceId, vmUuid) => dbusActions.sendMessage(service, path, iface, methods.ASSIGN_DEVICE, deviceId, vmUuid),
    getDeviceInfo: (deviceId, vmUuid) => dbusActions.sendMessage(service, path, iface, methods.GET_DEVICE_INFO, deviceId, vmUuid),
    getPolicyDomUuid: (vmUuid) => dbusActions.sendMessage(service, path, iface, methods.GET_POLICY_DOMUUID, vmUuid),
    listDevices: () => dbusActions.sendMessage(service, path, iface, methods.LIST_DEVICES),
    nameDevice: (deviceId, name) => dbusActions.sendMessage(service, path, iface, methods.NAME_DEVICE, deviceId, name),
    newVm: (domId) => dbusActions.sendMessage(service, path, iface, methods.NEW_VM, domId),
    reloadPolicy: () => dbusActions.sendMessage(service, path, iface, methods.RELOAD_POLICY),
    setPolicyDomUuid: (vmUuid, policy) => dbusActions.sendMessage(service, path, iface, methods.SET_POLICY_DOMUUID, vmUuid, policy),
    setSticky: (deviceId, sticky) => dbusActions.sendMessage(service, path, iface, methods.SET_STICKY, deviceId, sticky),
    state: () => dbusActions.sendMessage(service, path, iface, methods.STATE),
    unassignDevice: (deviceId) => dbusActions.sendMessage(service, path, iface, methods.UNASSIGN_DEVICE, deviceId),
    vmStopped: (domId) => dbusActions.sendMessage(service, path, iface, methods.VM_STOPPED, domId),
};

export default actions;
