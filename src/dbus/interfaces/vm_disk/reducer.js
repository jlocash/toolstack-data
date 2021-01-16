
import dbusActions from '../../actions';
import { methods as vmMethods } from '../xenmgr_vm/constants';
import { VM_DISK_INITIALIZED } from './actions';

const initialVmDiskState = {
  properties: {},
  meta: {
    initialized: false,
  },
};

const initialState = {};

const vmDiskReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case VM_DISK_INITIALIZED: {
      const { diskPath } = payload;
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
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.xenmgr') {
        switch (payload.interface) {
          case 'com.citrix.xenclient.xenmgr.vm': {
            if (payload.method === vmMethods.LIST_DISKS) {
              const [received] = payload.received;
              const disks = {};
              received.forEach(diskPath => {
                if (!state[diskPath]) {
                  disks[diskPath] = { ...initialVmDiskState };
                }
              });
              return { ...state, ...disks };
            }
            break;
          }
          case 'org.freedesktop.DBus.Properties': {
            if (payload.sent[0] === 'com.citrix.xenclient.vmdisk') {
              if (payload.method === 'GetAll') {
                const diskPath = payload.path;
                const [received] = payload.received;
                const properties = {};
                Object.keys(received).forEach(key => {
                  properties[key.replace(/-/g, '_')] = received[key];
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
