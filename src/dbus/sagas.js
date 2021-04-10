import {
  all, fork, put, take,
} from 'redux-saga/effects';
import websocketActions from '../websocket/actions';
import actions from './actions';
import { messageTypes } from './constants';
import sendMessage from './sendMessage';
import registerSignals from './interfaces/freedesktop/sagas';
import initializeInput from './interfaces/input_daemon/sagas';
import initializeNetworkDaemon from './interfaces/network_daemon/sagas';
import initializeSurfman from './interfaces/surfman/sagas';
import initializeUpdatemgr from './interfaces/updatemgr/sagas';
import initializeUsbDaemon from './interfaces/usb_daemon/sagas';
import initializeBatteries from './interfaces/xcpmd/sagas';
import initializeXenmgr from './interfaces/xenmgr/sagas';
import initializeHost from './interfaces/xenmgr_host/sagas';
import initializeUi from './interfaces/xenmgr_ui/sagas';
import initializeVms from './interfaces/xenmgr_vm/sagas';

// outgoing
// {
//   id: int,
//   destination: string,
//   interface: string,
//   path: string,
//   method: string,
//   args: [any],
// }

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

const isSignal = (action) => (
  action.type === websocketActions.SOCKET_MESSAGE_RECEIVED
  && action.data.type === messageTypes.SIGNAL
);

function* watchSendMessage() {
  while (true) {
    const { data } = yield take(actions.DBUS_SEND_MESSAGE);
    yield fork(sendMessage, data);
  }
}

function* watchSignals() {
  while (true) {
    const { data } = yield take(isSignal);
    yield put({ type: actions.DBUS_SIGNAL_RECEIVED, data });
  }
}

function* initialize() {
  yield registerSignals();
  yield all([
    initializeInput(),
    initializeNetworkDaemon(),
    initializeSurfman(),
    initializeUpdatemgr(),
    initializeUsbDaemon(),
    initializeBatteries(),
    initializeXenmgr(),
    initializeHost(),
    initializeUi(),
    initializeVms(),
  ]);
}

export default function* dbusSaga() {
  yield take(websocketActions.SOCKET_CONNECTION_READY);
  yield all([
    watchSendMessage(),
    watchSignals(),
    initialize(),
  ]);
}
