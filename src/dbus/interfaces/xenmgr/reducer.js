import dbusActions from '../../actions';
import { XENMGR_INITIALIZED } from './actions';
import { methods, signals } from './constants';

const initialState = {
  properties: {
    iso_path: '',
    autostart: false,
    pvm_autostart_delay: 0,
    svm_autostart_delay: 0,
    argo_hosts_file: false,
    use_networking_domain: false,
    bypass_sha1sum_checks: false,
    xc_diag_timeout: 0,
    platform_crypto_key_dirs: '',
    guest_only_networking: false,
    vm_creation_allowed: false,
    vm_deletion_allowed: false,
    ota_upgrades_allowed: false,
    connect_remote_desktop_allowed: false,
    measure_fail_action: '',
    argo_firewall: false,
    secondary_gpu_pt: false,
    configurable_save_changes_across_reboots: false,
    enable_ssh: false,
    enable_argo_ssh: false,
    enable_dom0_networking: false,
    dom0_mem_target_mib: 0,
    autolock_cd_drives: false,
  },

  // metadata
  meta: {
    initialized: false,
  },
};

const xenmgrReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case XENMGR_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.xenmgr') {
        switch (payload.interface) {
          case 'com.citrix.xenclient.xenmgr':
          case 'com.citrix.xenclient.xenmgr.diag':
          case 'com.citrix.xenclient.xenmgr.guestreq': {
            switch (payload.method) {
              // xenmgr
              case methods.CREATE_VHD:
              case methods.CREATE_VM:
              case methods.CREATE_VM_WITH_TEMPLATE:
              case methods.CREATE_VM_WITH_TEMPLATE_AND_JSON:
              case methods.CREATE_VM_WITH_TEMPLATE_AND_UUID:
              case methods.CREATE_VM_WITH_UI:
              case methods.FIND_VM_BY_DOMID:
              case methods.FIND_VM_BY_UUID:
              case methods.LIST_CHILD_SERVICE_VM_TEMPLATES:
              case methods.LIST_DOMIDS:
              case methods.LIST_EXTENSION_PACKS:
              case methods.LIST_TEMPLATES:
              case methods.LIST_UI_TEMPLATES:
              case methods.LIST_VMS: {
                return state;
              }

              // unrestricted
              case methods.UNRESTRICTED_CREATE_VM:
              case methods.UNRESTRICTED_CREATE_VM_WITH_TEMPLATE_AND_JSON:
              case methods.UNRESTRICTED_DELETE_VM: {
                return state;
              }

              // diag
              case methods.CREATE_STATUS_REPORT:
              case methods.GATHER:
              case methods.SAVE:
              case methods.STATUS_REPORT_SCREEN:
              case methods.TAAS_AGREE_TERMS:
              case methods.TAAS_AUTHENTICATE_CREDENTIALS:
              case methods.TAAS_UPLOAD: {
                return state;
              }

              // guestreq
              case methods.REQUEST_ATTENTION: {
                return state;
              }
            }
            break;
          }
          case 'org.freedesktop.DBus.Properties': {
            if (payload.sent[0] === 'com.citrix.xenclient.xenmgr.config') {
              if (payload.method === 'GetAll') {
                const incomingProperties = payload.received[0];
                const newProperties = { ...state.properties };
                Object.keys(incomingProperties).forEach((key) => {
                  newProperties[key.replace(/-/g, '_')] = incomingProperties[key];
                });

                return {
                  ...state,
                  ...state,
                  properties: newProperties,
                };
              }
            }
            break;
          }
        }
      }
      break;
    }
    case dbusActions.DBUS_SIGNAL_RECEIVED: {
      switch (payload.interface) {
        case 'com.citrix.xenclient.xenmgr': {
          switch (payload.member) {
            case signals.VM_CONFIG_CHANGED:
            case signals.NOTIFY:
            case signals.VM_STATE_CHANGED:
            case signals.VM_NAME_CHANGED:
            case signals.CONFIG_CHANGED:
            case signals.LANGUAGE_CHANGED:
            case signals.VM_CREATED:
            case signals.VM_DELETED:
            case signals.NETWORK_STATE_CHANGED:
            case signals.VM_TRANSFER_CHANGED:
            case signals.CD_ASSIGNMENT_CHANGED: {
              return state;
            }
          }
          break;
        }
        case 'com.citrix.xenclient.xenmgr.diag': {
          switch (payload.member) {
            case signals.CREATE_STATUS_REPORT:
            case signals.GATHER:
            case signals.SAVE:
            case signals.STATUS_REPORT_SCREEN:
            case signals.TAAS_AGREE_TERMS:
            case signals.TAAS_AUTHENTICATE_CREDENTIALS:
            case signals.TAAS_UPLOAD: {
              return state;
            }
          }
          break;
        }
        case 'com.citrix.xenclient.xenmgr.guestreq': {
          switch (payload.member) {
            case signals.REQUEST_ATTENTION: {
              return state;
            }
          }
          break;
        }
      }
      break;
    }
  }
  return state;
};

export default xenmgrReducer;
