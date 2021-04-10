import actions from './actions';

const initialState = {
  url: '',
  ready: false,
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.SOCKET_CONNECTION_READY: {
      return {
        ...state,
        url: data.url,
        ready: true,
      };
    }
  }
  return state;
};
