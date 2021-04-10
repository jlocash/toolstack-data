import {
  call, put, race, select, take,
} from 'redux-saga/effects';
import actions from './actions';
import { messageTypes } from './constants';
import selectors from './selectors';
import websocketActions from '../websocket/actions';

const isResponse = (action, id) => (
  action.type === websocketActions.SOCKET_MESSAGE_RECEIVED
  && action.data.type === messageTypes.RESPONSE
  && action.data['response-to'] === `${id}`
);

const isError = (action, id) => (
  action.type === websocketActions.SOCKET_MESSAGE_RECEIVED
  && action.data.type === messageTypes.ERROR
  && action.data['response-to'] === `${id}`
);

function* handleResponseReceived(message) {
  const response = yield take((action) => isResponse(action, message.id));
  yield put({
    type: actions.DBUS_RESPONSE_RECEIVED,
    data: {
      sent: message,
      received: response.data,
    },
  });
}

function* handleErrorReceived(message) {
  const error = yield take((action) => isError(action, message.id));
  yield put({
    type: actions.DBUS_ERROR_RECEIVED,
    data: {
      sent: message,
      received: error.data,
    },
  });
}

function* incrementCurrentId() {
  yield put({ type: actions.DBUS_INCREMENT_CURRENT_ID });
}

function* buildMessage(data) {
  yield incrementCurrentId();
  const currentId = yield select(selectors.getCurrentId);
  return {
    id: currentId,
    destination: data.service,
    path: data.path,
    interface: data.interface,
    method: data.method,
    args: data.args,
  };
}

export default function* sendMessage(data) {
  const message = yield call(buildMessage, data);
  yield put({ type: websocketActions.SOCKET_SEND_MESSAGE, data: message });
  yield put({ type: actions.DBUS_MESSAGE_SENT, data: message });
  yield race([
    handleResponseReceived(message),
    handleErrorReceived(message),
  ]);
}
