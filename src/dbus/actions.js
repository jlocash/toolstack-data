const DBUS_SIGNAL_RECEIVED = 'DBUS_SIGNAL_RECEIVED';
const DBUS_RESPONSE_RECEIVED = 'DBUS_RESPONSE_RECEIVED';
const DBUS_ERROR_RECEIVED = 'DBUS_ERROR_RECEIVED';
const DBUS_SEND_MESSAGE = 'DBUS_SEND_MESSAGE';
const DBUS_DATA_RECEIVED = 'DBUS_DATA_RECEIVED';

export const messageTypes = {
    SIGNAL: 'signal',
    RESPONSE: 'response',
    ERROR: 'error',
};

const messageReceived = payload => {
    if (payload.type === messageTypes.SIGNAL) {
        return { type: SOCKET_SIGNAL_RECEIVED };
    }

    if (payload.type === messageTypes.RESPONSE) {
        return { type: SOCKET_RESPONSE_RECEIVED };
    }

    return { type: SOCKET_ERROR_RECEIVED };
};

const sendMessage = (service, path, iface, method, ...args) => {
    return {
        type: DBUS_SEND_MESSAGE,
        payload: {
            destination: service,
            interface: iface,
            path,
            method,
            args,
        }
    };
};

const actions = {
    DBUS_SIGNAL_RECEIVED,
    DBUS_RESPONSE_RECEIVED,
    DBUS_ERROR_RECEIVED,
    DBUS_SEND_MESSAGE,
    DBUS_DATA_RECEIVED,
    messageReceived,
    sendMessage,
};

export default actions;
