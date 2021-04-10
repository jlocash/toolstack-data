import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { methods } from './constants';

export const types = {
  USB_DEVICE_INITIALIZED: 'USB_DEVICE_INITIALIZED',
};

const path = '/';

const usbDaemon = (method, ...args) => dbusActions.sendMessage(
  services.USB_DAEMON,
  path,
  interfaces.USB_DAEMON,
  method,
  ...args,
);

const actions = {
  getProperty: (name) => dbusActions.sendMessage(
    services.USB_DAEMON,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.USB_DAEMON, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.USB_DAEMON,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.USB_DAEMON,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.USB_DAEMON,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.USB_DAEMON, name, value,
  ),
  assignDevice: (deviceId, vmUuid) => usbDaemon(
    methods.ASSIGN_DEVICE,
    parseInt(deviceId, 10), vmUuid,
  ),
  getDeviceInfo: (deviceId, vmUuid) => usbDaemon(
    methods.GET_DEVICE_INFO,
    parseInt(deviceId, 10), vmUuid,
  ),
  getPolicyDomUuid: (vmUuid) => usbDaemon(methods.GET_POLICY_DOMUUID, vmUuid),
  listDevices: () => usbDaemon(methods.LIST_DEVICES),
  nameDevice: (deviceId, name) => usbDaemon(methods.NAME_DEVICE, parseInt(deviceId, 10), name),
  newVm: (domId) => usbDaemon(methods.NEW_VM, parseInt(domId, 10)),
  reloadPolicy: () => usbDaemon(methods.RELOAD_POLICY),
  setPolicyDomUuid: (vmUuid, policy) => usbDaemon(methods.SET_POLICY_DOMUUID, vmUuid, policy),
  setSticky: (deviceId, sticky) => usbDaemon(methods.SET_STICKY, parseInt(deviceId, 10), sticky),
  state: () => usbDaemon(methods.STATE),
  unassignDevice: (deviceId) => usbDaemon(methods.UNASSIGN_DEVICE, parseInt(deviceId, 10)),
  vmStopped: (domId) => usbDaemon(methods.VM_STOPPED, parseInt(domId, 10)),
};

export default actions;
