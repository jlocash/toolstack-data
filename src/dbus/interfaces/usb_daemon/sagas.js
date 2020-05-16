import { all, call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import usbdaemon, { USB_DEVICE_INITIALIZED } from './actions';
import { signals } from './constants';
import dbusActions from '../../actions';

function* loadDevice(deviceId) {
  yield call(sendMessage, usbdaemon.getDeviceInfo(deviceId, ''));
  yield put({
    type: USB_DEVICE_INITIALIZED,
    payload: {
      deviceId,
    },
  });
}

function* loadDevices() {
  yield call(sendMessage, usbdaemon.listDevices());
  const devices = yield select(state => state.dbus.usbDevices);
  yield all(Object.keys(devices).map(deviceId => call(loadDevice, deviceId)));
}

export const signalMatcher = signal => {
  return action => (
    action.type === dbusActions.DBUS_SIGNAL_RECEIVED &&
    action.payload.interface === 'com.citrix.xenclient.usbdaemon' &&
    action.payload.member === signal
  );
};

function* watchDevicesChanged() {
  while (true) {
    yield takeLatest(signalMatcher(signals.DEVICES_CHANGED), loadDevices);
  }
}

function* watchDeviceInfoChanged() {
  while (true) {
    const { payload } = yield take(signalMatcher(signals.DEVICE_INFO_CHANGED));
    const [deviceId] = payload.args;
    yield fork(loadDevice, deviceId);
  }
}

function* watchDeviceRejected() {
  while (true) {
    const [deviceName, reason] = yield take(signalMatcher(signals.DEVICE_REJECTED));
    console.log(`usb device ${deviceName} rejected: ${reason}`);
  }
}

function* initialize() {
  yield all([
    loadDevices(),
    watchDevicesChanged(),
    watchDeviceInfoChanged(),
    watchDeviceRejected(),
  ]);
}

export default initialize;
