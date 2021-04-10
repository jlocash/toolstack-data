import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { types } from './actions';
import { methods, signals } from './constants';

const initialState = {};

const usbReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.USB_DEVICE_INITIALIZED: {
      const { deviceId } = action.data;
      return {
        ...state,
        [deviceId]: {
          ...state[deviceId],
          meta: {
            initialized: true,
          },
        },
      };
    }
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      if (sent.destination === services.USB_DAEMON) {
        switch (sent.method) {
          case methods.GET_POLICY_DOMUUID:
          case methods.STATE: {
            return state;
          }
          case methods.LIST_DEVICES: {
            const [deviceIds] = received.args;
            const devices = {};
            deviceIds.forEach((deviceId) => {
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
            return { ...state, ...devices };
          }
          case methods.GET_DEVICE_INFO: {
            const [deviceId] = sent.args;
            const [deviceName, deviceState, assignedVm, detail] = received.args;
            return {
              ...state,
              [deviceId]: {
                ...state[deviceId],
                name: deviceName,
                state: deviceState,
                vm_assigned: assignedVm,
                detail,
              },
            };
          }
        }
      }
      break;
    }
    case dbusActions.DBUS_SIGNAL_RECEIVED: {
      const signal = action.data;
      if (signal.interface === interfaces.USB_DAEMON) {
        switch (signal.member) {
          case signals.DEVICE_ADDED:
            return state;
        }
      }
    }
      break;
  }
  return state;
};

export default usbReducer;
