import actions from './actions';

const initialState = {
  properties: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_PROPERTIES_LOADED: {
      const { properties } = action.data;
      return { ...state, properties };
    }
  }
  return state;
};
