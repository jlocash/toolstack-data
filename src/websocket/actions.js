const WS_CONNECTION_READY = 'WS_CONNECTION_READY';
const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
const WS_MESSAGE_SEND = 'WS_MESSAGE_SEND';
const WS_MESSAGE_RECEIVED = 'WS_MESSAGE_RECEIVED';

const sendMessage = data => ({ type: WS_MESSAGE_SEND, data });
const receivedMessage = message => ({ type: WS_MESSAGE_RECEIVED, data: message });

export const actionTypes = {
    WS_CONNECTION_READY,
    WS_CONNECTION_ERROR,
    WS_MESSAGE_SEND,
    WS_MESSAGE_RECEIVED,
};

export const actionCreators = {
    sendMessage,
    receivedMessage,
};
