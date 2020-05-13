import { call, put, select } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import usbdaemon, { USB_DEVICE_INITIALIZED } from './actions';

function* initialize() {
  yield call(sendMessage, usbdaemon.listDevices());
  const devices = yield select(state => state.dbus.usbDevices);
  for (const deviceId in devices) {
    yield call(sendMessage, usbdaemon.getDeviceInfo(deviceId, ''));
    yield put({ 
      type: USB_DEVICE_INITIALIZED,
      payload: {
        deviceId,
      },
    });
  }
}

export default initialize;
