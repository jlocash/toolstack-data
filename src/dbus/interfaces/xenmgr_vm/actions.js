import dbusActions from '../../actions';
import { methods } from './constants';

export const XENMGR_VM_INITIALIZED = 'XENMGR_VM_INITIALIZED';

const service = 'com.citrix.xenclient.xenmgr';
const iface = `${service}.vm`;
const authIface = `${iface}.auth`;
const pciIface = `${iface}.pci`;
const productIface = `${iface}.product`;
const unrestrictedIface = `${iface}.unrestricted`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = (vmPath) => ({
  // properties
  getProperty: (name) => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Get', iface, name),
  getAllProperties: () => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'GetAll', iface),
  setProperty: (name, value) => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Set', iface, name, value),

  // vm
  addArgoFirewallRule: (rule) => dbusActions.sendMessage(service, vmPath, iface, methods.ADD_ARGO_FIREWALL_RULE, rule),
  addDisk: (diskPath) => dbusActions.sendMessage(service, vmPath, iface, methods.ADD_DISK, diskPath),
  addNetFirewallRule: (id, direction, remoteIp, extra) => dbusActions.sendMessage(service, vmPath, iface, methods.ADD_NET_FIREWALL_RULE, id, direction, remoteIp, extra),
  addNic: (nicPath) => dbusActions.sendMessage(service, vmPath, iface, methods.ADD_NIC, nicPath),
  createChildServiceVm: (template) => dbusActions.sendMessage(service, vmPath, iface, methods.CREATE_CHILD_SERVICE_VM, template),
  delete: () => dbusActions.sendMessage(service, vmPath, iface, methods.DELETE),
  deleteArgoFirewallRule: (rule) => dbusActions.sendMessage(service, vmPath, iface, methods.DELETE_ARGO_FIREWALL_RULE, rule),
  deleteNetFirewallRule: (id) => dbusActions.sendMessage(service, vmPath, iface, methods.DELETE_NET_FIREWALL_RULE, id),
  destroy: () => dbusActions.sendMessage(service, vmPath, iface, methods.DESTROY),
  getDbKey: (key) => dbusActions.sendMessage(service, vmPath, iface, methods.GET_DB_KEY, key),
  getDomstoreKey: (key) => dbusActions.sendMessage(service, vmPath, iface, methods.GET_DOMSTORE_KEY, key),
  hibernate: () => dbusActions.sendMessage(service, vmPath, iface, methods.HIBERNATE),
  listArgoFirewallRules: () => dbusActions.sendMessage(service, vmPath, iface, methods.LIST_ARGO_FIREWALL_RULES),
  listDisks: () => dbusActions.sendMessage(service, vmPath, iface, methods.LIST_DISKS),
  listNetFirewallRules: () => dbusActions.sendMessage(service, vmPath, iface, methods.LIST_NET_FIREWALL_RULES),
  listNics: () => dbusActions.sendMessage(service, vmPath, iface, methods.LIST_NICS),
  pause: () => dbusActions.sendMessage(service, vmPath, iface, methods.PAUSE),
  readIcon: () => dbusActions.sendMessage(service, vmPath, iface, methods.READ_ICON),
  reboot: () => dbusActions.sendMessage(service, vmPath, iface, methods.REBOOT),
  resume: () => dbusActions.sendMessage(service, vmPath, iface, methods.RESUME),
  resumeFromFile: (file) => dbusActions.sendMessage(service, vmPath, iface, methods.RESUME_FROM_FILE, file),
  setDbKey: (key, value) => dbusActions.sendMessage(service, vmPath, iface, methods.SET_DB_KEY, key, value),
  setDomstoreKey: (key, value) => dbusActions.sendMessage(service, vmPath, iface, methods.SET_DOMSTORE_KEY, key, value),
  shutdown: () => dbusActions.sendMessage(service, vmPath, iface, methods.SHUTDOWN),
  sleep: () => dbusActions.sendMessage(service, vmPath, iface, methods.SLEEP),
  start: () => dbusActions.sendMessage(service, vmPath, iface, methods.START),
  startInternal: () => dbusActions.sendMessage(service, vmPath, iface, methods.START_INTERNAL),
  suspendToFile: (file) => dbusActions.sendMessage(service, vmPath, iface, methods.SUSPEND_TO_FILE, file),
  switch: () => dbusActions.sendMessage(service, vmPath, iface, methods.SWITCH),
  unpause: () => dbusActions.sendMessage(service, vmPath, iface, methods.UNPAUSE),

  // auth
  auth: () => dbusActions.sendMessage(service, vmPath, authIface, methods.AUTH),
  authRequired: () => dbusActions.sendMessage(service, vmPath, authIface, methods.AUTH_REQUIRED),

  // pci
  addPtRule: (pciClass, vendorId, deviceId) => dbusActions.sendMessage(service, vmPath, pciIface, methods.ADD_PT_RULE, pciClass, vendorId, deviceId),
  addPtRuleBdf: (bdf) => dbusActions.sendMessage(service, vmPath, pciIface, methods.ADD_PT_RULE_BDF, bdf),
  deletePtRule: (pciClass, vnedorId, deviceId) => dbusActions.sendMessage(service, vmPath, pciIface, methods.DELETE_PT_RULE, pciClass, vnedorId, deviceId),
  deletePtRuleBdf: (bdf) => dbusActions.sendMessage(service, vmPath, pciIface, methods.DELETE_PT_RULE_BDF, bdf),
  listPtPciDevices: () => dbusActions.sendMessage(service, vmPath, pciIface, methods.LIST_PT_PCI_DEVICES),
  listPtRules: () => dbusActions.sendMessage(service, vmPath, pciIface, methods.LIST_PT_RULES),

  // product
  getOvfEnvXml: () => dbusActions.sendMessage(service, vmPath, productIface, methods.GET_OVF_ENV_XML),
  getProductProperty: () => dbusActions.sendMessage(service, vmPath, productIface, methods.GET_PRODUCT_PROPERTY),
  listProductProperties: () => dbusActions.sendMessage(service, vmPath, productIface, methods.LIST_PRODUCT_PROPERTIES),
  setProductProperty: (propertyId, value) => dbusActions.sendMessage(service, vmPath, productIface, methods.SET_PRODUCT_PROPERTY, propertyId, value),

  // unrestricted
  unrestrictedGetProperty: (name) => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Get', unrestrictedIface, name),
  unrestrictedGetAllProperties: () => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'GetAll', unrestrictedIface),
  unrestrictedSetProperty: (name, value) => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Set', unrestrictedIface, name, value),
});

export default actions;
