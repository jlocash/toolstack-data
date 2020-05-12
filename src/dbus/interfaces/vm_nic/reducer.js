import dbusActions from '../../actions';
import { VM_NIC_INITIALIZED } from './actions';
import { methods } from './constants';


const initialState = {
  // metadata
  meta: {
    initialized: false,
  },
};

const vmNicReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case VM_NIC_INITIALIZED: {
      return {
        ...state,
        meta: {
          initialized: true,
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.vmnic') {
        switch (payload.method) {
          case methods.DELETE: {
            return state;
          }
        }
      }
    }
  }
  return state;
};

export default vmNicReducer;
