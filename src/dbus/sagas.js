import {
  all, call, put, take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import actions from './actions';
import freedesktop from './interfaces/freedesktop';
import dbusConnect from './dbus';
import initializeHost from './host/sagas';
import initializeVms from './vm/sagas';
import initializeUpdate from './update/sagas';
import initializeNdvms from './ndvm/sagas';
import initializeBatteries from './battery/sagas';

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

const createSignalChannel = (dbus) => eventChannel((emitter) => {
  dbus.onSignal((signal) => {
    emitter(signal);
  });

  return () => dbus.close();
});

function* watchSignals(dbus) {
  const channel = createSignalChannel(dbus);
  while (true) {
    const signal = yield take(channel);
    yield put({ type: actions.DBUS_SIGNAL_RECEIVED, data: { signal } });
  }
}

const createErrorChannel = (dbus) => eventChannel((emitter) => {
  dbus.onError((err) => {
    emitter(err);
  });

  return () => dbus.close();
});

function* watchErrors(dbus) {
  const channel = createErrorChannel(dbus);
  while (true) {
    const err = yield take(channel);
    yield put({ type: actions.DBUS_ERROR_RECEIVED, data: err });
  }
}

function* registerSignals(dbus) {
  const signalInterfaces = [
    'com.citrix.xenclient.status_tool',
    'com.citrix.xenclient.input',
    'com.citrix.xenclient.networkdomain.notify',
    'com.citrix.xenclient.networkdaemon.notify',
    'com.citrix.xenclient.updatemgr',
    'com.citrix.xenclient.usbdaemon',
    'com.citrix.xenclient.xcpmd',
    'com.citrix.xenclient.xenmgr',
    'com.citrix.xenclient.xenmgr.host',
    'com.citrix.xenclient.xenmgr.guestreq',
  ];

  yield all(signalInterfaces.map((iface) => call(dbus.send, freedesktop.addMatch(iface))));
}

function* initialize(dbus) {
  yield call(dbus.send, freedesktop.hello());
  yield registerSignals(dbus);

  yield all([
    initializeHost(dbus),
    initializeVms(dbus),
    initializeUpdate(dbus),
    initializeNdvms(dbus),
    initializeBatteries(dbus),
  ]);
}

export default function* dbusSaga() {
  try {
    const host = process.env.REMOTE_HOST || window.location.hostname;
    const port = process.env.REMOTE_PORT || 8080;
    const dbus = yield call(dbusConnect, host, port);
    yield all([
      call(watchSignals, dbus),
      call(watchErrors, dbus),
      call(initialize, dbus),
    ]);
  } catch (err) {
    yield put({
      type: actions.DBUS_CONNECTION_ERROR,
      data: { err },
    });
    console.error(err);
  }
}
