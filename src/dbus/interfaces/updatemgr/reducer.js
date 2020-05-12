import dbusActions from '../../actions';
import { methods, signals } from './constants';
import { UPDATEMGR_INITIALIZED } from './actions';

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
  const { type, payload } = action;
  switch (type) {
    case UPDATEMGR_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.updatemgr') {
        switch (payload.interface) {
          case 'com.citrix.xenclient.updatemgr': {
            switch (payload.method) {
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
          case 'org.freedesktop.DBus.Properties': {
            if (payload.sent[0] === 'com.citrix.xenclient.updatemgr') {
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
      if (payload.interface === 'com.citrix.xenclient.updatemgr') {
        switch (payload.member) {
          case signals.UPDATE_STATE_CHANGE:
          case signals.UPDATE_DOWNLOAD_PROGRESS: {
            return state;
          }
        }
      }
      break;
    }
  }
  return state;
};

export default updatemgrReducer;
