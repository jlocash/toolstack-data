import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const WALLPAPER_DIR = 'wallpaper';

export const DEFAULT_WALLPAPERS = [
  'images/wallpaper/s1.png',
  'images/wallpaper/s2.png',
  'images/wallpaper/s3.png',
  'images/wallpaper/s4.png',
  'images/wallpaper/s5.png',
  'images/wallpaper/s6.png',
  'images/wallpaper/s7.png',
  'images/wallpaper/s8.png',
  'images/wallpaper/s9.png',
];

export const signals = {
  // host
  STATE_CHANGED: 'state_changed',
  STORAGE_SPACE_LOW: 'storage_space_low',
  LICENSE_CHANGED: 'license_changed',
};

export const methods = {
  // host
  ASSIGN_CD_DEVICE: 'assign_cd_device',
  CONFIGURE_GPU_PLACEMENT: 'configure_gpu_placement',
  EJECT_CD_DEVICE: 'eject_cd_device',
  GET_CD_DEVICE_ASSIGNMENT: 'get_cd_device_assignment',
  GET_GPU_PLACEMENT: 'get_gpu_placement',
  GET_SECONDS_FROM_EPOCH: 'get_seconds_from_epoch',
  GET_SOUND_CARD_CONTROL: 'get_sound_card_control',
  HIBERNATE: 'hibernate',
  IS_SERVICE_RUNNING: 'is_service_running',
  LIST_CAPTURE_DEVICES: 'list_capture_devices',
  LIST_CD_DEVICES: 'list_cd_devices',
  LIST_DISK_DEVICES: 'list_disk_devices',
  LIST_GPU_DEVICES: 'list_gpu_devices',
  LIST_ISOS: 'list_isos',
  LIST_PCI_DEVICES: 'list_pci_devices',
  LIST_PLAYBACK_DEVICES: 'list_playback_devices',
  LIST_SOUND_CARD_CONTROLS: 'list_sound_card_controls',
  LIST_SOUND_CARDS: 'list_sound_cards',
  LIST_UI_PLUGINS: 'list_ui_plugins',
  REBOOT: 'reboot',
  SET_LICENSE: 'set_license',
  SET_SOUND_CARD_CONTROL: 'set_sound_card_control',
  SHUTDOWN: 'shutdown',
  SLEEP: 'sleep',

  // installer
  GET_EULA: 'get_eula',
  GET_INSTALLSTATE: 'get_installstate',
  PROGRESS_INSTALLSTATE: 'progress_installstate',

  // powersettings
  GET_AC_LID_CLOSE_ACTION: 'get_ac_lid_close_action',
  GET_BATTERY_LID_CLOSE_ACTION: 'get_battery_lid_close_action',
  SET_AC_LID_CLOSE_ACTION: 'set_ac_lid_close_action',
  SET_BATTERY_LID_CLOSE_ACTION: 'set_battery_lid_close_action',
};

const path = '/host';

const host = (method, ...args) => buildMessage(
  services.XENMGR,
  path,
  interfaces.HOST,
  method,
  ...args,
);

const installer = (method, ...args) => buildMessage(
  services.XENMGR,
  path,
  interfaces.INSTALLER,
  method,
  ...args,
);

const powersettings = (method, ...args) => buildMessage(
  services.XENMGR,
  path,
  interfaces.POWERSETTINGS,
  method,
  ...args,
);

export default {
  // properties
  getProperty: (name) => buildMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.HOST, name,
  ),
  getAllProperties: () => buildMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.HOST,
  ),
  setProperty: (name, value) => buildMessage(
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
