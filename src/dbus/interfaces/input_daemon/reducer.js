import dbusActions from '../../actions';
import { methods, signals } from './constants';
import { INPUT_DAEMON_INITIALIZED } from './actions';

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
  const { type, payload } = action;
  switch (type) {
    case INPUT_DAEMON_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.input') {
        switch (payload.interface) {
          case 'com.citrix.xenclient.input': {
            break;
          }
          case 'org.freedesktop.DBus.Properties': {
            if (payload.method === 'GetAll') {
              const [received] = payload.received;
              const properties = {};
              Object.keys(received).forEach((key) => {
                properties[key.replace(/-/g, '_')] = received[key];
              });
              return { ...state, properties };
            }
            break;
          }
        }
        switch (payload.method) {
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
            const [keyboard_layout] = payload.received;
            return { ...state, keyboard_layout };
          }
          case methods.GET_FOCUS_DOMID:
          case methods.GET_IDLE_TIME: {
            break;
          }
          case methods.GET_KB_LAYOUTS: {
            const [keyboard_layouts] = payload.received;
            return { ...state, keyboard_layouts };
          }
          case methods.GET_LAST_INPUT_TIME:
          case methods.GET_LID_STATE:
            break;
          case methods.GET_MOUSE_SPEED: {
            const [mouse_speed] = payload.received;
            return { ...state, mouse_speed };
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
            const keyboard_layout = payload.sent[0];
            return { ...state, keyboard_layout };
          }
          case methods.SET_DIVERT_KEYBOARD_FILTER:
            break;
          case methods.SET_MOUSE_SPEED: {
            const mouse_speed = payload.sent[0];
            return { ...state, mouse_speed };
          }
          case methods.SET_SLOT:
          case methods.STOP_KEYBOARD_DIVERT:
          case methods.STOP_MOUSE_DIVERT:
          case methods.SWITCH_FOCUS:
          case methods.TOUCH:
            break;
          case methods.TOUCHPAD_GET: {
            const touchpad = { ...state.touchpad };
            switch (payload.sent[0]) {
              case 'tap-to-click-enable': {
                touchpad.tap_to_click_enable = payload.received[0];
                break;
              }
              case 'scrolling-enable': {
                touchpad.scrolling_enable = payload.received[0];
                break;
              }
              case 'speed': {
                touchpad.speed = payload.received[0];
                break;
              }
            }
            return { ...state, touchpad };
          }
          case methods.TOUCHPAD_SET: {
            const [prop, value] = payload.sent;
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
      if (payload.interface === 'com.citrix.xenclient.input') {
        switch (payload.member) {
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
