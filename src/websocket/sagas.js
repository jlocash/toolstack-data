import { eventChannel } from 'redux-saga';
import {
  all, call, fork, put, take,
} from 'redux-saga/effects';
import actions from './actions';
import dbusActions, { messageTypes } from '../dbus/actions';

const createSocketConnection = () => new Promise((resolve, reject) => {
  try {
    const host = process.env.REMOTE_HOST || window.location.hostname;
    const port = process.env.REMOTE_PORT || 8080;
    const socket = new WebSocket(`ws://${host}:${port}`);
    socket.onopen = () => {
      resolve(socket);
    };
  } catch (err) {
    reject(err);
  }
});

function* sendMessage(socket, payload) {
  yield put({ type: actions.SOCKET_INCREMENT_OUTGOING });
  socket.send(JSON.stringify(payload));
}

function* watchSendMessage(socket) {
  while (true) {
    const { payload } = yield take(actions.SOCKET_SEND_MESSAGE);
    yield fork(sendMessage, socket, payload)
  }
}

const createSocketChannel = (socket) => eventChannel((emit) => {
  socket.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    emit(payload);
  };

  return () => {
    socket.close();
  };
});

function* watchIncomingMessages(socket) {
  const channel = yield call(createSocketChannel, socket);
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

export function* websocketSaga() {
  try {
    const socket = yield call(createSocketConnection);
    yield put({ type: actions.SOCKET_CONNECTION_ESTABLISHED });
    yield put({ type: actions.SOCKET_READY });
    yield all([
      call(watchSendMessage, socket),
      call(watchIncomingMessages, socket),
    ]);
  } catch (err) {
    yield put({ type: actions.SOCKET_CONNECTION_ERROR });
    console.log(err);
  }
}
