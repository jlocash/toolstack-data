/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */

import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import host, {
  WALLPAPER_DIR,
  AudioDevice,
  GPUDevice,
  HostProperties,
  InstallState,
  PCIDevice,
  SoundCard,
  SoundCardControl,
} from '../interfaces/xenmgr_host';
import ui, { UIProperties } from '../interfaces/xenmgr_ui';
import xenmgr, { XenmgrConfigProperties } from '../interfaces/xenmgr';
import input from '../interfaces/input_daemon';
import usbDaemon from '../interfaces/usb_daemon';
import { Signal } from '../dbus';
import { actions as dbusActions } from '../slice';
import {
  toUnderscore, translate, unwrap, merge,
} from '../utils';
import { interfaces } from '../constants';
import { actions } from './slice';

export function* loadProperties() {
  const [hostProperties, uiProperties, xenmgrProperties] = unwrap<Record<string, unknown>>(
    yield all([
      call(host.getAllProperties),
      call(ui.getAllProperties),
      call(xenmgr.getAllProperties),
    ]),
  );

  yield put(actions.propertiesLoaded({
    properties: merge(
      translate<HostProperties>(hostProperties, toUnderscore),
      translate<UIProperties>(uiProperties, toUnderscore),
      translate<XenmgrConfigProperties>(xenmgrProperties, toUnderscore),
    ),
  }));
}

export function* loadCaptureDevices() {
  const [soundCaptureDevices]: AudioDevice[][] = yield call(host.listCaptureDevices);
  yield put(actions.soundCaptureDevicesLoaded({ soundCaptureDevices }));
}

export function* loadPlaybackDevices() {
  const [soundPlaybackDevices]: AudioDevice[][] = yield call(host.listPlaybackDevices);
  yield put(actions.soundPlaybackDevicesLoaded({ soundPlaybackDevices }));
}

export function* loadSoundCard(soundCard: SoundCard) {
  const [controls]: SoundCardControl[][] = yield call(host.listSoundCardControls, soundCard.id);
  yield put(actions.soundCardLoaded({ soundCard: { ...soundCard, controls } }));
}

export function* loadSoundCards() {
  const [soundCards]: SoundCard[][] = yield call(host.listSoundCards);
  yield all(soundCards.map((soundCard) => loadSoundCard(soundCard)));
}

export function* loadSound() {
  yield all([
    loadCaptureDevices(),
    loadPlaybackDevices(),
    loadSoundCards(),
  ]);
}

export function* loadPower() {
  const [acLidCloseAction, batteryLidCloseAction]: string[] = unwrap(yield all([
    call(host.getAcLidCloseAction),
    call(host.getBatteryLidCloseAction),
  ]));

  yield put(actions.powerLoaded({ acLidCloseAction, batteryLidCloseAction }));
}

export function* loadCdDevices() {
  const [cdDevices]: unknown[][] = yield call(host.listCdDevices);
  yield put(actions.cdDevicesLoaded({ cdDevices }));
}

export function* loadPciDevices() {
  const [pciDevices]: PCIDevice[][] = yield call(host.listPciDevices);
  yield put(actions.pciDevicesLoaded({ pciDevices }));
}

export function* loadGpuDevices() {
  const [gpuDevices]: GPUDevice[][] = yield call(host.listGpuDevices);
  yield put(actions.gpusLoaded({ gpuDevices }));
}

export function* loadIsos() {
  const [isos]: string[][] = yield call(host.listIsos);
  yield put(actions.isosLoaded({ isos }));
}

export function* loadInstallState() {
  const [installState]: [Record<string, unknown>] = yield call(host.getInstallstate);
  yield put(actions.installStateLoaded({
    installState: translate<InstallState>(installState, toUnderscore),
  }));
}

export function* loadWallpapers() {
  const [availableWallpapers]: string[][] = yield call(host.listUiPlugins, WALLPAPER_DIR);
  yield put(actions.wallpapersLoaded({ availableWallpapers }));
}

export function* loadEula() {
  const [eula]: [string] = yield call(host.getEula);
  yield put(actions.eulaLoaded({ eula }));
}

export function* loadInput() {
  const [
    tapToClick,
    scrollingEnabled,
    speed,
    keyboardLayouts,
    keyboardLayout,
    mouseSpeed,
  ] = unwrap<unknown>(yield all([
    call(input.touchpadGet, 'tap-to-click-enable'),
    call(input.touchpadGet, 'scrolling-enable'),
    call(input.touchpadGet, 'speed'),
    call(input.getKbLayouts),
    call(input.getCurrentKbLayout),
    call(input.getMouseSpeed),
  ]));

  yield put(actions.inputLoaded({
    touchpad: {
      tapToClick: (tapToClick as boolean),
      scrollingEnabled: (scrollingEnabled as boolean),
      speed: (speed as number),
    },
    keyboardLayout: (keyboardLayout as string),
    keyboardLayouts: (keyboardLayouts as string[]),
    mouseSpeed: (mouseSpeed as number),
  }));
}

export function* loadUsbDevice(deviceId: number) {
  const [name, state, assignedVm, detail]: [
    string, number, string, string,
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

export function* loadUsbDevices() {
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

export function* signalHandler(action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case host.signals.STATE_CHANGED: {
      const [newState] = (signal.args as string[]);
      yield put(actions.stateUpdated({ newState }));
      break;
    }
    case xenmgr.signals.CONFIG_CHANGED: {
      yield fork(loadProperties);
      break;
    }
    case usbDaemon.signals.OPTICAL_DEVICE_DETECTED: {
      yield fork(loadCdDevices);
      break;
    }
    case usbDaemon.signals.DEVICE_ADDED: {
      const [deviceId] = (signal.args as number[]);
      yield fork(loadUsbDevice, deviceId);
      break;
    }
    case usbDaemon.signals.DEVICE_INFO_CHANGED: {
      const [deviceId] = (signal.args as number[]);
      yield fork(loadUsbDevice, deviceId);
      break;
    }
    case usbDaemon.signals.DEVICES_CHANGED: {
      yield fork(loadUsbDevices);
      break;
    }
    case usbDaemon.signals.DEVICE_REJECTED: {
      const [deviceName, reason] = signal.args;
      console.log(`usb device ${deviceName} rejected: ${reason}`);
      break;
    }
  }
}

export function* startWatchers() {
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
