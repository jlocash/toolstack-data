import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { types } from './actions';
import methods from './constants';

const initialState = {};

const xcpmdReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.BATTERY_INITIALIZED: {
      const { batteryId } = action.data;
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
    case dbusActions.DBUS_RESPONSE_RECEIVED: {
      const { sent, received } = action.data;
      if (sent.destination === services.XCPMD) {
        if (sent.interface === interfaces.XCPMD) {
          switch (sent.method) {
            case methods.BATTERIES_PRESENT: {
              const [ids] = received.args;
              const batteries = {};
              ids.forEach((id) => {
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
