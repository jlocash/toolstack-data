import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import host, {
  WALLPAPER_DIR,
  signals as hostSignals,
  AudioDevice,
  GPUDevice,
  HostProperties,
  InstallState,
  PCIDevice,
  SoundCard,
  SoundCardControl,
} from '../interfaces/xenmgr_host';
import ui, { UIProperties } from '../interfaces/xenmgr_ui';
import xenmgr, { signals as xenmgrSignals, XenmgrConfigProperties } from '../interfaces/xenmgr';
import input from '../interfaces/input_daemon';
import usbDaemon, { signals as usbSignals } from '../interfaces/usb_daemon';
import * as DBus from '../dbus';
import { actions as dbusActions } from '../slice';
import { translate } from '../utils';
import { interfaces } from '../constants';
import { actions } from './slice';

function* loadProperties() {
  const [
    [hostProperties],
    [uiProperties],
    [xenmgrProperties],
  ]: Record<string, unknown>[][] = yield all([
    call(host.getAllProperties),
    call(ui.getAllProperties),
    call(xenmgr.getAllProperties),
  ]);

  yield put(actions.propertiesLoaded({
    properties: {
      ...translate<HostProperties>(hostProperties),
      ...translate<UIProperties>(uiProperties),
      ...translate<XenmgrConfigProperties>(xenmgrProperties),
    },
  }));
}

function* loadCaptureDevices() {
  const [soundCaptureDevices]: AudioDevice[][] = yield call(host.listCaptureDevices);
  yield put(actions.soundCaptureDevicesLoaded({ soundCaptureDevices }));
}

function* loadPlaybackDevices() {
  const [soundPlaybackDevices]: AudioDevice[][] = yield call(host.listPlaybackDevices);
  yield put(actions.soundPlaybackDevicesLoaded({ soundPlaybackDevices }));
}

function* loadSoundCard(soundCard: SoundCard) {
  const [controls]: SoundCardControl[][] = yield call(host.listSoundCardControls, soundCard.id);
  yield put(actions.soundCardLoaded({ soundCard: { ...soundCard, controls } }));
}

function* loadSoundCards() {
  const [soundCards]: SoundCard[][] = yield call(host.listSoundCards);
  yield all(soundCards.map((soundCard) => loadSoundCard(soundCard)));
}

function* loadSound() {
  yield all([
    loadCaptureDevices(),
    loadPlaybackDevices(),
    loadSoundCards(),
  ]);
}

function* loadPower() {
  const [
    [acLidCloseAction],
    [batteryLidCloseAction],
  ]: string[][] = yield all([
    call(host.getAcLidCloseAction),
    call(host.getBatteryLidCloseAction),
  ]);

  yield put(actions.powerLoaded({ acLidCloseAction, batteryLidCloseAction }));
}

function* loadCdDevices() {
  const [cdDevices]: unknown[][] = yield call(host.listCdDevices);
  yield put(actions.cdDevicesLoaded({ cdDevices }));
}

function* loadPciDevices() {
  const [pciDevices]: PCIDevice[][] = yield call(host.listPciDevices);
  yield put(actions.pciDevicesLoaded({ pciDevices }));
}

function* loadGpuDevices() {
  const [gpuDevices]: GPUDevice[][] = yield call(host.listGpuDevices);
  yield put(actions.gpusLoaded({ gpuDevices }));
}

function* loadIsos() {
  const [isos]: string[][] = yield call(host.listIsos);
  yield put(actions.isosLoaded({ isos }));
}

function* loadInstallState() {
  const [installState]: [Record<string, unknown>] = yield call(host.getInstallstate);
  yield put(actions.installStateLoaded({ installState: translate<InstallState>(installState) }));
}

function* loadWallpapers() {
  const [availableWallpapers]: string[][] = yield call(host.listUiPlugins, WALLPAPER_DIR);
  yield put(actions.wallpapersLoaded({ availableWallpapers }));
}

function* loadEula() {
  const [eula]: [string] = yield call(host.getEula);
  yield put(actions.eulaLoaded({ eula }));
}

