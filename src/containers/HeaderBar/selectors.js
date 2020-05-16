
const getTime = state => {
  const { seconds_from_epoch } = state.dbus.host;
  if (seconds_from_epoch) {
    const date = new Date(seconds_from_epoch * 1000);
    // const month = ('0' + date.getMonth()).slice(-2);
    // const day = ('0' + date.getDay()).slice(-2);
    // const fullYear = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    // return `${month}/${day}/${fullYear} ${hours}:${minutes}`;
    return `${hours}:${minutes}`;
  }

  return 'Loading';
};

const selectors = {
  getTime,
};

export default selectors;
