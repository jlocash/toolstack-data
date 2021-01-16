
import dbusActions from '../../actions';
import { methods as vmMethods } from '../xenmgr_vm/constants';
import { VM_NIC_INITIALIZED } from './actions';

const initialVmNicState = {
  properties: {},
  meta: {
    initialized: false,
  },
};

const initialState = {};

const vmNicReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case VM_NIC_INITIALIZED: {
      const { nicPath } = payload;
      return {
        ...state,
        [nicPath]: {
          ...state[nicPath],
          meta: {
            initialized: true,
          },
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.xenmgr') {
        switch (payload.interface) {
          case 'com.citrix.xenclient.xenmgr.vm': {
            if (payload.method === vmMethods.LIST_NICS) {
              const [received] = payload.received;
              const nics = {};
              received.forEach(nicPath => {
                if (!state[nicPath]) {
                  nics[nicPath] = { ...initialVmNicState };
                }
              });
              return { ...state, ...nics };
            }
            break;
          }
          case 'org.freedesktop.DBus.Properties': {
            if (payload.sent[0] === 'com.citrix.xenclient.vmnic') {
              if (payload.method === 'GetAll') {
                const nicPath = payload.path;
                const [received] = payload.received;
                const properties = {};
                Object.keys(received).forEach(key => {
                  properties[key.replace(/-/g, '_')] = received[key];
                });
                return {
                  ...state,
                  [nicPath]: {
                    ...state[nicPath],
                    properties,
                  },
                };
              }
            }
            break;
          }
        }
      }
    }
  }
  return state;
};

export default vmNicReducer;
