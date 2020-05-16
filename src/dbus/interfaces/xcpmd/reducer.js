import dbusActions from '../../actions';
import { BATTERY_INITIALIZED } from './actions';
import { methods } from './constants';

const initialState = {};

const xcpmdReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case BATTERY_INITIALIZED: {
      const { batteryId } = payload;
      return {
        ...state,
        [batteryId]: {
          ...state[batteryId],
          meta: {
            initialized: true,
          },
        },
      };
    }
    case dbusActions.DBUS_MESSAGE_COMPLETED: {
      if (payload.destination === 'com.citrix.xenclient.xcpmd') {
        if (payload.interface === 'com.citrix.xenclient.xcpmd') {
          switch (payload.method) {
            case methods.BATTERIES_PRESENT: {
              const [received] = payload.received;
              const batteries = {};
              received.forEach(id => {
                batteries[id] = {
                  meta: {
                    initialized: false,
                  },
                };
              });
              return { ...state, ...batteries };
            }
          }
        }
      }
      break;
    }
  }
  return state;
};

export default xcpmdReducer;