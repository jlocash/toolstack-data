import { all, call, fork, put, select, take } from 'redux-saga/effects';
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

const signalMatcher = action => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED &&
  action.payload.interface === 'com.citrix.xenclient.usbdaemon'
);

function* watchSignals() {
  while (true) {
    const { payload } = yield take(signalMatcher);
    switch (payload.member) {
      case signals.DEVICE_ADDED: {
        const [deviceId] = payload.args;
        yield fork(loadDevice, deviceId);
        break;
      }
      case signals.DEVICE_INFO_CHANGED: {
        const [deviceId] = payload.args;
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

function* initialize() {
  yield all([
    loadDevices(),
    watchSignals(),
  ]);
}

export default initialize;
