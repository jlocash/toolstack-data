import dbusActions from '../../actions';
import { methods } from './constants';
import { VM_DISK_INITIALIZED } from './actions';

const initialState = {
  // metadata
  meta: {
    initialized: false,
  },
};

const vmDiskReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case VM_DISK_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.vmdisk') {
        switch (payload.method) {
          case methods.ATTACH_PHYSICAL:
          case methods.ATTACH_VHD:
          case methods.DELETE:
          case methods.GENERATE_CRYPTO_KEY:
          case methods.GENERATE_CRYPTO_KEY_IN:
          case methods.MOUNT:
          case methods.UMOUNT: {
            return state;
          }
        }
      }
    }
  }
  return state;
};

export default vmDiskReducer;
