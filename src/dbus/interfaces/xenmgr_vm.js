import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const methods = {
  // vm
  ADD_ARGO_FIREWALL_RULE: 'add_argo_firewall_rule',
  ADD_DISK: 'add_disk',
  ADD_NET_FIREWALL_RULE: 'add_net_firewall_rule',
  ADD_NIC: 'add_nic',
  CREATE_CHILD_SERVICE_VM: 'create_child_service_vm',
  DELETE: 'delete',
  DELETE_ARGO_FIREWALL_RULE: 'delete_argo_firewall_rule',
  DELETE_NET_FIREWALL_RULE: 'delete_net_firewall_rule',
  DESTROY: 'destroy',
  GET_DB_KEY: 'get_db_key',
  GET_DOMSTORE_KEY: 'get_domstore_key',
  HIBERNATE: 'hibernate',
  LIST_ARGO_FIREWALL_RULES: 'list_argo_firewall_rules',
  LIST_DISKS: 'list_disks',
  LIST_NET_FIREWALL_RULES: 'list_net_firewall_rules',
  LIST_NICS: 'list_nics',
  PAUSE: 'pause',
  READ_ICON: 'read_icon',
  REBOOT: 'reboot',
  RESUME: 'resume',
  RESUME_FROM_FILE: 'resume_from_file',
  SET_DB_KEY: 'set_db_key',
  SET_DOMSTORE_KEY: 'set_domstore_key',
  SHUTDOWN: 'shutdown',
  SLEEP: 'sleep',
  START: 'start',
  START_INTERNAL: 'start_internal',
  SUSPEND_TO_FILE: 'suspend_to_file',
  SWITCH: 'switch',
  UNPAUSE: 'unpause',

  // auth
  AUTH: 'auth',
  AUTH_REQUIRED: 'auth_required',

  // pci
  ADD_PT_RULE: 'add_pt_rule',
  ADD_PT_RULE_BDF: 'add_pt_rule_bdf',
  DELETE_PT_RULE: 'delete_pt_rule',
  DELETE_PT_RULE_BDF: 'delete_pt_rule_bdf',
  LIST_PT_PCI_DEVICES: 'list_pt_pci_devices',
  LIST_PT_RULES: 'list_pt_rules',

  // product
  GET_OVF_ENV_XML: 'get_ovf_env_xml',
  GET_PRODUCT_PROPERTY: 'get_product_property',
  LIST_PRODUCT_PROPERTIES: 'list_product_properties',
  SET_PRODUCT_PROPERTY: 'set_product_property',
};

export const types = {
  SET_VM_INITIALIZED: 'SET_VM_INITIALIZED',
};

const vm = (vmPath, method, ...args) => buildMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM,
  method,
  ...args,
);

const vmAuth = (vmPath, method, ...args) => buildMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM_AUTH,
  method,
  ...args,
);

const vmPci = (vmPath, method, ...args) => buildMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM_PCI,
  method,
  ...args,
);

const vmProduct = (vmPath, method, ...args) => buildMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM_PRODUCT,
  method,
  ...args,
);

const vmUnrestricted = (vmPath, method, ...args) => buildMessage(
  services.XENMGR,
  vmPath,
  interfaces.FREEDESKTOP_PROPERTIES,
  method,
  ...[interfaces.VM_UNRESTRICTED, ...args],
);