function* loadInput() {
  const [
    [tapToClick],
    [scrollingEnabled],
    [speed],
    // [properties],
    [keyboardLayouts],
    [keyboardLayout],
    [mouseSpeed],
  ]: unknown[][] = yield all([
    call(input.touchpadGet, 'tap-to-click-enable'),
    call(input.touchpadGet, 'scrolling-enable'),
    call(input.touchpadGet, 'speed'),
    // call(input.getAllProperties),
    call(input.getKbLayouts),
    call(input.getCurrentKbLayout),
    call(input.getMouseSpeed),
  ]);

  yield put(actions.inputLoaded({
    touchpad: {
      tapToClick: (tapToClick as boolean),
      scrollingEnabled: (scrollingEnabled as boolean),
      speed: (speed as number),
    },
    keyboardLayout: (keyboardLayout as string),
    keyboardLayouts: (keyboardLayouts as string[]),
    mouseSpeed: (mouseSpeed as number),
    // properties: translate(properties),
  }));
}

function* loadUsbDevice(deviceId: number) {
  const [name, state, assignedVm, detail]: [
    string,
    number,
    string,
    string,
  ] = yield call(usbDaemon.getDeviceInfo, deviceId, '');
  yield put(actions.usbDeviceLoaded({
    device: {
      id: deviceId,
      name,
      state,
      assignedVm,
      detail,
    },
  }));
}

function* loadUsbDevices() {
  const [deviceIds]: number[][] = yield call(usbDaemon.listDevices);
  yield all(deviceIds.map((deviceId: number) => loadUsbDevice(deviceId)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && [
    interfaces.HOST,
    interfaces.USB_DAEMON,
    interfaces.XENMGR,
  ].includes(action.payload.signal.interface)
);

function* signalHandler(action: PayloadAction<{ signal: DBus.Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case hostSignals.STATE_CHANGED: {
      const [newState] = (signal.args as string[]);
      yield put(actions.stateUpdated({ newState }));
      break;
    }
    case xenmgrSignals.CONFIG_CHANGED: {
      yield fork(loadProperties);
      break;
    }
    case usbSignals.OPTICAL_DEVICE_DETECTED: {
      yield fork(loadCdDevices);
      break;
    }
    case usbSignals.DEVICE_ADDED: {
      const [deviceId] = (signal.args as number[]);
      yield fork(loadUsbDevice, deviceId);
      break;
    }
    case usbSignals.DEVICE_INFO_CHANGED: {
      const [deviceId] = (signal.args as number[]);
      yield fork(loadUsbDevice, deviceId);
      break;
    }
    case usbSignals.DEVICES_CHANGED: {
      yield fork(loadUsbDevices);
      break;
    }
    case usbSignals.DEVICE_REJECTED: {
      const [deviceName, reason] = signal.args;
      console.log(`usb device ${deviceName} rejected: ${reason}`);
      break;
    }
  }
}

function* startWatchers() {
  yield all([
    takeEvery(signalMatcher, signalHandler),
    takeEvery(actions.loadProperties().type, loadProperties),
    takeEvery(actions.loadSound().type, loadSound),
    takeEvery(actions.loadPower().type, loadPower),
    takeEvery(actions.loadCdDevices().type, loadCdDevices),
    takeEvery(actions.loadPciDevices().type, loadPciDevices),
    takeEvery(actions.loadGpus().type, loadGpuDevices),
    takeEvery(actions.loadIsos().type, loadIsos),
    takeEvery(actions.loadInstallState().type, loadInstallState),
    takeEvery(actions.loadWallpapers().type, loadWallpapers),
    takeEvery(actions.loadInput().type, loadInput),
    takeEvery(actions.loadUsbDevices().type, loadUsbDevices),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize() {
  yield all([
    startWatchers(),
    loadProperties(),
    loadSound(),
    loadPower(),
    loadCdDevices(),
    loadPciDevices(),
    loadGpuDevices(),
    loadIsos(),
    loadInstallState(),
    loadWallpapers(),
    loadEula(),
    loadInput(),
    loadUsbDevices(),
  ]);
}
