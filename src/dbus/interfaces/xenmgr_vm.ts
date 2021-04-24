import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export type VMProperties = {
  acpi: boolean;
  acpi_state: number;
  acpi_table: boolean;
  amt_pt: boolean;
  apic: boolean;
  argo: boolean;
  auto_s3_wake: boolean;
  autostart_pending: boolean;
  bios: string;
  boot: string;
  boot_sentinel: string;
  cd: string;
  cmd_line: string;
  control_platform_power_state: boolean;
  cores_per_socket: number;
  cpuid: string;
  crypto_key_dirs: string;
  crypto_user: string;
  // dependencies: type="ao"
  description: string;
  display: string;
  domid: number;
  domstore_read_access: boolean;
  domstore_write_access: boolean;
  download_progress: number;
  extra_hvm: string;
  extra_xenvm: string;
  flask_label: string;
  gpu: string;
  greedy_pciback_bind: boolean;
  hap: boolean;
  hdtype: string;
  hibernated: boolean;
  hidden_in_switcher: boolean;
  hidden_in_ui: boolean;
  hpet: boolean;
  icbinn_path: string;
  image_path: string;
  init_flask_label: string;
  initrd: string;
  initrd_extract: string;
  keep_alive: boolean;
  kernel: string;
  kernel_extract: string;
  mac: string;
  measured: boolean;
  memory: number;
  memory_min: number;
  memory_static_max: number;
  memory_target: number;
  name: string;
  native_experience: boolean;
  nestedhvm: boolean;
  notify: string;
  nx: boolean;
  oem_acpi_features: boolean;
  os: string;
  ovf_transport_iso: boolean;
  pae: boolean;
  passthrough_io: string;
  passthrough_mmio: string;
  policy_audio_access: boolean;
  policy_audio_recording: boolean;
  policy_cd_access: boolean;
  policy_cd_recording: boolean;
  policy_modify_vm_settings: boolean;
  policy_print_screen: boolean;
  policy_wired_networking: boolean;
  policy_wireless_networking: boolean;
  portica_enabled: number;
  portica_installed: boolean;
  preserve_on_reboot: boolean;
  private_space: number;
  provides_default_network_backend: boolean;
  provides_graphics_fallback: boolean;
  provides_network_backend: boolean;
  pv_addons: boolean;
  pv_addons_version: string;
  qemu_dm_path: string;
  qemu_dm_timeout: number;
  ready: boolean;
  realm: string;
  restrict_display_depth: boolean;
  restrict_display_res: boolean;
  run_insteadof_start: string;
  run_on_acpi_state_change: string;
  run_on_state_change: string;
  run_post_create: string;
  run_pre_boot: string;
  run_pre_delete: string;
  s3_mode: string;
  s4_mode: string;
  seamless_id: string;
  seamless_mouse_left: number;
  seamless_mouse_right: number;
  seamless_traffic: boolean;
  serial: string;
  show_switcher: boolean;
  shutdown_priority: number;
  slot: number;
  sound: string;
  start_from_suspend_image: string;
  start_on_boot: boolean;
  start_on_boot_priority: number;
  state: string;
  stubdom: boolean;
  stubdom_flask_label: string;
  sync_uuid: string;
  time_offset: number;
  timer_mode: string;
  track_dependencies: boolean;
  type: string;
  usb_auto_passthrough: boolean;
  usb_control: boolean;
  usb_enabled: boolean;
  usb_grab_devices: boolean;
  uuid: string;
  vcpus: number;
  vfb: boolean;
  videoram: number;
  viridian: boolean;
  virt_type: string;
  vkbd: boolean;
  vsnd: boolean;
  wired_network: string;
  wireless_control: boolean;
  wireless_network: string;
  xci_cpuid_signature: boolean;
};

