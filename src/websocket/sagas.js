import {
  all, call, fork, put, take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import actions from './actions';

// promisify the creation of a WebSocket connection
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

// create an event channel for the socket connection
const createSocketChannel = (socket) => eventChannel((emitter) => {
  // eslint-disable-next-line
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    emitter(message);
  };

  return () => {
    socket.close();
  };
});

function* sendMessage(socket, message) {
  yield put({ type: actions.SOCKET_MESSAGE_SENT, data: message });
  socket.send(JSON.stringify(message));
}

function* watchSendMessage(socket) {
  while (true) {
    const { data } = yield take(actions.SOCKET_SEND_MESSAGE);
    yield fork(sendMessage, socket, data);
  }
}

// dispatch actions when WebSocket messages are received
function* watchIncomingMessages(socket) {
  const channel = createSocketChannel(socket);
  while (true) {
    const message = yield take(channel);
    yield put({ type: actions.SOCKET_MESSAGE_RECEIVED, data: message });
  }
}

export default function* websocketSaga() {
  try {
    const socket = yield call(createSocketConnection);
    yield put({ type: actions.SOCKET_CONNECTION_READY, data: { url: socket.url } });
    yield all([
      watchSendMessage(socket),
      watchIncomingMessages(socket),
    ]);
  } catch (err) {
    yield put({ type: actions.SOCKET_CONNECTION_ERROR });
    console.error(err);
  }
}
