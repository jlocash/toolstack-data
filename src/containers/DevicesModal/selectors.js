const getInitialized = state => {
  return state.dbus.host.meta.initialized &&
  Object.keys(state.dbus.usbDevices).reduce((acc, curr) => {
    return (acc && state.dbus.usbDevices[curr].meta.initialized);
  }, true);
};

export const selectors = ({
  getInitialized,
});
