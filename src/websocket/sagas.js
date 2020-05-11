import { eventChannel, END } from 'redux-saga';
import { call, take, all, put, actionChannel } from 'redux-saga/effects';
import actions from './actions';
import dbusActions, { messageTypes } from '../dbus/actions';

const createSocketConnection = () => {
    return new Promise((resolve, reject) => {
        try {
            const host = process.env.REMOTE_HOST || window.location.hostname;
            const port = process.env.REMOTE_PORT || 8080;
            const socket = new WebSocket(`ws://${host}:${port}`);

            socket.onopen = () => {
                resolve(socket);
            }
        } catch (err) {
            reject(err);
        }
    });
}

const handleSocketSendMessage = function* (socket) {
    const channel = yield actionChannel(actions.SOCKET_SEND_MESSAGE);
    while (true) {
        const { payload } = yield take(channel);
        socket.send(JSON.stringify(payload));
    }
}

const createSocketMessageChannel = function* (socket) {
    return eventChannel(emit => {
        socket.onmessage = event => {
            const payload = JSON.parse(event.data);
            emit(payload);
        }

        const unsubscribe = () => {
            socket.close();
        }

        return unsubscribe;
    });
}

const handleSocketReceiveMessage = function* (socket) {
    const channel = yield call(createSocketMessageChannel, socket);
    while (true) {
        const payload = yield take(channel);
        switch (payload.type) {
            case messageTypes.SIGNAL: {
                yield put({ type: dbusActions.DBUS_SIGNAL_RECEIVED, payload });
                break;
            }
            case messageTypes.RESPONSE: {
                yield put({ type: dbusActions.DBUS_RESPONSE_RECEIVED, payload });
                break;
            }
            case messageTypes.ERROR: {
                yield put({ type: dbusActions.DBUS_ERROR_RECEIVED, payload });
                break;
            }
        }
    }
}

export const websocketSaga = function* () {
    try {
        const socket = yield call(createSocketConnection);
        yield put({ type: actions.SOCKET_CONNECTION_ESTABLISHED });
        yield all([
            handleSocketSendMessage(socket),
            handleSocketReceiveMessage(socket),
        ]);
    } catch (err) {
        yield put({ type: actions.SOCKET_CONNECTION_ERROR })
    }
}