export type VMUnrestrictedProperties = {
  acpi: boolean;
  acpi_state: number;
  acpi_table: boolean;
  amt_pt: boolean;
  apic: boolean;
  argo: boolean;
  auto_s3_wake: boolean;
  autostart_pending: boolean;
  bios: string;
  boot: string;
  boot_sentinel: string;
  cd: string;
  cmd_line: string;
  control_platform_power_state: boolean;
  cores_per_socket: number;
  cpuid: string;
  crypto_key_dirs: string;
  crypto_user: string;
  // dependencies: type = "ao"
  description: string;
  display: string;
  domid: number;
  domstore_read_access: boolean;
  domstore_write_access: boolean;
  download_progress: number;
  extra_hvm: string;
  extra_xenvm: string;
  flask_label: string;
  gpu: string;
  greedy_pciback_bind: boolean;
  hap: boolean;
  hdtype: string;
  hibernated: boolean;
  hidden_in_switcher: boolean;
  hidden_in_ui: boolean;
  hpet: boolean;
  icbinn_path: string;
  image_path: string;
  init_flask_label: string;
  initrd: string;
  initrd_extract: string;
  keep_alive: boolean;
  kernel: string;
  kernel_extract: string;
  mac: string;
  measured: boolean;
  memory: number;
  memory_min: number;
  memory_static_max: number;
  memory_target: number;
  name: string;
  native_experience: boolean;
  nestedhvm: boolean;
  notify: string;
  nx: boolean;
  oem_acpi_features: boolean;
  os: string;
  ovf_transport_iso: boolean;
  pae: boolean;
  passthrough_io: string;
  passthrough_mmio: string;
  policy_audio_access: boolean;
  policy_audio_recording: boolean;
  policy_cd_access: boolean;
  policy_cd_recording: boolean;
  policy_modify_vm_settings: boolean;
  policy_print_screen: boolean;
  policy_wired_networking: boolean;
  policy_wireless_networking: boolean;
  portica_enabled: number;
  portica_installed: boolean;
  preserve_on_reboot: boolean;
  private_space: number;
  provides_default_network_backend: boolean;
  provides_graphics_fallback: boolean;
  provides_network_backend: boolean;
  pv_addons: boolean;
  pv_addons_version: string;
  qemu_dm_path: string;
  qemu_dm_timeout: number;
  ready: boolean;
  realm: string;
  restrict_display_depth: boolean;
  restrict_display_res: boolean;
  run_insteadof_start: string;
  run_on_acpi_state_change: string;
  run_on_state_change: string;
  run_post_create: string;
  run_pre_boot: string;
  run_pre_delete: string;
  s3_mode: string;
  s4_mode: string;
  seamless_id: string;
  seamless_mouse_left: number;
  seamless_mouse_right: number;
  seamless_traffic: boolean;
  serial: string;
  show_switcher: boolean;
  shutdown_priority: number;
  slot: number;
  sound: string;
  start_from_suspend_image: string;
  start_on_boot: boolean;
  start_on_boot_priority: number;
  state: string;
  stubdom: boolean;
  stubdom_cmdline: string;
  stubdom_flask_label: string;
  stubdom_memory: number;
  sync_uuid: string;
  time_offset: number;
  timer_mode: string;
  track_dependencies: boolean;
  type: string;
  usb_auto_passthrough: boolean;
  usb_control: boolean;
  usb_enabled: boolean;
  usb_grab_devices: boolean;
  uuid: string;
  vcpus: number;
  vfb: boolean;
  videoram: number;
  viridian: boolean;
  virt_type: string;
  vkbd: boolean;
  vsnd: boolean;
  wired_network: string;
  wireless_control: boolean;
  wireless_network: string;
  xci_cpuid_signature: boolean;
};

export type PCIRule = {
  id: string;
  rule: string;
};

