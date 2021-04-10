import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { methods } from './constants';

export const types = {
  XENMGR_HOST_INITIALIZED: 'XENMGR_HOST_INITIALIZED',
};

const path = '/host';

const host = (method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  path,
  interfaces.HOST,
  method,
  ...args,
);

const installer = (method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  path,
  interfaces.INSTALLER,
  method,
  ...args,
);

const powersettings = (method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  path,
  interfaces.POWERSETTINGS,
  method,
  ...args,
);

const actions = {
  // properties
  getProperty: (name) => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.HOST, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.HOST,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.HOST, name, value,
  ),

  // host
  assignCdDevice: (deviceId, sticky, vmUuid) => host(
    methods.ASSIGN_CD_DEVICE,
    deviceId, sticky, vmUuid,
  ),
  configureGpuPlacement: (gpuId, slot) => host(methods.CONFIGURE_GPU_PLACEMENT, gpuId, slot),
  ejectCdDevice: (deviceId) => host(methods.EJECT_CD_DEVICE, deviceId),
  getCdDeviceAssignment: (deviceId, sticky, vmUuid) => host(
    methods.GET_CD_DEVICE_ASSIGNMENT,
    deviceId, sticky, vmUuid,
  ),
  getGpuPlacement: (gpuId, slot) => host(methods.GET_GPU_PLACEMENT, gpuId, slot),
  getSecondsFromEpoch: () => host(methods.GET_SECONDS_FROM_EPOCH),
  getSoundCardControl: (card, control) => host(methods.GET_SOUND_CARD_CONTROL, card, control),
  hibernate: () => host(methods.HIBERNATE),
  isServiceRunning: (svc) => host(methods.IS_SERVICE_RUNNING, svc),
  listCaptureDevices: () => host(methods.LIST_CAPTURE_DEVICES),
  listCdDevices: () => host(methods.LIST_CD_DEVICES),
  listDiskDevices: () => host(methods.LIST_DISK_DEVICES),
  listGpuDevices: () => host(methods.LIST_GPU_DEVICES),
  listIsos: () => host(methods.LIST_ISOS),
  listPciDevices: () => host(methods.LIST_PCI_DEVICES),
  listPlaybackDevices: () => host(methods.LIST_PLAYBACK_DEVICES),
  listSoundCardControls: (card) => host(methods.LIST_SOUND_CARD_CONTROLS, card),
  listSoundCards: () => host(methods.LIST_SOUND_CARDS),
  listUiPlugins: (subdir) => host(methods.LIST_UI_PLUGINS, subdir),
  reboot: () => host(methods.REBOOT),
  setLicense: (expiryDate, deviceUuid, hash) => host(
    methods.SET_LICENSE,
    expiryDate, deviceUuid, hash,
  ),
  setSoundCardControl: (card, control, value) => host(
    methods.SET_SOUND_CARD_CONTROL,
    card, control, value,
  ),
  shutdown: () => host(methods.SHUTDOWN),
  sleep: () => host(methods.SLEEP),

  // installer
  getEula: () => installer(methods.GET_EULA),
  getInstallstate: () => installer(methods.GET_INSTALLSTATE),
  progressInstallstate: (action) => installer(methods.PROGRESS_INSTALLSTATE, action),

  // powersettings
  getAcLidCloseAction: () => powersettings(methods.GET_AC_LID_CLOSE_ACTION),
  getBatteryLidCloseAction: () => powersettings(methods.GET_BATTERY_LID_CLOSE_ACTION),
  setAcLidCloseAction: (action) => powersettings(methods.SET_AC_LID_CLOSE_ACTION, action),
  setBatteryLidCloseAction: (action) => powersettings(methods.SET_BATTERY_LID_CLOSE_ACTION, action),
};

export default actions;
