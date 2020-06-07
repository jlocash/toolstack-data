const getInitialized = state => (
  state.dbus.host.meta.initialized &&
    state.dbus.input.meta.initialized &&
    state.dbus.ui.meta.initialized
);

export const selectors = ({
  getInitialized,
});
