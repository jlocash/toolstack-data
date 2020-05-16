import actions from './actions';

const initialState = {
  connected: false,
  outgoing: 0,
  queue: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.SOCKET_CONNECTION_ESTABLISHED: {
      return { ...state, connected: true };
    }
    case actions.SOCKET_CONNECTION_CLOSED: {
      return { ...state, connected: false };
    }
    case actions.SOCKET_INCREMENT_OUTGOING: {
      return { ...state, outgoing: state.outgoing + 1 };
    }
    case actions.SOCKET_DECREMENT_OUTGOING: {
      return { ...state, outgoing: state.outgoing - 1 };
    }
    case actions.SOCKET_QUEUE_ADD: {
      const { message } = action.payload;
      return { ...state, queue: [...state.queue, message] };
    }
    case actions.SOCKET_QUEUE_REMOVE: {
      const [, ...queue] = state.queue;
      return { ...state, queue };
    }
  }
  return state;
};

export default reducer;
