import dbusActions from '../../actions';
import { signals, methods } from './constants';

const initialState = {
    // properties
    numlock_restore_on_switch: false,

    // signals


    // methods
};

const inputDaemonReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case dbusActions.DBUS_RESPONSE_RECEIVED: {
            if (payload.destination === 'com.citrix.xenclient.input') {
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
                    case methods.GET_CURRENT_KB_LAYOUT:
                    case methods.GET_FOCUS_DOMID:
                    case methods.GET_IDLE_TIME:
                    case methods.GET_KB_LAYOUTS:
                    case methods.GET_LAST_INPUT_TIME:
                    case methods.GET_LID_STATE:
                    case methods.GET_MOUSE_SPEED:
                    case methods.GET_PLATFORM_USER:
                    case methods.GET_REMOTE_USER_HASH:
                    case methods.GET_USER_KEYDIR:
                    case methods.LOCK:
                    case methods.LOCK_TIMEOUT_GET:
                    case methods.LOCK_TIMEOUT_SET:
                    case methods.SET_AUTH_ON_BOOT:
                    case methods.SET_CURRENT_KB_LAYOUT:
                    case methods.SET_DIVERT_KEYBOARD_FILTER:
                    case methods.SET_MOUSE_SPEED:
                    case methods.SET_SLOT:
                    case methods.STOP_KEYBOARD_DIVERT:
                    case methods.STOP_MOUSE_DIVERT:
                    case methods.SWITCH_FOCUS:
                    case methods.TOUCH:
                    case methods.TOUCHPAD_GET:
                    case methods.TOUCHPAD_SET:
                    case methods.UPDATE_SEAMLESS_MOUSE_SETTINGS: {
                        return state;
                    }
                }
            }
            break;
        }
        case dbusActions.DBUS_SIGNAL_RECEIVED: {
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
    return state;
};

export default inputDaemonReducer;
