
const getTime = state => {
  const { seconds_from_epoch } = state.dbus.host;
  if (seconds_from_epoch) {
    return new Date(seconds_from_epoch * 1000).toUTCString();
  }

  return 'Loading';
};

const selectors = {
  getTime,
};

export default selectors;
