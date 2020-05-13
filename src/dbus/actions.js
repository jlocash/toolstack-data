
const DBUS_SIGNAL_RECEIVED = 'DBUS_SIGNAL_RECEIVED';
const DBUS_RESPONSE_RECEIVED = 'DBUS_RESPONSE_RECEIVED';
const DBUS_ERROR_RECEIVED = 'DBUS_ERROR_RECEIVED';
const DBUS_SEND_MESSAGE = 'DBUS_SEND_MESSAGE';
const DBUS_MESSAGE_COMPLETED = 'DBUS_MESSAGE_COMPLETED';
const DBUS_READY = 'DBUS_READY';

const sendMessage = () => {
  let id = 0;
  return (service, path, iface, method, ...args) => ({
    type: DBUS_SEND_MESSAGE,
    payload: {
      id: ++id,
      destination: service,
      interface: iface,
      path,
      method,
      args,
    },
  });
};

export const messageTypes = {
  SIGNAL: 'signal',
  RESPONSE: 'response',
  ERROR: 'error',
};

const actions = {
  DBUS_SIGNAL_RECEIVED,
  DBUS_RESPONSE_RECEIVED,
  DBUS_ERROR_RECEIVED,
  DBUS_SEND_MESSAGE,
  DBUS_MESSAGE_COMPLETED,
  DBUS_READY,
  sendMessage: sendMessage(),
};

export default actions;
