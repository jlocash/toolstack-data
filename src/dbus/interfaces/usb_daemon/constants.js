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
