import dbusActions from '../../actions';

const service = 'com.citrix.xenclient.xenmgr';
const iface = `${service}.vm`;
const authIface = `${iface}.auth`;
const pciIface = `${iface}.pci`;
const productIface = `${iface}.product`;
const unrestrictedIface = `${iface}.unrestricted`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = vmPath => ({
    getProperty: (name) => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Set', iface, name, value),
    addArgoFirewallRule: (rule) => dbusActions.sendMessage(service, vmPath, iface, 'add_argo_firewall_rule', rule),
    addDisk: (diskPath) => dbusActions.sendMessage(service, vmPath, iface, 'add_disk', diskPath),
    addNetFirewallRule: (id, direction, remoteIp, extra) => dbusActions.sendMessage(service, vmPath, iface, 'add_net_firewall_rule', id, direction, remoteIp, extra),
    addNic: (nicPath) => dbusActions.sendMessage(service, vmPath, iface, 'add_nic', nicPath),
    createChildServiceVm: (template) => dbusActions.sendMessage(service, vmPath, iface, 'create_child_service_vm', template),
    delete: () => dbusActions.sendMessage(service, vmPath, iface, 'delete'),
    deleteArgoFirewallRule: (rule) => dbusActions.sendMessage(service, vmPath, iface, 'delete_argo_firewall_rule', rule),
    deleteNetFirewallRule: (id) => dbusActions.sendMessage(service, vmPath, iface, 'delete_net_firewall_rule', id),
    destroy: () => dbusActions.sendMessage(service, vmPath, iface, 'destroy'),
    getDbKey: (key) => dbusActions.sendMessage(service, vmPath, iface, 'get_db_key', key),
    getDomstoreKey: (key) => dbusActions.sendMessage(service, vmPath, iface, 'get_domstore_key', key),
    hibernate: () => dbusActions.sendMessage(service, vmPath, iface, 'hibernate'),
    listArgoFirewallRules: () => dbusActions.sendMessage(service, vmPath, iface, 'list_argo_firewall_rules'),
    listDisks: () => dbusActions.sendMessage(service, vmPath, iface, 'list_disks'),
    listNetFirewallRules: () => dbusActions.sendMessage(service, vmPath, iface, 'list_net_firewall_rules'),
    listNics: () => dbusActions.sendMessage(service, vmPath, iface, 'list_nics'),
    pause: () => dbusActions.sendMessage(service, vmPath, iface, 'pause'),
    readIcon: () => dbusActions.sendMessage(service, vmPath, iface, 'read_icon'),
    reboot: () => dbusActions.sendMessage(service, vmPath, iface, 'reboot'),
    resume: () => dbusActions.sendMessage(service, vmPath, iface, 'resume'),
    resumeFromFile: (file) => dbusActions.sendMessage(service, vmPath, iface, 'resume_from_file', file),
    setDbKey: (key, value) => dbusActions.sendMessage(service, vmPath, iface, 'set_db_key', key, value),
    setDomstoreKey: (key, value) => dbusActions.sendMessage(service, vmPath, iface, 'set_domstore_key', key, value),
    shutdown: () => dbusActions.sendMessage(service, vmPath, iface, 'shutdown'),
    sleep: () => dbusActions.sendMessage(service, vmPath, iface, 'sleep'),
    start: () => dbusActions.sendMessage(service, vmPath, iface, 'start'),
    startInternal: () => dbusActions.sendMessage(service, vmPath, iface, 'start_internal'),
    suspendToFile: (file) => dbusActions.sendMessage(service, vmPath, iface, 'suspend_to_file', file),
    switch: () => dbusActions.sendMessage(service, vmPath, iface, 'switch'),
    unpause: () => dbusActions.sendMessage(service, vmPath, iface, 'unpause'),

    //auth
    auth: () => dbusActions.sendMessage(service, vmPath, authIface, 'auth'),
    authRequired: () => dbusActions.sendMessage(service, vmPath, authIface, 'auth_required'),
    
    // pci
    addPtRule: (pciClass, vendorId, deviceId) => dbusActions.sendMessage(service, vmPath, pciIface, 'add_pt_rule', pciClass, vendorId, deviceId),
    addPtRuleBdf: (bdf) => dbusActions.sendMessage(service, vmPath, pciIface, 'add_pt_rule_bdf', bdf),
    deletePtRule: (pciClass, vnedorId, deviceId) => dbusActions.sendMessage(service, vmPath, pciIface, 'delete_pt_rule', pciClass, vnedorId, deviceId),
    deletePtRuleBdf: (bdf) => dbusActions.sendMessage(service, vmPath, pciIface, 'delete_pt_rule_bdf', bdf),
    listPtPciDevices: () => dbusActions.sendMessage(service, vmPath, pciIface, 'list_pt_pci_devices'),
    listPtRules: () => dbusActions.sendMessage(service, vmPath, pciIface, 'list_pt_rules'),
    
    // product
    getOvfEnvXml: () => dbusActions.sendMessage(service, vmPath, productIface, 'get_ovf_env_xml'),
    getProductProperty: () => dbusActions.sendMessage(service, vmPath, productIface, 'get_product_property'),
    listProductProperties: () => dbusActions.sendMessage(service, vmPath, productIface, 'list_product_properties'),
    setProductProperty: (propertyId, value) => dbusActions.sendMessage(service, vmPath, productIface, 'set_product_property', propertyId, value),

    // unrestricted
    unrestrictedGetProperty: () => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Get', unrestrictedIface, name),
    unrestrictedGetAllProperties: () => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'GetAll', unrestrictedIface),
    unrestrictedSetProperty: () => dbusActions.sendMessage(service, vmPath, freedesktopIface, 'Set', unrestrictedIface, name, value),

});

export default actions;
