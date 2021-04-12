import actions from './actions';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.NDVM_PROPERTIES_LOADED: {
      const { ndvmPath, properties } = action.data;
      const ndvmState = { ...state[ndvmPath], properties };
      return { ...state, [ndvmPath]: ndvmState };
    }
    case actions.NDVM_NETWORK_LOADED: {
      const { ndvmPath, network } = action.data;
      const networks = { ...state[ndvmPath].networks, [network.path]: network };
      const ndvmState = { ...state[ndvmPath], networks };
      return { ...state, [ndvmPath]: ndvmState };
    }
    case actions.NDVM_REMOVE: {
      const { ndvmPath } = action.data;
      const newState = { ...state.ndvms };
      delete newState[ndvmPath];
      return newState;
    }
  }
  return state;
};