export default {
  // properties
  getProperty: (vmPath, name) => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM, name,
  ),
  getAllProperties: (vmPath) => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM,
  ),
  setProperty: (vmPath, name, value) => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM, name, value,
  ),

  // vm
  addArgoFirewallRule: (vmPath, rule) => vm(vmPath, methods.ADD_ARGO_FIREWALL_RULE, rule),
  addDisk: (vmPath, diskPath) => vm(vmPath, methods.ADD_DISK, diskPath),
  addNetFirewallRule: (vmPath, id, direction, remoteIp, extra) => vm(
    vmPath,
    methods.ADD_NET_FIREWALL_RULE,
    id, direction, remoteIp, extra,
  ),
  addNic: (vmPath, nicPath) => vm(vmPath, methods.ADD_NIC, nicPath),
  createChildServiceVm: (vmPath, template) => vm(vmPath, methods.CREATE_CHILD_SERVICE_VM, template),
  delete: (vmPath) => vm(vmPath, methods.DELETE),
  deleteArgoFirewallRule: (vmPath, rule) => vm(vmPath, methods.DELETE_ARGO_FIREWALL_RULE, rule),
  deleteNetFirewallRule: (vmPath, id) => vm(vmPath, methods.DELETE_NET_FIREWALL_RULE, id),
  destroy: (vmPath) => vm(vmPath, methods.DESTROY),
  getDbKey: (vmPath, key) => vm(vmPath, methods.GET_DB_KEY, key),
  getDomstoreKey: (vmPath, key) => vm(vmPath, methods.GET_DOMSTORE_KEY, key),
  hibernate: (vmPath) => vm(vmPath, methods.HIBERNATE),
  listArgoFirewallRules: (vmPath) => vm(vmPath, methods.LIST_ARGO_FIREWALL_RULES),
  listDisks: (vmPath) => vm(vmPath, methods.LIST_DISKS),
  listNetFirewallRules: (vmPath) => vm(vmPath, methods.LIST_NET_FIREWALL_RULES),
  listNics: (vmPath) => vm(vmPath, methods.LIST_NICS),
  pause: (vmPath) => vm(vmPath, methods.PAUSE),
  readIcon: (vmPath) => vm(vmPath, methods.READ_ICON),
  reboot: (vmPath) => vm(vmPath, methods.REBOOT),
  resume: (vmPath) => vm(vmPath, methods.RESUME),
  resumeFromFile: (vmPath, file) => vm(vmPath, methods.RESUME_FROM_FILE, file),
  setDbKey: (vmPath, key, value) => vm(vmPath, methods.SET_DB_KEY, key, value),
  setDomstoreKey: (vmPath, key, value) => vm(vmPath, methods.SET_DOMSTORE_KEY, key, value),
  shutdown: (vmPath) => vm(vmPath, methods.SHUTDOWN),
  sleep: (vmPath) => vm(vmPath, methods.SLEEP),
  start: (vmPath) => vm(vmPath, methods.START),
  startInternal: (vmPath) => vm(vmPath, methods.START_INTERNAL),
  suspendToFile: (vmPath, file) => vm(vmPath, methods.SUSPEND_TO_FILE, file),
  switch: (vmPath) => vm(vmPath, methods.SWITCH),
  unpause: (vmPath) => vm(vmPath, methods.UNPAUSE),

  // auth
  auth: (vmPath) => vmAuth(vmPath, methods.AUTH),
  authRequired: (vmPath) => vmAuth(vmPath, methods.AUTH_REQUIRED),

  // pci
  addPtRule: (vmPath, pciClass, vendorId, deviceId) => vmPci(
    vmPath,
    methods.ADD_PT_RULE,
    pciClass, vendorId, deviceId,
  ),
  addPtRuleBdf: (vmPath, bdf) => vmPci(vmPath, methods.ADD_PT_RULE_BDF, bdf),
  deletePtRule: (vmPath, pciClass, vendorId, deviceId) => vmPci(
    vmPath,
    methods.DELETE_PT_RULE,
    pciClass, vendorId, deviceId,
  ),
  deletePtRuleBdf: (vmPath, bdf) => vmPci(vmPath, methods.DELETE_PT_RULE_BDF, bdf),
  listPtPciDevices: (vmPath) => vmPci(vmPath, methods.LIST_PT_PCI_DEVICES),
  listPtRules: (vmPath) => vmPci(vmPath, methods.LIST_PT_RULES),

  // product
  getOvfEnvXml: (vmPath) => vmProduct(vmPath, methods.GET_OVF_ENV_XML),
  getProductProperty: (vmPath) => vmProduct(vmPath, methods.GET_PRODUCT_PROPERTY),
  listProductProperties: (vmPath) => vmProduct(vmPath, methods.LIST_PRODUCT_PROPERTIES),
  setProductProperty: (vmPath, propertyId, value) => vmProduct(
    vmPath,
    methods.SET_PRODUCT_PROPERTY,
    propertyId, value,
  ),

  // unrestricted
  unrestrictedGetProperty: (vmPath, name) => vmUnrestricted(vmPath, 'Get', name),
  unrestrictedGetAllProperties: (vmPath) => vmUnrestricted(vmPath, 'GetAll'),
  unrestrictedSetProperty: (vmPath, name, value) => vmUnrestricted(vmPath, 'Set', name, value),
};
