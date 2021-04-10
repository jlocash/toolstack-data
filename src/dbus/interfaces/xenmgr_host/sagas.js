import {
  all, call, delay, fork, put, select, take,
} from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import actions, { types } from './actions';
import dbusActions from '../../actions';
import { signals as usbSignals } from '../usb_daemon/constants';
import { signals as xenmgrSignals } from '../xenmgr/constants';
import { WALLPAPER_DIR } from './constants';

function* updateTime() {
  while (true) {
    yield call(sendMessage, actions.getSecondsFromEpoch());
    yield delay(5000);
  }
}

function* loadSoundCards() {
  yield call(sendMessage, actions.listSoundCards());
  const soundCards = yield select((state) => state.dbus.host.sound_cards);
  yield all(soundCards.map((card) => call(sendMessage, actions.listSoundCardControls(card.id))));
}

function* loadAudio() {
  yield all([
    call(sendMessage, actions.listPlaybackDevices()),
    call(sendMessage, actions.listCaptureDevices()),
    loadSoundCards(),
  ]);
}

const signalMatcher = (action) => {
  const { type, data } = action;
  if (type === dbusActions.DBUS_SIGNAL_RECEIVED) {
    switch (data.interface) {
      case 'com.citrix.xenclient.xenmgr.host':
      case 'com.citrix.xenclient.usbdaemon':
        return true;
    }
  }
  return false;
};

function* watchSignals() {
  while (true) {
    const { data } = yield take(signalMatcher);
    switch (data.member) {
      case usbSignals.OPTICAL_DEVICE_DETECTED: {
        yield fork(sendMessage, actions.listCdDevices());
        break;
      }
      case xenmgrSignals.CONFIG_CHANGED: {
        yield fork(sendMessage, actions.getAllProperties());
        break;
      }
    }
  }
}

function* initialize() {
  yield all([
    call(sendMessage, actions.getAllProperties()),
    call(sendMessage, actions.listPciDevices()),
    call(sendMessage, actions.listCdDevices()),
    call(sendMessage, actions.listGpuDevices()),
    call(sendMessage, actions.listIsos()),
    call(sendMessage, actions.listPciDevices()),
    call(sendMessage, actions.getAcLidCloseAction()),
    call(sendMessage, actions.getBatteryLidCloseAction()),
    call(sendMessage, actions.getEula()),
    call(sendMessage, actions.getInstallstate()),
    call(sendMessage, actions.listUiPlugins(WALLPAPER_DIR)),
    loadAudio(),
    fork(updateTime),
    fork(watchSignals),
  ]);

  yield put({ type: types.XENMGR_HOST_INITIALIZED });
}

export default initialize;
