import actions from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_LOADED: {
      return { ...state, ...action.data };
    }
  }
  return state;
};
