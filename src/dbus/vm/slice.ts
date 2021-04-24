/* eslint-disable no-param-reassign */

import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { PCIDevice } from '../interfaces/xenmgr_host';
import { PCIRule, VMProperties } from '../interfaces/xenmgr_vm';

type VMNic = {
  path: string;
};

type VMDisk = {
  path: string;
};

type VM = {
  properties: VMProperties,
  loaded: boolean,
  argoFirewallRules: string[];
  ptPciDevices: PCIDevice[];
  ptRules: PCIRule[];
  netFirewallRules: unknown[];
  productProperties: unknown[];
  nics: { [path: string]: VMNic };
  disks: { [path: string]: VMDisk };
};

const initialVmState: VM = {
  properties: {
    acpi: false,
    acpi_state: 0,
    acpi_table: false,
    amt_pt: false,
    apic: false,
    argo: false,
    auto_s3_wake: false,
    autostart_pending: false,
    bios: '',
    boot: '',
    boot_sentinel: '',
    cd: '',
    cmd_line: '',
    control_platform_power_state: false,
    cores_per_socket: 0,
    cpuid: '',
    crypto_key_dirs: '',
    crypto_user: '',
    // dependencies: type="ao"
    description: '',
    display: '',
    domid: 0,
    domstore_read_access: false,
    domstore_write_access: false,
    download_progress: 0,
    extra_hvm: '',
    extra_xenvm: '',
    flask_label: '',
    gpu: '',
    greedy_pciback_bind: false,
    hap: false,
    hdtype: '',
    hibernated: false,
    hidden_in_switcher: false,
    hidden_in_ui: false,
    hpet: false,
    icbinn_path: '',
    image_path: '',
    init_flask_label: '',
    initrd: '',
    initrd_extract: '',
    keep_alive: false,
    kernel: '',
    kernel_extract: '',
    mac: '',
    measured: false,
    memory: 0,
    memory_min: 0,
    memory_static_max: 0,
    memory_target: 0,
    name: '',
    native_experience: false,
    nestedhvm: false,
    notify: '',
    nx: false,
    oem_acpi_features: false,
    os: '',
    ovf_transport_iso: false,
    pae: false,
    passthrough_io: '',
    passthrough_mmio: '',
    policy_audio_access: false,
    policy_audio_recording: false,
    policy_cd_access: false,
    policy_cd_recording: false,
    policy_modify_vm_settings: false,
    policy_print_screen: false,
    policy_wired_networking: false,
    policy_wireless_networking: false,
    portica_enabled: 0,
    portica_installed: false,
    preserve_on_reboot: false,
    private_space: 0,
    provides_default_network_backend: false,
    provides_graphics_fallback: false,
    provides_network_backend: false,
    pv_addons: false,
    pv_addons_version: '',
    qemu_dm_path: '',
    qemu_dm_timeout: 0,
    ready: false,
    realm: '',
    restrict_display_depth: false,
    restrict_display_res: false,
    run_insteadof_start: '',
    run_on_acpi_state_change: '',
    run_on_state_change: '',
    run_post_create: '',
    run_pre_boot: '',
    run_pre_delete: '',
    s3_mode: '',
    s4_mode: '',
    seamless_id: '',
    seamless_mouse_left: 0,
    seamless_mouse_right: 0,
    seamless_traffic: false,
    serial: '',
    show_switcher: false,
    shutdown_priority: 0,
    slot: 0,
    sound: '',
    start_from_suspend_image: '',
    start_on_boot: false,
    start_on_boot_priority: 0,
    state: '',
    stubdom: false,
    stubdom_flask_label: '',
    sync_uuid: '',
    time_offset: 0,
    timer_mode: '',
    track_dependencies: false,
    type: '',
    usb_auto_passthrough: false,
    usb_control: false,
    usb_enabled: false,
    usb_grab_devices: false,
    uuid: '',
    vcpus: 0,
    vfb: false,
    videoram: 0,
    viridian: false,
    virt_type: '',
    vkbd: false,
    vsnd: false,
    wired_network: '',
    wireless_control: false,
    wireless_network: '',
    xci_cpuid_signature: false,
  },
  loaded: false,
  argoFirewallRules: [],
  ptPciDevices: [],
  ptRules: [],
  netFirewallRules: [],
  productProperties: [],
  nics: {},
  disks: {},
};

