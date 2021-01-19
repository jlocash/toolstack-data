import { actionTypes } from './actions';

const initialState = {
  messages: {
    currentId: 1,
    outgoing: {},
  },
};

const dbusReducer = (state = initialState, action = {}) => {
  const { type, data } = action;
  switch (type) {
    case actionTypes.DBUS_MESSAGE_SENT: {
      const { message } = data;
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          outgoing: {
            ...state.messages.outgoing,
            [message.id]: message,
          }
        }
      });
    }
    case actionTypes.DBUS_MESSAGE_COMPLETED: {
      const { id } = data;
      const newOutgoing = { ...state.messages.outgoing };
      delete newOutgoing[id];
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          outgoing: newOutgoing,
        }
      });
    }
  }
  return state;
};
