import {
  all, call, put, take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actions } from './slice';
import freedesktop from './interfaces/freedesktop';
import dbusConnect, { Signal } from './dbus';
import type { DBus } from './dbus';
import initializeHost from './host/sagas';
import initializeVms from './vm/sagas';
import initializeUpdate from './update/sagas';
import initializeNdvms from './ndvm/sagas';
import initializeBatteries from './battery/sagas';

const createSignalChannel = (dbus: DBus) => eventChannel((emitter) => {
  dbus.onSignal((signal) => {
    emitter(signal);
  });

  return () => dbus.close();
});

function* watchSignals(dbus: DBus) {
  const channel = createSignalChannel(dbus);
  while (true) {
    const signal: Signal = yield take(channel);
    yield put(actions.signalReceived({ signal }));
  }
}

const createErrorChannel = (dbus: DBus) => eventChannel((emitter) => {
  dbus.onError((err) => {
    emitter(err);
  });

  return () => dbus.close();
});

function* watchErrors(dbus: DBus) {
  const channel = createErrorChannel(dbus);
  while (true) {
    const err: Event = yield take(channel);
    yield put(actions.errorReceived({ err }));
  }
}

function* registerSignals(dbus: DBus, iface: string) {
  yield call(dbus.send, freedesktop.addMatch(iface));
  yield put(actions.signalsRegistered({ interface: iface }));
}

function* initialize(dbus: DBus) {
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

  yield call(dbus.send, freedesktop.hello());
  yield all(signalInterfaces.map((iface) => registerSignals(dbus, iface)));

  yield all([
    initializeHost(dbus),
    initializeVms(dbus),
    initializeUpdate(dbus),
    initializeNdvms(dbus),
    initializeBatteries(dbus),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* dbusSaga() {
  try {
    const host = process.env.REMOTE_HOST || window.location.hostname;
    const port = process.env.REMOTE_PORT || '8080';
    const dbus: DBus = yield call(dbusConnect, host, port);
    yield put(actions.connectionEstablished({ url: dbus.socket.url }));
    yield all([
      call(watchSignals, dbus),
      call(watchErrors, dbus),
      call(initialize, dbus),
    ]);
  } catch (err) {
    yield put(actions.connectionError({ err }));
    console.error(err);
  }
}
