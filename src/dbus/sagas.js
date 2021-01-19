import { actionTypes } from './actions';
import {
  actionTypes as wsActionTypes,
  actionCreators as wsActionCreators,
} from '../websocket/actions';
import { put, race, take, fork, takeEvery } from 'redux-saga/effects';

// isResponse is an action pattern that returns true if the action is of type 'response' and has a matching id
const isResponse = (action, id) => {
  return (
    action.type === wsActionTypes.WS_MESSAGE_RECEIVED &&
    action.data.type === 'response' &&
    action.data['response-to'] == id
  );
};

// isError is an action pattern that returns true if the action is of type 'error' and has a matching id
const isError = (action, id) => (
  action.type === wsActionTypes.WS_MESSAGE_RECEIVED &&
  action.data.type === 'error' &&
  action.data['response-to'] == id
);

// isSignal is an action pattern that returns true if the action is of type 'error'
const isSignal = action => (
  action.type === wsActionTypes.WS_MESSAGE_RECEIVED &&
  action.data.type === 'signal'
);

// handleResponse takes the action matching isResponse and puts
function* handleResponse(message) {
  const { payload } = yield take(action => isResponse(action, message.id));
  yield put({
    type: actions.DBUS_MESSAGE_COMPLETED,
    payload: {
      destination: message.destination,
      path: message.path,
      interface: message.interface,
      method: message.method,
      sent: message.args,
      received: payload.args,
    },
  });
}

// handleError takes a first response
function* handleError(message) {
  const { payload } = yield take(action => isError(action, message.id));
  console.log('error: ', payload);
  console.log('message: ', message);
}

// handleSignal takes the data received from the matching WebSocket message and dispatches it as a DBUS_SIGNAL_RECEIVED action
function* handleSignal({ data }) {
  yield put({ type: actionTypes.DBUS_SIGNAL_RECEIVED, data });
}

// sendMessage dispatches an action to the websocket saga instructing it to send the message
// A race then begins between the error and response handlers.
function* sendMessage(message) {
  yield put(wsActionCreators.sendMessage(message));
  yield race([
    call(handleResponse, message),
    call(handleError, message),
  ]);
}

// watchSendMessage receives DBUS_SEND_MESSAGE actions and forks them off in sendMessage.
function* watchSendMessage() {
  let id = 1;
  while (true) {
    const { data } = yield take(actionTypes.DBUS_SEND_MESSAGE);
    yield fork(sendMessage, {
      id,
      destination: data.destination,
      interface: data.interface,
      path: data.path,
      method: data.method,
      args: data.args,
    });
  }
}

function* watchSignals() {
  while (true) {
    const { data } = yield take(action => isSignal(action));
    yield fork(handleSignal);
  }
}

function* startWatchers() {
  yield all([
    watchSendMessage(),
    watchSignals(),
  ])
}

export function* dbusSaga() {
  yield take(wsActionTypes.WS_CONNECTION_READY);
  yield startWatchers();
  yield initializeServices();
}
