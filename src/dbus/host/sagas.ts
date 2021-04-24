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
import { DBus, Signal } from '../dbus';
import { actions as dbusActions } from '../slice';
import { translate } from '../utils';
import { interfaces } from '../constants';
import { actions } from './slice';

function* loadProperties(dbus: DBus) {
  const [
    [hostProperties],
    [uiProperties],
    [xenmgrProperties],
  ]: Record<string, unknown>[][] = yield all([
    call(dbus.send, host.getAllProperties()),
    call(dbus.send, ui.getAllProperties()),
    call(dbus.send, xenmgr.getAllProperties()),
  ]);

  yield put(actions.propertiesLoaded({
    properties: {
      ...translate<HostProperties>(hostProperties),
      ...translate<UIProperties>(uiProperties),
      ...translate<XenmgrConfigProperties>(xenmgrProperties),
    },
  }));
}

function* loadCaptureDevices(dbus: DBus) {
  const [soundCaptureDevices]: AudioDevice[][] = yield call(dbus.send, host.listCaptureDevices());
  yield put(actions.soundCaptureDevicesLoaded({ soundCaptureDevices }));
}

function* loadPlaybackDevices(dbus: DBus) {
  const [soundPlaybackDevices]: AudioDevice[][] = yield call(dbus.send, host.listPlaybackDevices());
  yield put(actions.soundPlaybackDevicesLoaded({ soundPlaybackDevices }));
}

function* loadSoundCard(dbus: DBus, soundCard: SoundCard) {
  const [controls]: SoundCardControl[][] = yield call(
    dbus.send,
    host.listSoundCardControls(soundCard.id),
  );
  yield put(actions.soundCardLoaded({ soundCard: { ...soundCard, controls } }));
}

function* loadSoundCards(dbus: DBus) {
  const [soundCards]: SoundCard[][] = yield call(dbus.send, host.listSoundCards());
  yield all(soundCards.map((soundCard) => loadSoundCard(dbus, soundCard)));
}

function* loadSound(dbus: DBus) {
  yield all([
    loadCaptureDevices(dbus),
    loadPlaybackDevices(dbus),
    loadSoundCards(dbus),
  ]);
}

function* loadPower(dbus: DBus) {
  const [
    [acLidCloseAction],
    [batteryLidCloseAction],
  ]: string[][] = yield all([
    call(dbus.send, host.getAcLidCloseAction()),
    call(dbus.send, host.getBatteryLidCloseAction()),
  ]);

  yield put(actions.powerLoaded({ acLidCloseAction, batteryLidCloseAction }));
}

function* loadCdDevices(dbus: DBus) {
  const [cdDevices]: unknown[][] = yield call(dbus.send, host.listCdDevices());
  yield put(actions.cdDevicesLoaded({ cdDevices }));
}

function* loadPciDevices(dbus: DBus) {
  const [pciDevices]: PCIDevice[][] = yield call(dbus.send, host.listPciDevices());
  yield put(actions.pciDevicesLoaded({ pciDevices }));
}

function* loadGpuDevices(dbus: DBus) {
  const [gpuDevices]: GPUDevice[][] = yield call(dbus.send, host.listGpuDevices());
  yield put(actions.gpusLoaded({ gpuDevices }));
}

function* loadIsos(dbus: DBus) {
  const [isos]: string[][] = yield call(dbus.send, host.listIsos());
  yield put(actions.isosLoaded({ isos }));
}

function* loadInstallState(dbus: DBus) {
  const [installState]: [Record<string, unknown>] = yield call(dbus.send, host.getInstallstate());
  yield put(actions.installStateLoaded({ installState: translate<InstallState>(installState) }));
}

function* loadWallpapers(dbus: DBus) {
  const [availableWallpapers]: string[][] = yield call(
    dbus.send,
    host.listUiPlugins(WALLPAPER_DIR),
  );
  yield put(actions.wallpapersLoaded({ availableWallpapers }));
}

