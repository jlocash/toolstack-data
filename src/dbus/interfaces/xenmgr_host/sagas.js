import { all, call, delay, fork, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions, { XENMGR_HOST_INITIALIZED } from './actions';
// import { signalMatcher as usbSignalMatcher } from '../usb_daemon/sagas';
// import { signals as usbSignals } from '../usb_daemon/constants';
import { WALLPAPER_DIR } from './constants.js';

function* updateTime() {
  while (true) {
    yield call(sendMessage, actions.getSecondsFromEpoch());
    yield delay(5000);
  }
}

// function* watchOpticalDeviceChanged() {
//   while (true) {
//     yield takeLatest(usbSignalMatcher(usbSignals.OPTICAL_DEVICE_DETECTED), listCdDevices);
//     yield fork(sendMessage, actions.listCdDevices());
//   }
// }

function* initialize() {
  yield all([
    call(sendMessage, actions.getAllProperties()),
    call(sendMessage, actions.listPciDevices()),
    call(sendMessage, actions.listCaptureDevices()),
    call(sendMessage, actions.listCdDevices()),
    call(sendMessage, actions.listGpuDevices()),
    call(sendMessage, actions.listIsos()),
    call(sendMessage, actions.listPciDevices()),
    call(sendMessage, actions.listPlaybackDevices()),
    call(sendMessage, actions.listSoundCards()),
    call(sendMessage, actions.getAcLidCloseAction()),
    call(sendMessage, actions.getBatteryLidCloseAction()),
    call(sendMessage, actions.getEula()),
    call(sendMessage, actions.getInstallstate()),
    call(sendMessage, actions.listUiPlugins(WALLPAPER_DIR)),
    fork(updateTime),
    // fork(watchOpticalDeviceChanged),
  ]);
  yield put({ type: XENMGR_HOST_INITIALIZED });
}

export default initialize;
