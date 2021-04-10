import {
  all, call, fork, put, select, take,
} from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import usbdaemon, { types } from './actions';
import { signals } from './constants';
import dbusActions from '../../actions';
import { interfaces } from '../../constants';

function* loadDevice(deviceId) {
  yield call(sendMessage, usbdaemon.getDeviceInfo(deviceId, ''));
  yield put({
    type: types.USB_DEVICE_INITIALIZED,
    data: {
      deviceId,
    },
  });
}

function* loadDevices() {
  yield call(sendMessage, usbdaemon.listDevices());
  const devices = yield select((state) => state.dbus.usbDevices);
  yield all(Object.keys(devices).map((deviceId) => call(loadDevice, deviceId)));
}

const signalMatcher = (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED
  && action.data.interface === interfaces.USB_DAEMON
);

function* watchSignals() {
  while (true) {
    const { data } = yield take(signalMatcher);
    switch (data.member) {
      case signals.DEVICE_ADDED: {
        const [deviceId] = data.args;
        yield fork(loadDevice, deviceId);
        break;
      }
      case signals.DEVICE_INFO_CHANGED: {
        const [deviceId] = data.args;
        yield fork(loadDevice, deviceId);
        break;
      }
      case signals.DEVICES_CHANGED: {
        yield fork(loadDevices);
        break;
      }
      case signals.DEVICE_REJECTED: {
        const [deviceName, reason] = yield take(signalMatcher(signals.DEVICE_REJECTED));
        console.log(`usb device ${deviceName} rejected: ${reason}`);
        break;
      }
    }
  }
}

export default function* initialize() {
  yield all([
    loadDevices(),
    watchSignals(),
  ]);
}
