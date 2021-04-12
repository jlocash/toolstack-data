import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import usbDaemon, { signals } from '../interfaces/usb_daemon';
import dbusActions from '../actions';
import { interfaces } from '../constants';

function* loadDevice(dbus, deviceId) {
  const [name, state, assignedVm, detail] = yield call(dbus.send, usbDaemon.getDeviceInfo(deviceId, ''));
  yield put({
    type: actions.USB_DEVICE_LOADED,
    data: {
      device: {
        id: deviceId,
        name,
        state,
        assignedVm,
        detail,
      },
    },
  });
}

function* loadDevices(dbus) {
  const [deviceIds] = yield call(dbus.send, usbDaemon.listDevices());
  yield all(deviceIds.map((deviceId) => loadDevice(dbus, deviceId)));
}

function* signalHandler(dbus, action) {
  const { signal } = action.data;
  switch (signal.member) {
    case signals.DEVICE_ADDED: {
      const [deviceId] = signal.args;
      yield fork(loadDevice, dbus, deviceId);
      break;
    }
    case signals.DEVICE_INFO_CHANGED: {
      const [deviceId] = signal.args;
      yield fork(loadDevice, dbus, deviceId);
      break;
    }
    case signals.DEVICES_CHANGED: {
      yield fork(loadDevices, dbus);
      break;
    }
    case signals.DEVICE_REJECTED: {
      const [deviceName, reason] = signal.args;
      console.log(`usb device ${deviceName} rejected: ${reason}`);
      break;
    }
  }
}

const signalMatcher = (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED
  && action.data.interface === interfaces.USB_DAEMON
);

function* startWatchers(dbus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.USB_LOAD_DEVICES, loadDevices, dbus),
  ]);
}

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    loadDevices(dbus),
  ]);
}
