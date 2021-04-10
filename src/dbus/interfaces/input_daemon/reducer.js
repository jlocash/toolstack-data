import dbusActions from '../../actions';
import { methods, signals } from './constants';
import { INPUT_DAEMON_INITIALIZED } from './actions';
import { services, interfaces } from '../../constants';

const initialState = {
  // properties
  properties: {
    numlock_restore_on_switch: false,
  },

  keyboard_layout: '',
  keyboard_layouts: [],
  mouse_speed: 0,
  touchpad: {
    tap_to_click: false,
    scrolling: false,
    speed: 0,
  },

  // metadata
  meta: {
    initialized: false,
  },
};

const inputDaemonReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_DAEMON_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      if (sent.destination === services.INPUT) {
        switch (sent.interface) {
          case interfaces.INPUT: {
            break;
          }
          case interfaces.FREEDESKTOP_PROPERTIES: {
            if (sent.method === 'GetAll') {
              const [newProperties] = received.args;
              const properties = {};
              Object.keys(newProperties).forEach((key) => {
                properties[key.replace(/-/g, '_')] = newProperties[key];
              });
              return { ...state, properties };
            }
            break;
          }
        }
        switch (sent.method) {
          case methods.ATTACH_VKBD:
          case methods.AUTH_BEGIN:
          case methods.AUTH_CLEAR_STATUS:
          case methods.AUTH_COLLECT_PASSWORD:
          case methods.AUTH_CREATE_HASH:
          case methods.AUTH_GET_CONTEXT:
          case methods.AUTH_GET_STATUS:
          case methods.AUTH_REMOTE_LOGIN:
          case methods.AUTH_REMOTE_STATUS:
          case methods.AUTH_RM_PLATFORM_USER:
          case methods.AUTH_SET_CONTEXT:
          case methods.AUTH_SET_CONTEXT_FLAGS:
          case methods.AUTH_TITLE:
          case methods.DETACH_VKBD:
          case methods.DIVERT_KEYBOARD_FOCUS:
          case methods.DIVERT_MOUSE_FOCUS:
          case methods.FOCUS_MODE:
          case methods.GET_AUTH_ON_BOOT:
            break;
          case methods.GET_CURRENT_KB_LAYOUT: {
            const [keyboardLayout] = received.args;
            return { ...state, keyboard_layout: keyboardLayout };
          }
          case methods.GET_FOCUS_DOMID:
          case methods.GET_IDLE_TIME: {
            break;
          }
          case methods.GET_KB_LAYOUTS: {
            const [keyboardLayouts] = received.args;
            return { ...state, keyboard_layouts: keyboardLayouts };
          }
          case methods.GET_LAST_INPUT_TIME:
          case methods.GET_LID_STATE:
            break;
          case methods.GET_MOUSE_SPEED: {
            const [mouseSpeed] = received.args;
            return { ...state, mouse_speed: mouseSpeed };
          }
          case methods.GET_PLATFORM_USER:
          case methods.GET_REMOTE_USER_HASH:
          case methods.GET_USER_KEYDIR:
          case methods.LOCK:
          case methods.LOCK_TIMEOUT_GET:
          case methods.LOCK_TIMEOUT_SET:
          case methods.SET_AUTH_ON_BOOT: {
            break;
          }
          case methods.SET_CURRENT_KB_LAYOUT: {
            const [keyboardLayout] = sent.args;
            return { ...state, keyboard_layout: keyboardLayout };
          }
          case methods.SET_DIVERT_KEYBOARD_FILTER:
            break;
          case methods.SET_MOUSE_SPEED: {
            const [mouseSpeed] = sent.args;
            return { ...state, mouseSpeed };
          }
          case methods.SET_SLOT:
          case methods.STOP_KEYBOARD_DIVERT:
          case methods.STOP_MOUSE_DIVERT:
          case methods.SWITCH_FOCUS:
          case methods.TOUCH:
            break;
          case methods.TOUCHPAD_GET: {
            const touchpad = { ...state.touchpad };
            switch (sent.args[0]) {
              case 'tap-to-click-enable': {
                [touchpad.tap_to_click_enable] = received.args;
                break;
              }
              case 'scrolling-enable': {
                [touchpad.scrolling_enable] = received.args;
                break;
              }
              case 'speed': {
                [touchpad.speed] = received.args;
                break;
              }
            }
            return { ...state, touchpad };
          }
          case methods.TOUCHPAD_SET: {
            const [prop, value] = sent.args;
            const { touchpad } = state;
            switch (prop) {
              case 'tap-to-click-enable': {
                touchpad.tap_to_click = value;
                break;
              }
              case 'scrolling-enable': {
                touchpad.scrolling = value;
                break;
              }
              case 'speed': {
                touchpad.speed = value;
                break;
              }
            }
            return { ...state, touchpad };
          }
          case methods.UPDATE_SEAMLESS_MOUSE_SETTINGS: {
            return state;
          }
        }
      }
      break;
    }
    case dbusActions.DBUS_SIGNAL_RECEIVED: {
      const signal = action.data;
      if (signal.interface === interfaces.INPUT) {
        switch (signal.member) {
          case signals.KEYBOARD_FOCUS_CHANGE:
          case signals.FOCUS_AUTH_FIELD:
          case signals.SYNC_AUTH_USERNAME:
          case signals.AUTH_STATUS:
          case signals.SECURE_MODE:
          case signals.AUTH_REMOTE_START_LOGIN:
          case signals.AUTH_REMOTE_START_RECOVERY:
          case signals.LID_STATE_CHANGED: {
            return state;
          }
        }
      }
    }
  }
  return state;
};

export default inputDaemonReducer;