const initialState: { [path: string]: VM } = {};

const slice = createSlice({
  name: 'vms',
  initialState,
  reducers: {
    pathAcquired: (state, action: PayloadAction<{ vmPath: string }>) => {
      const { vmPath } = action.payload;
      state[vmPath] = initialVmState;
    },
    loaded: (state, action: PayloadAction<{ vmPath: string }>) => {
      const { vmPath } = action.payload;
      state[vmPath].loaded = true;
    },
    propertiesLoaded: (state, action: PayloadAction<{
      vmPath: string,
      properties: VMProperties
    }>) => {
      const { vmPath, properties } = action.payload;
      state[vmPath].properties = properties;
    },
    propertyLoaded: (state, action: PayloadAction<{
      vmPath: string,
      prop: keyof VMProperties,
      value: unknown
    }>) => {
      const { vmPath, prop, value } = action.payload;
      const newProperties: VMProperties = { ...state[vmPath].properties, [prop]: value };
      state[vmPath].properties = newProperties;
    },
    argoFirewallRulesLoaded: (state, action: PayloadAction<{
      vmPath: string,
      argoFirewallRules: string[]
    }>) => {
      const { vmPath, argoFirewallRules } = action.payload;
      state[vmPath] = { ...state[vmPath], argoFirewallRules };
    },
    ptPciDevicesLoaded: (state, action: PayloadAction<{
      vmPath: string, ptPciDevices: PCIDevice[]
    }>) => {
      const { vmPath, ptPciDevices } = action.payload;
      state[vmPath] = { ...state[vmPath], ptPciDevices };
    },
    ptRulesLoaded: (state, action: PayloadAction<{ vmPath: string, ptRules: PCIRule[] }>) => {
      const { vmPath, ptRules } = action.payload;
      state[vmPath] = { ...state[vmPath], ptRules };
    },
    netFirewallRulesLoaded: (state, action: PayloadAction<{
      vmPath: string,
      netFirewallRules: unknown[]
    }>) => {
      const { vmPath, netFirewallRules } = action.payload;
      state[vmPath] = { ...state[vmPath], netFirewallRules };
    },
    productPropertiesLoaded: (state, action: PayloadAction<{
      vmPath: string,
      productProperties: unknown[],
    }>) => {
      const { vmPath, productProperties } = action.payload;
      state[vmPath] = { ...state[vmPath], productProperties };
    },
    nicLoaded: (state, action: PayloadAction<{ vmPath: string, nic: VMNic, }>) => {
      const { vmPath, nic } = action.payload;
      const nics = { ...state[vmPath].nics, [nic.path]: nic };
      state[vmPath] = { ...state[vmPath], nics };
    },
    diskLoaded: (state, action: PayloadAction<{ vmPath: string, disk: VMDisk, }>) => {
      const { vmPath, disk } = action.payload;
      const disks = { ...state[vmPath].disks, [disk.path]: disk };
      state[vmPath] = { ...state[vmPath], disks };
    },
    remove: (state, action: PayloadAction<{ vmPath: string, }>) => {
      const { vmPath } = action.payload;
      delete state[vmPath];
    },
    stateUpdated: (state, action: PayloadAction<{
      vmPath: string,
      vmState: string,
      vmAcpiState: number,
    }>) => {
      const { vmPath, vmState, vmAcpiState } = action.payload;
      state[vmPath].properties.state = vmState;
      state[vmPath].properties.acpi_state = vmAcpiState;
    },
  },
});

export const actions = {
  ...slice.actions,
  loadProperty: createAction('vms/loadProperty'),
  loadProperties: createAction('vms/loadProperties'),
  loadArgoFirewallRules: createAction('vms/loadArgoFirewallRules'),
  loadPtPciDevices: createAction('vms/loadPtPciDevices'),
  loadPtRules: createAction('vms/loadPtRules'),
  loadNetFirewallRules: createAction('vms/loadNetFirewallRules'),
  loadProductProperties: createAction('vms/loadProductProperties'),
  loadNics: createAction('vms/loadNics'),
  loadDisks: createAction('vms/loadDisks'),
};

export default slice.reducer;
