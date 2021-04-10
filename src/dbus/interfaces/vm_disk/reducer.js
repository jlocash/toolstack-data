import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import vmMethods from '../xenmgr_vm/constants';
import { types } from './actions';

const initialVmDiskState = {
  properties: {},
  meta: {
    initialized: false,
  },
};

const initialState = {};

const vmDiskReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.VM_DISK_INITIALIZED: {
      const { diskPath } = action.data;
      return {
        ...state,
        [diskPath]: {
          ...state[diskPath],
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
            if (sent.method === vmMethods.LIST_DISKS) {
              const [diskPaths] = received.args;
              const disks = {};
              diskPaths.forEach((diskPath) => {
                if (!state[diskPath]) {
                  disks[diskPath] = { ...initialVmDiskState };
                }
              });
              return { ...state, ...disks };
            }
            break;
          }
          case interfaces.FREEDESKTOP_PROPERTIES: {
            if (sent.args[0] === interfaces.VM_DISK) {
              if (sent.method === 'GetAll') {
                const diskPath = sent.path;
                const [newProperties] = received.args;
                const properties = {};
                Object.keys(newProperties).forEach((key) => {
                  properties[key.replace(/-/g, '_')] = newProperties[key];
                });
                return {
                  ...state,
                  [diskPath]: {
                    ...state[diskPath],
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

export default vmDiskReducer;
