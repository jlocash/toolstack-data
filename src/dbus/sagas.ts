import {
  all, call, put, take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actions } from './slice';
import freedesktop from './interfaces/freedesktop';
import * as DBus from './dbus';
import initializeHost from './host/sagas';
import initializeVms from './vm/sagas';
import initializeUpdate from './update/sagas';
import initializeNdvms from './ndvm/sagas';
import initializeBatteries from './battery/sagas';

const createSignalChannel = () => eventChannel((emitter) => {
  DBus.onSignal((signal) => {
    emitter(signal);
  });

  return () => DBus.close();
});

function* watchSignals() {
  const channel = createSignalChannel();
  while (true) {
    const signal: DBus.Signal = yield take(channel);
    yield put(actions.signalReceived({ signal }));
  }
}

const createErrorChannel = () => eventChannel((emitter) => {
  DBus.onError((err) => {
    emitter(err);
  });

  return () => DBus.close();
});

function* watchErrors() {
  const channel = createErrorChannel();
  while (true) {
    const err: Event = yield take(channel);
    yield put(actions.errorReceived({ err }));
  }
}

function* registerSignals(iface: string) {
  yield call(freedesktop.addMatch, iface);
  yield put(actions.signalsRegistered({ interface: iface }));
}

function* initialize() {
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

  yield call(freedesktop.hello);
  yield all(signalInterfaces.map((iface) => registerSignals(iface)));
  yield all([
    initializeHost(),
    initializeVms(),
    initializeUpdate(),
    initializeNdvms(),
    initializeBatteries(),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* dbusSaga() {
  try {
    const host = process.env.REMOTE_HOST || window.location.hostname;
    const port = process.env.REMOTE_PORT || '8080';
    yield call(DBus.connect, host, port);
    yield all([
      watchSignals(),
      watchErrors(),
      initialize(),
    ]);
  } catch (err) {
    yield put(actions.connectionError({ err }));
    console.error(err);
  }
}
