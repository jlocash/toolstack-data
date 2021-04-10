export const services = {
  XENMGR: 'com.citrix.xenclient.xenmgr',
  FREEDESKTOP: 'org.freedesktop.DBus',
  INPUT: 'com.citrix.xenclient.input',
  NETWORK_DAEMON: 'com.citrix.xenclient.networkdaemon',
  NETWORK_DOMAIN: 'com.citrix.xenclient.networkdomain',
  SURFMAN: 'com.citrix.xenclient.surfman',
  UPDATEMGR: 'com.citrix.xenclient.updatemgr',
  USB_DAEMON: 'com.citrix.xenclient.usbdaemon',
  XCPMD: 'com.citrix.xenclient.xcpmd',
};

export const interfaces = {
  FREEDESKTOP: services.FREEDESKTOP,
  FREEDESKTOP_PROPERTIES: `${services.FREEDESKTOP}.Properties`,
  INPUT: services.INPUT,
  XCPMD: services.XCPMD,
  NETWORK_DAEMON: services.NETWORK_DAEMON,
  NETWORK_DOMAIN: services.NETWORK_DOMAIN,
  NETWORK_DOMAIN_CONFIG: `${services.NETWORK_DOMAIN}.config`,
  NETWORK: 'com.citrix.xenclient.network',
  NETWORK_CONFIG: 'com.citrix.xenclient.network.config',
  SURFMAN: services.SURFMAN,
  UPDATEMGR: services.UPDATEMGR,
  USB_DAEMON: services.USB_DAEMON,
  XENMGR: services.XENMGR,
  XENMGR_UNRESTRICTED: `${services.XENMGR}.unrestricted`,
  HOST: `${services.XENMGR}.host`,
  POWERSETTINGS: `${services.XENMGR}.powersettings`,
  INSTALLER: `${services.XENMGR}.installer`,
  UI_CONFIG: `${services.XENMGR}.config.ui`,
  VM: `${services.XENMGR}.vm`,
  VM_AUTH: `${services.XENMGR}.vm.auth`,
  VM_PCI: `${services.XENMGR}.vm.pci`,
  VM_PRODUCT: `${services.XENMGR}.vm.product`,
  VM_UNRESTRICTED: `${services.XENMGR}.vm.unrestricted`,
  GUESTREQ: `${services.XENMGR}.guestreq`,
  DIAG: `${services.XENMGR}.diag`,
  XENMGR_CONFIG: `${services.XENMGR}.config`,
  VM_DISK: 'com.citrix.xenclient.vmdisk',
  VM_NIC: 'com.citrix.xenclient.vmnic',

};

export const messageTypes = {
  RESPONSE: 'response',
  ERROR: 'error',
  SIGNAL: 'signal',
};
