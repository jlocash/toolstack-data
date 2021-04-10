import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { types } from './actions';
import {
  methods, signals, WALLPAPER_DIR, DEFAULT_WALLPAPERS,
} from './constants';

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
  switch (action.type) {
    case types.XENMGR_HOST_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      if (sent.destination === services.XENMGR) {
        switch (sent.interface) {
          case interfaces.HOST:
          case interfaces.INSTALLER:
          case interfaces.POWERSETTINGS: {
            switch (sent.method) {
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
                const [seconds] = received.args;
                return { ...state, seconds_from_epoch: seconds };
              }
              case methods.LIST_CAPTURE_DEVICES: {
                const [captureDevices] = received.args;
                return { ...state, capture_devices: captureDevices };
              }
              case methods.LIST_CD_DEVICES: {
                const [cdDevices] = received.args;
                return { ...state, cd_devices: cdDevices };
              }
              case methods.LIST_DISK_DEVICES: {
                const [diskDevices] = received.args;
                return { ...state, disk_devices: diskDevices };
              }
              case methods.LIST_GPU_DEVICES: {
                const [gpuDevices] = received.args;
                return { ...state, gpu_devices: gpuDevices };
              }
              case methods.LIST_ISOS: {
                const [isos] = received.args;
                return { ...state, isos };
              }
              case methods.LIST_PCI_DEVICES: {
                const [pciDevices] = received.args;
                return { ...state, pci_devices: pciDevices };
              }
              case methods.LIST_PLAYBACK_DEVICES: {
                const [playbackDevices] = received.args;
                return { ...state, playback_devices: playbackDevices };
              }
              case methods.LIST_SOUND_CARDS: {
                const [soundCards] = received.args;
                return { ...state, sound_cards: soundCards };
              }
              case methods.LIST_SOUND_CARD_CONTROLS: {
                const id = sent.args[0];
                const [controls] = received.args;
                return {
                  ...state,
                  sound_card_controls: {
                    ...state.sound_card_controls,
                    [id]: controls,
                  },
                };
              }
              case methods.LIST_UI_PLUGINS: {
                const [plugins] = received.args;
                if (sent.args[0] === WALLPAPER_DIR) {
                  const custom = plugins.filter((path) => /thumb.png$/.test(path));
                  return {
                    ...state,
                    available_wallpapers: [...DEFAULT_WALLPAPERS, ...custom],
                  };
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
                const [eula] = received.args;
                return { ...state, eula };
              }
              case methods.GET_INSTALLSTATE: {
                const [install] = received.args;
                const installState = {};
                Object.keys(install).forEach((key) => {
                  installState[key.replace(/-/g, '_')] = install[key];
                });
                return { ...state, install_state: installState };
              }
              case methods.PROGRESS_INSTALLSTATE: {
                return state;
              }

              // powersettings
              case methods.GET_AC_LID_CLOSE_ACTION: {
                const [acLidCloseAction] = received.args;
                return { ...state, ac_lid_close_action: acLidCloseAction };
              }
              case methods.GET_BATTERY_LID_CLOSE_ACTION: {
                const [batteryLidCloseAction] = received.args;
                return { ...state, battery_lid_close_action: batteryLidCloseAction };
              }
              case methods.SET_AC_LID_CLOSE_ACTION:
              case methods.SET_BATTERY_LID_CLOSE_ACTION: {
                return state;
              }
            }
            break;
          }
          case interfaces.FREEDESKTOP_PROPERTIES: {
            if (sent.args[0] === 'com.citrix.xenclient.xenmgr.host') {
              switch (sent.method) {
                case 'GetAll': {
                  const [newProperties] = received.args;
                  const properties = {};
                  Object.keys(newProperties).forEach((key) => {
                    properties[key.replace(/-/g, '_')] = newProperties[key];
                  });

                  return { ...state, properties };
                }
                case 'Set': {
                  const [prop, value] = sent.args.slice(-2);
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
      const signal = action.data;
      if (signal.interface === 'com.citrix.xenclient.xenmgr.host') {
        switch (signal.member) {
          // host
          case signals.STATE_CHANGED: {
            const [hostState] = signal.args;
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
