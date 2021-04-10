import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import methods from './constants';

export const types = {
  SET_VM_INITIALIZED: 'SET_VM_INITIALIZED',
};

const vm = (vmPath, method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM,
  method,
  ...args,
);

const vmAuth = (vmPath, method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM_AUTH,
  method,
  ...args,
);

const vmPci = (vmPath, method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM_PCI,
  method,
  ...args,
);

const vmProduct = (vmPath, method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  vmPath,
  interfaces.VM_PRODUCT,
  method,
  ...args,
);

const vmUnrestricted = (vmPath, method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  vmPath,
  interfaces.FREEDESKTOP_PROPERTIES,
  method,
  ...[interfaces.VM_UNRESTRICTED, ...args],
);

const actions = (vmPath) => ({
  // properties
  getProperty: (name) => dbusActions.sendMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM, name, value,
  ),

  // vm
  addArgoFirewallRule: (rule) => vm(vmPath, methods.ADD_ARGO_FIREWALL_RULE, rule),
  addDisk: (diskPath) => vm(vmPath, methods.ADD_DISK, diskPath),
  addNetFirewallRule: (id, direction, remoteIp, extra) => vm(
    vmPath,
    methods.ADD_NET_FIREWALL_RULE,
    id, direction, remoteIp, extra,
  ),
  addNic: (nicPath) => vm(vmPath, methods.ADD_NIC, nicPath),
  createChildServiceVm: (template) => vm(vmPath, methods.CREATE_CHILD_SERVICE_VM, template),
  delete: () => vm(vmPath, methods.DELETE),
  deleteArgoFirewallRule: (rule) => vm(vmPath, methods.DELETE_ARGO_FIREWALL_RULE, rule),
  deleteNetFirewallRule: (id) => vm(vmPath, methods.DELETE_NET_FIREWALL_RULE, id),
  destroy: () => vm(vmPath, methods.DESTROY),
  getDbKey: (key) => vm(vmPath, methods.GET_DB_KEY, key),
  getDomstoreKey: (key) => vm(vmPath, methods.GET_DOMSTORE_KEY, key),
  hibernate: () => vm(vmPath, methods.HIBERNATE),
  listArgoFirewallRules: () => vm(vmPath, methods.LIST_ARGO_FIREWALL_RULES),
  listDisks: () => vm(vmPath, methods.LIST_DISKS),
  listNetFirewallRules: () => vm(vmPath, methods.LIST_NET_FIREWALL_RULES),
  listNics: () => vm(vmPath, methods.LIST_NICS),
  pause: () => vm(vmPath, methods.PAUSE),
  readIcon: () => vm(vmPath, methods.READ_ICON),
  reboot: () => vm(vmPath, methods.REBOOT),
  resume: () => vm(vmPath, methods.RESUME),
  resumeFromFile: (file) => vm(vmPath, methods.RESUME_FROM_FILE, file),
  setDbKey: (key, value) => vm(vmPath, methods.SET_DB_KEY, key, value),
  setDomstoreKey: (key, value) => vm(vmPath, methods.SET_DOMSTORE_KEY, key, value),
  shutdown: () => vm(vmPath, methods.SHUTDOWN),
  sleep: () => vm(vmPath, methods.SLEEP),
  start: () => vm(vmPath, methods.START),
  startInternal: () => vm(vmPath, methods.START_INTERNAL),
  suspendToFile: (file) => vm(vmPath, methods.SUSPEND_TO_FILE, file),
  switch: () => vm(vmPath, methods.SWITCH),
  unpause: () => vm(vmPath, methods.UNPAUSE),

  // auth
  auth: () => vmAuth(vmPath, methods.AUTH),
  authRequired: () => vmAuth(vmPath, methods.AUTH_REQUIRED),

  // pci
  addPtRule: (pciClass, vendorId, deviceId) => vmPci(
    vmPath,
    methods.ADD_PT_RULE,
    pciClass, vendorId, deviceId,
  ),
  addPtRuleBdf: (bdf) => vmPci(vmPath, methods.ADD_PT_RULE_BDF, bdf),
  deletePtRule: (pciClass, vendorId, deviceId) => vmPci(
    vmPath,
    methods.DELETE_PT_RULE,
    pciClass, vendorId, deviceId,
  ),
  deletePtRuleBdf: (bdf) => vmPci(vmPath, methods.DELETE_PT_RULE_BDF, bdf),
  listPtPciDevices: () => vmPci(vmPath, methods.LIST_PT_PCI_DEVICES),
  listPtRules: () => vmPci(vmPath, methods.LIST_PT_RULES),

  // product
  getOvfEnvXml: () => vmProduct(vmPath, methods.GET_OVF_ENV_XML),
  getProductProperty: () => vmProduct(vmPath, methods.GET_PRODUCT_PROPERTY),
  listProductProperties: () => vmProduct(vmPath, methods.LIST_PRODUCT_PROPERTIES),
  setProductProperty: (propertyId, value) => vmProduct(
    vmPath,
    methods.SET_PRODUCT_PROPERTY,
    propertyId, value,
  ),

  // unrestricted
  unrestrictedGetProperty: (name) => vmUnrestricted(vmPath, 'Get', name),
  unrestrictedGetAllProperties: () => vmUnrestricted(vmPath, 'GetAll'),
  unrestrictedSetProperty: (name, value) => vmUnrestricted(vmPath, 'Set', name, value),
});

export default actions;
