import dbusActions from '../../actions';
import { methods, signals } from './constants';
import { UPDATEMGR_INITIALIZED } from './actions';
import { interfaces, services } from '../../constants';

const initialState = {
  properties: {
    update_url: '',
    update_applicable: '',
    update_state: '',
    update_description: '',
    update_download_percent: 0,
    update_download_speed: 0,
    update_fail_reason: '',
  },

  // metadata
  meta: {
    initialized: false,
  },
};

const updatemgrReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATEMGR_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      if (sent.destination === services.UPDATEMGR) {
        switch (sent.interface) {
          case interfaces.UPDATEMGR: {
            switch (sent.method) {
              case methods.APPLY_UPDATE_AND_REBOOT:
              case methods.APPLY_UPDATE_AND_SHUTDOWN:
              case methods.CANCEL_UPDATE:
              case methods.CHECK_UPDATE:
              case methods.CHECK_UPDATE_LATEST:
              case methods.DOWNLOAD_UPDATE:
              case methods.DOWNLOAD_UPDATE_LATEST: {
                return state;
              }
            }
            break;
          }
          case interfaces.FREEDESKTOP_PROPERTIES: {
            if (sent.args[0] === interfaces.UPDATEMGR) {
              if (sent.method === 'GetAll') {
                const [newProperties] = received.args;
                const properties = {};
                Object.keys(newProperties).forEach((key) => {
                  properties[key.replace(/-/g, '_')] = newProperties[key];
                });

                return {
                  ...state,
                  properties,
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
      const signal = action.data;
      if (signal.interface === interfaces.UPDATEMGR) {
        switch (signal.member) {
          case signals.UPDATE_STATE_CHANGE: {
            const [updateState] = signal.args;
            return { ...state, update_state: updateState };
          }
          case signals.UPDATE_DOWNLOAD_PROGRESS: {
            const [percent, speed] = signal.args;
            return {
              ...state,
              update_download_percent: percent,
              update_download_speed: speed,
            };
          }
        }
      }
      break;
    }
  }
  return state;
};

export default updatemgrReducer;