function* loadEula(dbus: DBus) {
  const [eula]: [string] = yield call(dbus.send, host.getEula());
  yield put(actions.eulaLoaded({ eula }));
}

function* loadInput(dbus: DBus) {
  const [
    [tapToClick],
    [scrollingEnabled],
    [speed],
    // [properties],
    [keyboardLayouts],
    [keyboardLayout],
    [mouseSpeed],
  ]: unknown[][] = yield all([
    call(dbus.send, input.touchpadGet('tap-to-click-enable')),
    call(dbus.send, input.touchpadGet('scrolling-enable')),
    call(dbus.send, input.touchpadGet('speed')),
    // call(dbus.send, input.getAllProperties()),
    call(dbus.send, input.getKbLayouts()),
    call(dbus.send, input.getCurrentKbLayout()),
    call(dbus.send, input.getMouseSpeed()),
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

function* loadUsbDevice(dbus: DBus, deviceId: number) {
  const [name, state, assignedVm, detail]: [string, number, string, string] = yield call(
    dbus.send,
    usbDaemon.getDeviceInfo(deviceId, ''),
  );
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

function* loadUsbDevices(dbus: DBus) {
  const [deviceIds]: number[][] = yield call(dbus.send, usbDaemon.listDevices());
  yield all(deviceIds.map((deviceId: number) => loadUsbDevice(dbus, deviceId)));
}

const signalMatcher = (action: Action) => (
  dbusActions.signalReceived.match(action)
  && [
    interfaces.HOST,
    interfaces.USB_DAEMON,
    interfaces.XENMGR,
  ].includes(action.payload.signal.interface)
);

function* signalHandler(dbus: DBus, action: PayloadAction<{ signal: Signal }>) {
  const { signal } = action.payload;
  switch (signal.member) {
    case hostSignals.STATE_CHANGED: {
      const [newState] = (signal.args as string[]);
      yield put(actions.stateUpdated({ newState }));
      break;
    }
    case xenmgrSignals.CONFIG_CHANGED: {
      yield fork(loadProperties, dbus);
      break;
    }
    case usbSignals.OPTICAL_DEVICE_DETECTED: {
      yield fork(loadCdDevices, dbus);
      break;
    }
    case usbSignals.DEVICE_ADDED: {
      const [deviceId] = (signal.args as number[]);
      yield fork(loadUsbDevice, dbus, deviceId);
      break;
    }
    case usbSignals.DEVICE_INFO_CHANGED: {
      const [deviceId] = (signal.args as number[]);
      yield fork(loadUsbDevice, dbus, deviceId);
      break;
    }
    case usbSignals.DEVICES_CHANGED: {
      yield fork(loadUsbDevices, dbus);
      break;
    }
    case usbSignals.DEVICE_REJECTED: {
      const [deviceName, reason] = signal.args;
      console.log(`usb device ${deviceName} rejected: ${reason}`);
      break;
    }
  }
}

function* startWatchers(dbus: DBus) {
  yield all([
    takeEvery(signalMatcher, signalHandler, dbus),
    takeEvery(actions.loadProperties().type, loadProperties, dbus),
    takeEvery(actions.loadSound().type, loadSound, dbus),
    takeEvery(actions.loadPower().type, loadPower, dbus),
    takeEvery(actions.loadCdDevices().type, loadCdDevices, dbus),
    takeEvery(actions.loadPciDevices().type, loadPciDevices, dbus),
    takeEvery(actions.loadGpus().type, loadGpuDevices, dbus),
    takeEvery(actions.loadIsos().type, loadIsos, dbus),
    takeEvery(actions.loadInstallState().type, loadInstallState, dbus),
    takeEvery(actions.loadWallpapers().type, loadWallpapers, dbus),
    takeEvery(actions.loadInput().type, loadInput, dbus),
    takeEvery(actions.loadUsbDevices().type, loadUsbDevices, dbus),
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* initialize(dbus: DBus) {
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
    loadInput(dbus),
    loadUsbDevices(dbus),
  ]);
}
