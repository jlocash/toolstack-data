import dbusActions from '../../actions';
import { XENMGR_HOST_INITIALIZED } from './actions';
import { methods, signals, WALLPAPER_DIR, DEFAULT_WALLPAPERS } from './constants';

const initialState = {
  properties: {
    state: '',
    total_mem: 0,
    free_mem: 0,
    avail_mem: 0,
    total_storage: 0,
    free_storage: 0,
    system_amt_pt: false,
    cpu_count: 0,
    laptop: false,
    model: '',
    vendor: '',
    serial: '',
    bios_revision: '',
    amt_capable: false,
    eth0_mac: '',
    eth0_model: '',
    wireless_mac: '',
    wireless_model: '',
    physical_cpu_model: '',
    physical_gpu_model: '',
    safe_graphics: false,
    measured_boot_enabled: true,
    measured_boot_successful: false,
    is_licensed: true,
    build_info: '',
    ui_ready: false,
    playback_pcm: '',
    capture_pcm: '',
  },

  // host
  cd_devices: [],
  disk_devices: [],
  gpu_devices: [],
  isos: [],
  capture_devices: [],
  playback_devices: [],
  sound_cards: [],
  sound_card_controls: {},
  seconds_from_epoch: 0,
  available_wallpapers: DEFAULT_WALLPAPERS,

  // installer
  eula: null,
  install_state: {
    deferred_accept_eula: '',
    deferred_dom0_password: '',
    deferred_kb_layout: '',
    deferred_language: '',
  },

  // powersettings
  ac_lid_close_action: '',
  battery_lid_close_action: '',

  // metadata
  meta: {
    initialized: false,
  },
};

const xenmgrHostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case XENMGR_HOST_INITIALIZED: {
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
          case 'com.citrix.xenclient.xenmgr.host':
          case 'com.citrix.xenclient.xenmgr.installer':
          case 'com.citrix.xenclient.xenmgr.powersettings': {
            switch (payload.method) {
              // host
              case methods.ASSIGN_CD_DEVICE:
              case methods.CONFIGURE_GPU_PLACEMENT:
              case methods.EJECT_CD_DEVICE:
              case methods.GET_CD_DEVICE_ASSIGNMENT:
              case methods.GET_SOUND_CARD_CONTROL:
              case methods.HIBERNATE:
              case methods.IS_SERVICE_RUNNING:
              case methods.GET_GPU_PLACEMENT: {
                break;
              }
              case methods.GET_SECONDS_FROM_EPOCH: {
                const [seconds_from_epoch] = payload.received;
                return { ...state, seconds_from_epoch };
              }
              case methods.LIST_CAPTURE_DEVICES: {
                const [capture_devices] = payload.received;
                return { ...state, capture_devices };
              }
              case methods.LIST_CD_DEVICES: {
                const [cd_devices] = payload.received;
                return { ...state, cd_devices };
              }
              case methods.LIST_DISK_DEVICES: {
                const [disk_devices] = payload.received;
                return { ...state, disk_devices };
              }
              case methods.LIST_GPU_DEVICES: {
                const [gpu_devices] = payload.received;
                return { ...state, gpu_devices };
              }
              case methods.LIST_ISOS: {
                const [isos] = payload.received;
                return { ...state, isos };
              }
              case methods.LIST_PCI_DEVICES: {
                const [pci_devices] = payload.received;
                return { ...state, pci_devices };
              }
              case methods.LIST_PLAYBACK_DEVICES: {
                const [playback_devices] = payload.received;
                return { ...state, playback_devices };
              }
              case methods.LIST_SOUND_CARDS: {
                const [sound_cards] = payload.received;
                return { ...state, sound_cards };
              }
              case methods.LIST_SOUND_CARD_CONTROLS: {
                const id = payload.sent[0];
                const [controls] = payload.received;
                return {
                  ...state,
                  sound_card_controls: {
                    ...state.sound_card_controls,
                    [id]: controls,
                  },
                };
              }
              case methods.LIST_UI_PLUGINS: {
                const [received] = payload.received;
                if (payload.sent[0] === WALLPAPER_DIR) {
                  const custom = received.filter(path => /thumb.png$/.test(path));
                  const available_wallpapers = [...DEFAULT_WALLPAPERS, ...custom];
                  return { ...state, available_wallpapers };
                }
                break;
              }
              case methods.REBOOT:
              case methods.SET_LICENSE:
              case methods.SET_SOUND_CARD_CONTROL:
              case methods.SHUTDOWN:
              case methods.SLEEP: {
                return state;
              }

              // installer
              case methods.GET_EULA: {
                const [eula] = payload.received;
                return { ...state, eula };
              }
              case methods.GET_INSTALLSTATE: {
                const [received] = payload.received;
                const install_state = {};
                Object.keys(received).forEach(key => {
                  install_state[key.replace(/-/g, '_')] = received[key];
                });
                return { ...state, install_state };
              }
              case methods.PROGRESS_INSTALLSTATE: {
                return state;
              }

              // powersettings
              case methods.GET_AC_LID_CLOSE_ACTION: {
                const [ac_lid_close_action] = payload.received;
                return { ...state, ac_lid_close_action };
              }
              case methods.GET_BATTERY_LID_CLOSE_ACTION: {
                const [battery_lid_close_action] = payload.received;
                return { ...state, battery_lid_close_action };
              }
              case methods.SET_AC_LID_CLOSE_ACTION:
              case methods.SET_BATTERY_LID_CLOSE_ACTION: {
                return state;
              }
            }
            break;
          }
          case 'org.freedesktop.DBus.Properties': {
            if (payload.sent[0] === 'com.citrix.xenclient.xenmgr.host') {
              switch (payload.method) {
                case 'GetAll': {
                  const [received] = payload.received;
                  const properties = {};
                  Object.keys(received).forEach((key) => {
                    properties[key.replace(/-/g, '_')] = received[key];
                  });

                  return {
                    ...state,
                    ...state,
                    properties,
                  };
                }
                case 'Set': {
                  const [prop, value] = payload.sent.slice(-2);
                  return {
                    ...state,
                    properties: {
                      ...state.properties,
                      [prop.replace(/-/g, '_')]: value,
                    },
                  };
                }
              }
            }
          }
        }
      }
      break;
    }
    case dbusActions.DBUS_SIGNAL_RECEIVED: {
      if (payload.interface === 'com.citrix.xenclient.xenmgr.host') {
        switch (payload.member) {
          // host
          case signals.STATE_CHANGED: {
            const [hostState] = payload.received;
            return {
              ...state,
              properties: {
                ...state.properties,
                state: hostState,
              },
            };
          }
        }
      }
      break;
    }
  }
  return state;
};

export default xenmgrHostReducer;
