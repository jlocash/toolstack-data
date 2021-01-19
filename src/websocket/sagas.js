import { call, takeEvery } from 'redux-saga/effects';
import { actionTypes, actionCreators } from './actions';

// createSocketConnection returns a Promise that resolves when the WebSocket has been connected
// and rejects when an error is encountered
const createSocketConnection = () => {
  return new Promise((resolve, reject) => {
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
};

function* sendMessage(socket, { data }) {
  socket.send(data);
}

function* watchSendMessage(socket) {
  yield takeEvery(actionTypes.WS_MESSAGE_SEND, sendMessage, socket);
}

// createSocketChannel returns eventChannel bound to the WebSocket's onmessage event
const createSocketChannel = (socket) => eventChannel((emit) => {
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    emit(message);
  };

  return () => {
    socket.close();
  };
});

// watchReceivedMessages is a watcher that publishes WS_MESSAGE_RECEIVED actions 
// based on messages received from the websocket
function* watchReceivedMessages() {
  const receiveChannel = yield call(createSocketChannel, socket);
  while (true) {
    const message = yield take(receiveChannel);
    yield put(actionCreators.receivedMessage(message));
  }
}

function* startWatchers(socket) {
  yield call(watchSendMessage, socket);
  yield call(watchReceivedMessages, socket);
}

export function* websocketSaga() {
  try {
    const socket = yield call(createSocketConnection);
    yield put({ type: actions.WS_CONNECTION_READY });
    yield call(startWatchers, socket);
  } catch (err) {
    yield put({ type: actions.WS_CONNECTION_ERROR });
    console.log(err);
  }
}
