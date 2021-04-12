import actions from './actions';

const initialState = {
  devices: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.USB_DEVICE_LOADED: {
      const { device } = action.data;
      const devices = { ...state.devices, [device.id]: device };
      return { ...state, devices };
    }
  }
  return state;
};
