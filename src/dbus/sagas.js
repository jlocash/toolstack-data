import {
  take, all, put, call, race, actionChannel,
} from 'redux-saga/effects';
import actions from './actions';
import websocketActions from '../websocket/actions';
import initializeDbus from './interfaces/freedesktop/sagas';
import initializeUsbDaemon from './interfaces/usb_daemon/sagas';
import initializeInputDaemon from './interfaces/input_daemon/sagas';
import initializeNdvms from './interfaces/network_daemon/sagas';
import initializeSurfman from './interfaces/surfman/sagas';
import initializeUpdatemgr from './interfaces/updatemgr/sagas';
import initializeVmDisk from './interfaces/vm_disk/sagas';
import initializeVmNic from './interfaces/vm_nic/sagas';
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

const initialize = function* () {
  yield initializeDbus();
  yield initializeXenmgr();
  yield initializeXenmgrHost();
  yield initializeXenmgrUi();
  yield initializeXenmgrVm();
  yield initializeVmDisk();
  yield initializeVmNic();
  yield initializeNdvms();
  yield initializeUsbDaemon();
  yield initializeInputDaemon();
  yield initializeXcpmd();
  yield initializeSurfman();
  yield initializeUpdatemgr();
};

// unsafe for use on its own, it is provided mainly for initializers
export function* sendMessage({ payload }) {
  yield put(websocketActions.sendMessage(payload));
  yield race([
    call(handleResponseReceived, payload),
    call(handleErrorReceived, payload),
  ]);
}

function* watchSendMessage() {
  const channel = yield actionChannel(actions.DBUS_SEND_MESSAGE);
  while (true) {
    const payload = yield take(channel);
    yield sendMessage(payload);
  }
}

function* handleResponseReceived(message) {
  const { payload } = yield take(actions.DBUS_RESPONSE_RECEIVED);
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

const handleErrorReceived = function* (message) {
  const { payload } = yield take(actions.DBUS_ERROR_RECEIVED);
  console.log('error: ', payload);
  console.log('message: ', message);
};

export const dbusSaga = function* () {
  yield take(websocketActions.SOCKET_READY);
  yield all([
    watchSendMessage(),
    initialize(),
  ]);
};
