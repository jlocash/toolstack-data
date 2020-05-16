import dbusActions from '../../actions';
import { SET_VM_INITIALIZED } from './actions';
import { methods } from './constants';
import { methods as xenmgrMethods, signals as xenmgrSignals } from '../xenmgr/constants';

const initialVmState = {
  properties: {

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
  const { type, payload } = action;
  switch (type) {
    case SET_VM_INITIALIZED: {
      const { vmPath, initialized } = payload;
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
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.xenmgr') {
        switch (payload.interface) {
          case 'com.citrix.xenclient.xenmgr.vm': {
            const vmPath = payload.path;
            switch (payload.method) {
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
                const [argo_firewall_rules] = payload.received;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    argo_firewall_rules,
                  },
                };
              }
              case methods.LIST_DISKS: {
                const [disks] = payload.received;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    disks,
                  },
                };
              }
              case methods.LIST_NET_FIREWALL_RULES: {
                const [net_firewall_rules] = payload.received;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    net_firewall_rules,
                  },
                };
              }
              case methods.LIST_NICS: {
                const [nics] = payload.received;
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
                const [pt_pci_devices] = payload.received;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    pt_pci_devices,
                  },
                };
              }
              case methods.LIST_PT_RULES: {
                const [pt_rules] = payload.received;
                return {
                  ...state,
                  [vmPath]: {
                    ...state[vmPath],
                    pt_rules,
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
          case 'com.citrix.xenclient.xenmgr': {
            switch (payload.method) {
              case xenmgrMethods.LIST_VMS: {
                const vms = {};
                const [received] = payload.received;
                received.forEach((vmPath) => {
                  if (!state[vmPath]) {
                    vms[vmPath] = { ...initialVmState };
                  }
                });
                return { ...state, ...vms };
              }
            }
            break;
          }
          case 'org.freedesktop.DBus.Properties': {
            switch (payload.sent[0]) {
              case 'com.citrix.xenclient.xenmgr.vm': {
                if (payload.method === 'GetAll') {
                  const vmPath = payload.path;
                  const [received] = payload.received;
                  const properties = { ...state[vmPath].properties };
                  Object.keys(received).forEach((key) => {
                    properties[key.replace(/-/g, '_')] = received[key];
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
      if (payload.interface === 'com.citrix.xenclient.xenmgr') {
        switch (payload.member) {
          case xenmgrSignals.VM_STATE_CHANGED: {
            const [, vmPath, vmState, acpiState] = payload.args;
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
            const [, vmPath] = payload.args;
            return {
              ...state,
              [vmPath]: { ...initialVmState },
            };
          }
          case xenmgrSignals.VM_DELETED: {
            const [, vmPath] = payload.args;
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
