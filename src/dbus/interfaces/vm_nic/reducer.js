import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import vmMethods from '../xenmgr_vm/constants';
import { types } from './actions';

const initialVmNicState = {
  properties: {},
  meta: {
    initialized: false,
  },
};

const initialState = {};

const vmNicReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.VM_NIC_INITIALIZED: {
      const { nicPath } = action.data;
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
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      if (sent.destination === services.XENMGR) {
        switch (sent.interface) {
          case interfaces.VM: {
            if (sent.method === vmMethods.LIST_NICS) {
              const [nicPaths] = received.args;
              const nics = {};
              nicPaths.forEach((nicPath) => {
                if (!state[nicPath]) {
                  nics[nicPath] = { ...initialVmNicState };
                }
              });
              return { ...state, ...nics };
            }
            break;
          }
          case interfaces.FREEDESKTOP_PROPERTIES: {
            if (sent.args[0] === interfaces.VM_NIC) {
              if (sent.method === 'GetAll') {
                const nicPath = sent.path;
                const [newProperties] = received.args;
                const properties = {};
                Object.keys(newProperties).forEach((key) => {
                  properties[key.replace(/-/g, '_')] = newProperties[key];
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
