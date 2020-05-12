import dbusActions from '../../actions';
import { USB_DEVICE_INITIALIZED } from './actions';
import { signals, methods } from './constants';

const initialState = {};

const usbReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case USB_DEVICE_INITIALIZED: {
      const { deviceId } = payload;
      return Object.assign({}, state, {
        [deviceId]: {
          ...state[deviceId],
          meta: {
            initialized: true,
          },
        },
      });
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.usbdaemon') {
        switch (payload.method) {
          case methods.GET_POLICY_DOMUUID:
          case methods.STATE: {
            return state;
          }
          case methods.LIST_DEVICES: {
            const received = payload.received[0];
            const devices = {};
            received.forEach(deviceId => {
              if (!state[deviceId]) {
                devices[deviceId] = {
                  name: '',
                  state: 0,
                  vm_assigned: '',
                  detail: '',
                  meta: {
                    initialized: false,
                  },
                };
              }
            });
            return Object.assign({}, state, { ...devices });
          }
          case methods.GET_DEVICE_INFO: {
            const deviceId = payload.sent[0];
            const [deviceName, deviceState, assignedVm, detail] = payload.received;
            return Object.assign({}, state, {
              [deviceId]: {
                ...state[deviceId],
                name: deviceName,
                state: deviceState,
                vm_assigned: assignedVm,
                detail,
              },
            });
          }
        }
      }
      break;
    }
    case dbusActions.DBUS_SIGNAL_RECEIVED: {
      if (payload.interface === 'com.citrix.xenclient.usbdaemon') {
        switch (payload.member) {
          case signals.DEVICE_ADDED:
          case signals.DEVICE_REJECTED:
          case signals.OPTICAL_DEVICE_DETECTED:
          case signals.DEVICES_CHANGED:
          case signals.DEVICE_INFO_CHANGED: {
            return state;
          }
        }
      }
      break;
    }
  }
  return state;
};

export default usbReducer;
