import * as DBus from '../dbus';
import { services, interfaces } from '../constants';

export const signals = {
  DEVICE_ADDED: 'device_added',
  DEVICE_INFO_CHANGED: 'device_info_changed',
  DEVICE_REJECTED: 'device_rejected',
  DEVICES_CHANGED: 'devices_changed',
  OPTICAL_DEVICE_DETECTED: 'optical_device_detected',
};

export default {
  assignDevice: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'assign_device',
  ),
  getDeviceInfo: (deviceId: number, vmUuid = ''): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'get_device_info',
    deviceId, vmUuid,
  ),
  listDevices: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'list_devices',
  ),
  nameDevice: (deviceId: number, name: string): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'name_device',
    deviceId, name,
  ),
  newVm: (domId: number): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'new_vm',
    domId,
  ),
  policyGetRule: (ruleId: number): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'policy_get_rule',
    ruleId,
  ),
  policyGetRules: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'policy_get_rules',
  ),
  policyList: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'policy_list',
  ),
  policyRemoveRule: (ruleId: number): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'policy_remove_rule',
    ruleId,
  ),
  policySetRule: (
    ruleId: number,
    command: string,
    desc: string,
    vendorId: string,
    deviceId: string,
    serial: string,
    sysAttrs: { [key: string]: string },
    udevProperties: { [key: string]: string },
    vmUuid: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'policy_set_rule',
    ruleId, command, desc, vendorId, deviceId, serial, sysAttrs, udevProperties, vmUuid,
  ),
  policySetRuleAdvanced: (ruleId: number, command: string, desc: string,
    sysAttrs: { [key: string]: string }, udevProperties: { [key: string]: string },
    vmUuid: string): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'policy_set_rule_advanced',
    ruleId, command, desc, sysAttrs, udevProperties, vmUuid,
  ),
  policySetRuleBasic: (ruleId: number, command: string, desc: string, vendorId: string,
    deviceId: string, serial: string, vmUuid: string): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'policy_set_rule_basic',
    ruleId, command, desc, vendorId, deviceId, serial, vmUuid,
  ),
  reloadPolicy: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'reload_policy',
  ),
  setSticky: (deviceId: number, sticky: 0 | 1): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'set_sticky',
    deviceId, sticky,
  ),
  state: (): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'state',
  ),
  unassignDevice: (deviceId: number): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'unassign_device',
    deviceId,
  ),
  vmStopped: (domId: number): Promise<DBus.Arguments> => DBus.send(
    services.USB_DAEMON,
    '/',
    interfaces.USB_DAEMON,
    'vm_stopped',
    domId,
  ),
};
