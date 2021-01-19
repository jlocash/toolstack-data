import dbusActions from '../../actions';
import { XENMGR_UI_INITIALIZED } from './actions';

const initialState = {
  properties: {
    // properties
    show_msg_on_vm_start: false,
    show_msg_on_vm_start_tools_warning: false,
    show_msg_on_no_disk: false,
    show_mboot_warning: false,
    show_tools_warning: false,
    wallpaper: '',
    pointer_trail_timeout: 0,
    view_type: '',
    modify_settings: false,
    modify_services: false,
    modify_advanced_vm_settings: false,
    modify_usb_settings: false,
    switcher_enabled: false,
    switcher_self_switch_enabled: false,
    switcher_keyboard_follows_mouse: false,
    switcher_resistance: 0,
    switcher_status_report_enabled: false,
    idle_time_threshold: 0,
    language: '',
    supported_languages: [],
    drm_graphics: false,
  },

  // metadata
  meta: {
    initialized: false,
  },
};

const xenmgrUiReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case XENMGR_UI_INITIALIZED: {
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
          case 'org.freedesktop.DBus.Properties': {
            if (payload.sent[0] === 'com.citrix.xenclient.xenmgr.config.ui') {
              switch (payload.method) {
                case 'GetAll': {
                  const [received] = payload.received;
                  const properties = { ...state.properties };
                  Object.keys(received).forEach((key) => {
                    properties[key.replace(/-/g, '_')] = received[key];
                  });

                  return {
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
    }
  }
  return state;
};

export default xenmgrUiReducer;
