import dbusActions from '../../actions';
import { XENMGR_HOST_INITIALIZED } from './actions';
import { methods, signals } from './constants';

const initialState = {
  properties: {
    state: 'idle',
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
              case methods.GET_GPU_PLACEMENT:
              case methods.GET_SECONDS_FROM_EPOCH:
              case methods.GET_SOUND_CARD_CONTROL:
              case methods.HIBERNATE:
              case methods.IS_SERVICE_RUNNING:
              case methods.LIST_CAPTURE_DEVICES:
              case methods.LIST_CD_DEVICES:
              case methods.LIST_DISK_DEVICES:
              case methods.LIST_GPU_DEVICES:
              case methods.LIST_ISOS:
              case methods.LIST_PCI_DEVICES:
              case methods.LIST_PLAYBACK_DEVICES:
              case methods.LIST_SOUND_CARD_CONTROLS:
              case methods.LIST_SOUND_CARDS:
              case methods.LIST_UI_PLUGINS:
              case methods.REBOOT:
              case methods.SET_LICENSE:
              case methods.SET_SOUND_CARD_CONTROL:
              case methods.SHUTDOWN:
              case methods.SLEEP: {
                return state;
              }

              // installer
              case methods.GET_EULA:
              case methods.GET_INSTALLSTATE:
              case methods.PROGRESS_INSTALLSTATE: {
                return state;
              }

              // powersettings
              case methods.GET_AC_LID_CLOSE_ACTION:
              case methods.GET_BATTERY_LID_CLOSE_ACTION:
              case methods.SET_AC_LID_CLOSE_ACTION:
              case methods.SET_BATTERY_LID_CLOSE_ACTION: {
                return state;
              }
            }
            break;
          }
          case 'org.freedesktop.DBus.Properties': {
            if (payload.sent[0] === 'com.citrix.xenclient.xenmgr.host') {
              if (payload.method === 'GetAll') {
                const received = payload.received[0];
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
          case signals.STATE_CHANGED:
          case signals.STORAGE_SPACE_LOW:
          case signals.LICENSE_CHANGED: {
            return state;
          }
        }
      }
      break;
    }
  }
  return state;
};

export default xenmgrHostReducer;
