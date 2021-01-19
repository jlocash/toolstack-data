const DBUS_SEND_MESSAGE = 'DBUS_SEND_MESSAGE';
const DBUS_MESSAGE_SENT = 'DBUS_MESSAGE_SENT';
const DBUS_INCREMENT_MESSAGE_ID = 'DBUS_INCREMENT_MESSAGE_ID';
const DBUS_MESSAGE_COMPLETED = 'DBUS_MESSAGE_COMPLETED';

const dbusMessageComplete = id => ({
  type: DBUS_MESSAGE_COMPLETED,
  data: { id },
});

const dbusMessageSent = message => ({
  type: DBUS_MESSAGE_SENT,
  data: { message },
})

export const actionTypes = {
  DBUS_SEND_MESSAGE,
  DBUS_MESSAGE_SENT,
  DBUS_INCREMENT_MESSAGE_ID,
  DBUS_MESSAGE_COMPLETED,
};

export const actionCreators = {
  dbusMessageComplete,
};
