import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import host, { WALLPAPER_DIR } from '../interfaces/xenmgr_host';
import ui from '../interfaces/xenmgr_ui';
import xenmgr, { signals as xenmgrSignals } from '../interfaces/xenmgr';
import { signals as usbSignals } from '../interfaces/usb_daemon';
import fixKeys from '../fixKeys';
import dbusActions from '../actions';
import { interfaces } from '../constants';

function* loadProperties(dbus) {
  const [hostProperties, uiProperties, xenmgrProperties] = yield all([
    call(dbus.send, host.getAllProperties()),
    call(dbus.send, ui.getAllProperties()),
    call(dbus.send, xenmgr.getAllProperties()),
  ]);

  yield put({
    type: actions.HOST_PROPERTIES_LOADED,
    data: {
      properties: {
        ...fixKeys(hostProperties[0]),
        ...fixKeys(uiProperties[0]),
        ...fixKeys(xenmgrProperties[0]),
      },
    },
  });
}

function* loadCaptureDevices(dbus) {
  const [captureDevices] = yield call(dbus.send, host.listCaptureDevices());
  yield put({
    type: actions.HOST_SOUND_CAPTURE_DEVICES_LOADED,
    data: {
      captureDevices: captureDevices[0],
    },
  });
}

function* loadPlaybackDevices(dbus) {
  const [playbackDevices] = yield call(dbus.send, host.listPlaybackDevices());
  yield put({
    type: actions.HOST_SOUND_PLAYBACK_DEVICES_LOADED,
    data: {
      playbackDevices: playbackDevices[0],
    },
  });
}

function* loadSoundCard(dbus, soundCard) {
  const [controls] = yield call(dbus.send, host.listSoundCardControls(soundCard.id));
  yield put({
    type: actions.HOST_SOUND_CARD_LOADED,
    data: {
      soundCard: {
        ...soundCard,
        controls: controls[0],
      },
    },
  });
}

function* loadSoundCards(dbus) {
  const [soundCards] = yield call(dbus.send, host.listSoundCards());
  yield all(soundCards.map((soundCard) => loadSoundCard(dbus, soundCard)));
}

function* loadSound(dbus) {
  yield all([
    loadCaptureDevices(dbus),
    loadPlaybackDevices(dbus),
    loadSoundCards(dbus),
  ]);
}

function* loadPower(dbus) {
  const [acLidCloseAction, batLidCloseAction] = yield all([
    call(dbus.send, host.getAcLidCloseAction()),
    call(dbus.send, host.getBatteryLidCloseAction()),
  ]);

  yield put({
    type: actions.HOST_POWER_LOADED,
    data: {
      acLidCloseAction: acLidCloseAction[0],
      batteryLidCloseAction: batLidCloseAction[0],
    },
  });
}

function* loadCdDevices(dbus) {
  const [cdDevices] = yield call(dbus.send, host.listCdDevices());
  yield put({
    type: actions.HOST_CD_DEVICES_LOADED,
    data: {
      cdDevices: cdDevices[0],
    },
  });
}

function* loadPciDevices(dbus) {
  const [pciDevices] = yield call(dbus.send, host.listPciDevices());
  yield put({
    type: actions.HOST_PCI_DEVICES_LOADED,
    data: { pciDevices },
  });
}

function* loadGpuDevices(dbus) {
  const [gpuDevices] = yield call(dbus.send, host.listGpuDevices());
  yield put({
    type: actions.HOST_GPUS_LOADED,
    data: { gpuDevices },
  });
}

function* loadIsos(dbus) {
  const [isos] = yield call(dbus.send, host.listIsos());
  yield put({
    type: actions.HOST_ISOS_LOADED,
    data: { isos },
  });
}

function* loadInstallState(dbus) {
  const [installState] = yield call(dbus.send, host.getInstallstate());
  yield put({
    type: actions.HOST_INSTALL_STATE_LOADED,
    data: {
      installState: fixKeys(installState),
    },
  });
}

function* loadWallpapers(dbus) {
  const [availableWallpapers] = yield call(dbus.send, host.listUiPlugins(WALLPAPER_DIR));
  yield put({
    type: actions.HOST_WALLPAPERS_LOADED,
    data: { availableWallpapers },
  });
}

function* loadEula(dbus) {
  const [eula] = yield call(dbus.send, host.getEula());
  yield put({
    type: actions.HOST_EULA_LOADED,
    data: { eula },
  });
}

const signalMatcher = (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED
  && [
    interfaces.HOST,
    interfaces.USB_DAEMON,
  ].includes(action.data.interface)
);

function* signalHandler(dbus, action) {
  const { signal } = action.data;
  switch (signal.member) {
    case xenmgrSignals.CONFIG_CHANGED: {
      yield fork(loadProperties, dbus);
      break;
    }
    case usbSignals.OPTICAL_DEVICE_DETECTED: {
      yield fork(loadCdDevices, dbus);
      break;
    }
  }
}

function* startWatchers(dbus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.HOST_LOAD_PROPERTIES, loadProperties, dbus),
    takeEvery(actions.HOST_LOAD_SOUND, loadSound, dbus),
    takeEvery(actions.HOST_LOAD_POWER, loadPower, dbus),
    takeEvery(actions.HOST_LOAD_CD_DEVICES, loadCdDevices, dbus),
    takeEvery(actions.HOST_LOAD_PCI_DEVICES, loadPciDevices, dbus),
    takeEvery(actions.HOST_LOAD_GPUS, loadGpuDevices, dbus),
    takeEvery(actions.HOST_LOAD_ISOS, loadIsos, dbus),
    takeEvery(actions.HOST_LOAD_INSTALL_STATE, loadInstallState, dbus),
    takeEvery(actions.HOST_LOAD_WALLPAPERS, loadWallpapers, dbus),
  ]);
}

export default function* initialize(dbus) {
  yield all([
    startWatchers(dbus),
    loadProperties(dbus),
    loadSound(dbus),
    loadPower(dbus),
    loadCdDevices(dbus),
    loadPciDevices(dbus),
    loadGpuDevices(dbus),
    loadIsos(dbus),
    loadInstallState(dbus),
    loadWallpapers(dbus),
    loadEula(dbus),
  ]);
}