export default {
  getProperty: (vmPath: string, name: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM, name.replace(/_/g, '-'),
  ),
  getAllProperties: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM,
  ),
  setProperty: (vmPath: string, name: string, value: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM, name.replace(/_/g, '-'), value,
  ),
  addArgoFirewallRule: (vmPath: string, rule: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'add_argo_firewall_rule',
    rule,
  ),
  addDisk: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'add_disk',
  ),
  addNetFirewallRule: (vmPath: string, id: number, direction: string,
    remoteIp: string, extra: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'add_net_firewall_rule',
    id, direction, remoteIp, extra,
  ),
  addNic: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'add_nic',
  ),
  createChildServiceVm: (vmPath: string, template: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'create_child_service_vm',
    template,
  ),
  delete: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'delete',
  ),
  deleteArgoFirewallRule: (vmPath: string, rule: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'delete_argo_firewall_rule',
    rule,
  ),
  deleteNetFirewallRule: (vmPath: string, id: number): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'delete_net_firewall_rule',
    id,
  ),
  destroy: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'destroy',
  ),
  getDbKey: (vmPath: string, key: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'get_db_key',
    key,
  ),
  getDomstoreKey: (vmPath: string, key: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'get_domstore_key',
    key,
  ),
  hibernate: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'hibernate',
  ),
  listArgoFirewallRules: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'list_argo_firewall_rules',
  ),
  listDisks: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'list_disks',
  ),
  listNetFirewallRules: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'list_net_firewall_rules',
  ),
  listNics: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'list_nics',
  ),
  pause: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'pause',
  ),
  readIcon: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'read_icon',
  ),
  reboot: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'reboot',
  ),
  resume: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'resume',
  ),
  resumeFromFile: (vmPath: string, file: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'resume_from_file',
    file,
  ),
  setDbKey: (vmPath: string, key: string, value: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'set_db_key',
    key, value,
  ),
  setDomstoreKey: (vmPath: string, key: string, value: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'set_domstore_key',
    key, value,
  ),
  shutdown: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'shutdown',
  ),
  sleep: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'sleep',
  ),
  start: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'start',
  ),
  startInternal: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'start_internal',
  ),
  suspendToFile: (vmPath: string, file: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'suspend_to_file',
    file,
  ),
  switch: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'switch',
  ),
  unpause: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM,
    'unpause',
  ),
  auth: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_AUTH,
    'auth',
  ),
  authRequired: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_AUTH,
    'auth_required',
  ),
  addPtRule: (vmPath: string, pciClass: string, vendorId: string,
    deviceId: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PCI,
    'add_pt_rule',
    pciClass, vendorId, deviceId,
  ),
  addPtRuleBdf: (vmPath: string, bdf: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PCI,
    'add_pt_rule_bdf',
    bdf,
  ),
  deletePtRule: (vmPath: string, pciClass: string, vendorId: string,
    deviceId: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PCI,
    'delete_pt_rule',
    pciClass, vendorId, deviceId,
  ),
  deletePtRuleBdf: (vmPath: string, bdf: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PCI,
    'delete_pt_rule_bdf',
    bdf,
  ),
  listPtPciDevices: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PCI,
    'list_pt_pci_devices',
  ),
  listPtRules: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PCI,
    'list_pt_rules',
  ),
  getOvfEnvXml: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PRODUCT,
    'get_ovf_env_xml',
  ),
  getProductProperty: (vmPath: string, propertyId: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PRODUCT,
    'get_product_property',
    propertyId,
  ),
  listProductProperties: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PRODUCT,
    'list_product_properties',
  ),
  setProductProperty: (vmPath: string, propertyId: string, value: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.VM_PRODUCT,
    'set_product_property',
    propertyId, value,
  ),
  unrestrictedGetProperty: (vmPath: string, name: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.VM_UNRESTRICTED, name.replace(/_/g, '-'),
  ),
  unrestrictedGetAllProperties: (vmPath: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.VM_UNRESTRICTED,
  ),
  unrestrictedSetProperty: (vmPath: string, name: string, value: string): Message => buildMessage(
    services.XENMGR,
    vmPath,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.VM_UNRESTRICTED, name.replace(/_/g, '-'), value,
  ),
};
