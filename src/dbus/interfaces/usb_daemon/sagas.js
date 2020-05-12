import { put, call, select } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import usbdaemon, { USB_DEVICE_INITIALIZED } from './actions';

const initialize = function* () {
  yield call(sendMessage, usbdaemon.listDevices());
  const devices = yield select(state => state.dbus.usbDevices);
  for (let deviceId in devices) {
    yield call(sendMessage, usbdaemon.getDeviceInfo(deviceId, ''));
    yield put({ 
      type: USB_DEVICE_INITIALIZED,
      payload: {
        deviceId,
      },
    });
  }
};

export default initialize;
