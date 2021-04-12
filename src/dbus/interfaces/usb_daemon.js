import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const signals = {
  DEVICE_ADDED: 'device_added',
  DEVICE_REJECTED: 'device_rejected',
  OPTICAL_DEVICE_DETECTED: 'optical_device_detected',
  DEVICES_CHANGED: 'devices_changed',
  DEVICE_INFO_CHANGED: 'device_info_changed',
};

export const methods = {
  ASSIGN_DEVICE: 'assign_device',
  GET_DEVICE_INFO: 'get_device_info',
  GET_POLICY_DOMUUID: 'get_policy_domuuid',
  LIST_DEVICES: 'list_devices',
  NAME_DEVICE: 'name_device',
  NEW_VM: 'new_vm',
  RELOAD_POLICY: 'reload_policy',
  SET_POLICY_DOMUUID: 'set_policy_domuuid',
  SET_STICKY: 'set_sticky',
  STATE: 'state',
  UNASSIGN_DEVICE: 'unassign_device',
  VM_STOPPED: 'vm_stopped',
};

const path = '/';

const usbDaemon = (method, ...args) => buildMessage(
  services.USB_DAEMON,
  path,
  interfaces.USB_DAEMON,
  method,
  ...args,
);

export default {
  getProperty: (name) => buildMessage(
    services.USB_DAEMON,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.USB_DAEMON, name,
  ),
  getAllProperties: () => buildMessage(
    services.USB_DAEMON,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.USB_DAEMON,
  ),
  setProperty: (name, value) => buildMessage(
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
