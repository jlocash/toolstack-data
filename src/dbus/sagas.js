import { all, call, fork, put, race, take } from 'redux-saga/effects';
import actions from './actions';
import websocketActions from '../websocket/actions';
import initializeDbus from './interfaces/freedesktop/sagas';
import initializeUsbDaemon from './interfaces/usb_daemon/sagas';
import initializeInputDaemon from './interfaces/input_daemon/sagas';
import initializeNdvms from './interfaces/network_daemon/sagas';
import initializeSurfman from './interfaces/surfman/sagas';
import initializeUpdatemgr from './interfaces/updatemgr/sagas';
import initializeXcpmd from './interfaces/xcpmd/sagas';
import initializeXenmgr from './interfaces/xenmgr/sagas';
import initializeXenmgrHost from './interfaces/xenmgr_host/sagas';
import initializeXenmgrUi from './interfaces/xenmgr_ui/sagas';
import initializeXenmgrVm from './interfaces/xenmgr_vm/sagas';

// signal
// {
//     "id": 16796,
//     "type": "signal",
//     "interface": "com.citrix.xenclient.xenmgr",
//     "member": "vm_state_changed",
//     "path": "/",
//     "args": [
//         "a6862dd4-ff2d-4dfa-8925-378ac807f26f",
//         "/vm/a6862dd4_ff2d_4dfa_8925_378ac807f26f",
//         "creating",
//         0
//     ]
// }

// response
// {
//     "id": 119,
//     "type": "response",
//     "response-to": "144",
//     "args": [
//         "HyperX Cloud Flight Wireless Headset",
//         0,
//         "",
//         "Kingston"
//     ]
// }

const isResponse = (action, id) => {
  return (
    action.type === actions.DBUS_RESPONSE_RECEIVED &&
    action.payload['response-to'] == id
  );
};

const isError = (action, id) => {
  return (
    action.type === actions.DBUS_ERROR_RECEIVED &&
    action.payload['response-to'] == id
  );
};

function* handleResponseReceived(message) {
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

function* handleErrorReceived(message) {
  const { payload } = yield take(action => isError(action, message.id));
  console.log('error: ', payload);
  console.log('message: ', message);
}

export function* sendMessage({ payload }) {
  yield put(websocketActions.sendMessage(payload));
  yield race([
    call(handleResponseReceived, payload),
    call(handleErrorReceived, payload),
  ]);
}

function* watchSendMessage() {
  while (true) {
    const message = yield take(actions.DBUS_SEND_MESSAGE);
    yield fork(sendMessage, message);
  }
}

function* initialize() {
  yield initializeDbus();
  yield all([
    initializeXenmgr(),
    initializeXenmgrHost(),
    initializeXenmgrUi(),
    initializeXenmgrVm(),
    initializeNdvms(),
    initializeUsbDaemon(),
    initializeInputDaemon(),
    initializeXcpmd(),
    initializeSurfman(),
    initializeUpdatemgr(),
  ]);
}

export function* dbusSaga() {
  yield take(websocketActions.SOCKET_READY);
  yield all([
    watchSendMessage(),
    initialize(),
  ]);
}
