import actions from './actions';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.BATTERY_LOADED: {
      const { battery } = action.data;
      return { ...state, [battery.id]: battery };
    }
    case actions.BATTERY_CLEAR_ALL: {
      return initialState;
    }
  }
  return state;
};
