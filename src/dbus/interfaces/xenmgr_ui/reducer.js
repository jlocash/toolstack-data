import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { types } from './actions';

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
  switch (action.type) {
    case types.XENMGR_UI_INITIALIZED: {
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
          case interfaces.FREEDESKTOP_PROPERTIES: {
            if (sent.args[0] === interfaces.UI_CONFIG) {
              switch (sent.method) {
                case 'GetAll': {
                  const [newProperties] = received.args;
                  const properties = { ...state.properties };
                  Object.keys(newProperties).forEach((key) => {
                    properties[key.replace(/-/g, '_')] = newProperties[key];
                  });

                  return {
                    ...state,
                    properties,
                  };
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
    }
  }
  return state;
};

export default xenmgrUiReducer;
