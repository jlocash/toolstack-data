import dbusActions from '../../actions';
import { types } from './actions';
import methods from './constants';
import { methods as xenmgrMethods, signals as xenmgrSignals } from '../xenmgr/constants';
import { interfaces, services } from '../../constants';

const initialVmState = {
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
    dependencies: [],
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

  // private storage
  domstore: {},

  // vm
  argo_firewall_rules: [],
  net_firewall_rules: [],
  disks: [],
  nics: [],

  // pci
  pt_pci_devices: [],
  pt_rules: [],

  // product
  product_properties: [],

  // metadata
  meta: {
    initialized: false,
  },
};

const initialState = {};

const xenmgrVmReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_VM_INITIALIZED: {
      const { vmPath, initialized } = action.data;
      return {
        ...state,
        [vmPath]: {
          ...state[vmPath],
          meta: {
            initialized,
          },
        },
      };
    }
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      if (sent.destination === services.XENMGR) {
        switch (sent.interface) {
          case interfaces.VM: {
            const vmPath = sent.path;
            switch (sent.method) {
              // vm
              case methods.ADD_ARGO_FIREWALL_RULE:
              case methods.ADD_DISK:
              case methods.ADD_NET_FIREWALL_RULE:
              case methods.ADD_NIC:
              case methods.CREATE_CHILD_SERVICE_VM:
              case methods.DELETE:
              case methods.DELETE_ARGO_FIREWALL_RULE:
              case methods.DELETE_NET_FIREWALL_RULE:
              case methods.DESTROY:
              case methods.GET_DB_KEY:
              case methods.GET_DOMSTORE_KEY:
              case methods.HIBERNATE: {
                break;
              }
              case methods.LIST_ARGO_FIREWALL_RULES: {
                const [rules] = received.args;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    argo_firewall_rules: rules,
                  },
                };
              }
              case methods.LIST_DISKS: {
                const [disks] = received.args;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    disks,
                  },
                };
              }
              case methods.LIST_NET_FIREWALL_RULES: {
                const [rules] = received.args;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    net_firewall_rules: rules,
                  },
                };
              }
              case methods.LIST_NICS: {
                const [nics] = received.args;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    nics,
                  },
                };
              }
              case methods.PAUSE:
              case methods.READ_ICON:
              case methods.REBOOT:
              case methods.RESUME:
              case methods.RESUME_FROM_FILE:
              case methods.SET_DB_KEY:
              case methods.SET_DOMSTORE_KEY:
              case methods.SHUTDOWN:
              case methods.SLEEP:
              case methods.START:
              case methods.START_INTERNAL:
              case methods.SUSPEND_TO_FILE:
              case methods.SWITCH:
              case methods.UNPAUSE: {
                return state;
              }

              // auth
              case methods.AUTH:
              case methods.AUTH_REQUIRED: {
                return state;
              }

              // pci
              case methods.ADD_PT_RULE:
              case methods.ADD_PT_RULE_BDF:
              case methods.DELETE_PT_RULE:
              case methods.DELETE_PT_RULE_BDF:
                break;
              case methods.LIST_PT_PCI_DEVICES: {
                const [ptPciDevices] = received.args;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    pt_pci_devices: ptPciDevices,
                  },
                };
              }
              case methods.LIST_PT_RULES: {
                const [ptRules] = received.args;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    pt_rules: ptRules,
                  },
                };
              }

              // product
              case methods.GET_OVF_ENV_XML:
              case methods.GET_PRODUCT_PROPERTY:
              case methods.LIST_PRODUCT_PROPERTIES:
              case methods.SET_PRODUCT_PROPERTY: {
                return state;
              }
            }
            break;
          }
          case interfaces.XENMGR: {
            switch (sent.method) {
              case xenmgrMethods.LIST_VMS: {
                const vms = {};
                const [paths] = received.args;
                paths.forEach((vmPath) => {
                  if (!state[vmPath]) {
                    vms[vmPath] = { ...initialVmState };
                  }
                });
                return { ...state, ...vms };
              }
            }
            break;
          }
          case interfaces.FREEDESKTOP_PROPERTIES: {
            switch (sent.args[0]) {
              case interfaces.VM: {
                if (sent.method === 'GetAll') {
                  const vmPath = sent.path;
                  const [newProperties] = received.args;
                  const properties = { ...state[vmPath].properties };
                  Object.keys(newProperties).forEach((key) => {
                    properties[key.replace(/-/g, '_')] = newProperties[key];
                  });
                  return {
                    ...state,
                    [vmPath]: {
                      ...state[vmPath],
                      properties,
                    },
                  };
                }
                break;
              }
            }
          }
        }
      }
      break;
    }
    case dbusActions.DBUS_SIGNAL_RECEIVED: {
      const signal = action.data;
      if (signal.interface === 'com.citrix.xenclient.xenmgr') {
        switch (signal.member) {
          case xenmgrSignals.VM_STATE_CHANGED: {
            const [, vmPath, vmState, acpiState] = signal.args;
            return {
              ...state,
              [vmPath]: {
                ...state[vmPath],
                properties: {
                  ...state[vmPath].properties,
                  state: vmState,
                  acpi_state: acpiState,
                },
              },
            };
          }
          case xenmgrSignals.VM_CREATED: {
            // usually followed by a xenmgrSignals.VM_CONFIG_CHANGED
            const [, vmPath] = signal.args;
            return {
              ...state,
              [vmPath]: { ...initialVmState },
            };
          }
          case xenmgrSignals.VM_DELETED: {
            const [, vmPath] = signal.args;
            const newState = { ...state };
            delete newState[vmPath];
            return newState;
          }
        }
      }
      break;
    }
  }
  return state;
};

export default xenmgrVmReducer;
