const sendMessage = (service, path, iface, method, ...args) => ({
  service,
  path,
  method,
  args,
  interface: iface,
});

export default {
  sendMessage,
  DBUS_SEND_MESSAGE: 'DBUS_SEND_MESSAGE',
  DBUS_MESSAGE_SENT: 'DBUS_MESSAGE_SENT',
  DBUS_INCREMENT_CURRENT_ID: 'DBUS_INCREMENT_CURRENT_ID',
  DBUS_REGISTER_INTERFACE: 'DBUS_REGISTER_INTERFACE',

  // response types
  DBUS_SIGNAL_RECEIVED: 'DBUS_SIGNAL_RECEIVED',
  DBUS_RESPONSE_RECEIVED: 'DBUS_RESPONSE_RECEIVED',
  DBUS_ERROR_RECEIVED: 'DBUS_ERROR_RECEIVED',
};
