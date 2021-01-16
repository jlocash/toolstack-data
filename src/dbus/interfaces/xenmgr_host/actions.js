import dbusActions from '../../actions';
import { methods } from './constants';

export const XENMGR_HOST_INITIALIZED = 'XENMGR_HOST_INITIALIZED';

const service = 'com.citrix.xenclient.xenmgr';
const iface = `${service}.host`;
const installerIface = `${service}.installer`;
const powersettingsIface = `${service}.powersettings`;
const path = '/host';
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = {
  // properties
  getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
  getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
  setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),

  // host
  assignCdDevice: (deviceId, sticky, vmUuid) => dbusActions.sendMessage(service, path, iface, methods.ASSIGN_CD_DEVICE, deviceId, sticky, vmUuid),
  configureGpuPlacement: (gpuId, slot) => dbusActions.sendMessage(service, path, iface, methods.CONFIGURE_GPU_PLACEMENT, gpuId, slot),
  ejectCdDevice: (deviceId) => dbusActions.sendMessage(service, path, iface, methods.EJECT_CD_DEVICE, deviceId),
  getCdDeviceAssignment: (deviceId, sticky, vmUuid) => dbusActions.sendMessage(service, path, iface, methods.GET_CD_DEVICE_ASSIGNMENT, deviceId, sticky, vmUuid),
  getGpuPlacement: (gpuId, slot) => dbusActions.sendMessage(service, path, iface, methods.GET_GPU_PLACEMENT, gpuId, slot),
  getSecondsFromEpoch: () => dbusActions.sendMessage(service, path, iface, methods.GET_SECONDS_FROM_EPOCH),
  getSoundCardControl: (card, control) => dbusActions.sendMessage(service, path, iface, methods.GET_SOUND_CARD_CONTROL, card, control),
  hibernate: () => dbusActions.sendMessage(service, path, iface, methods.HIBERNATE),
  isServiceRunning: (service) => dbusActions.sendMessage(service, path, iface, methods.IS_SERVICE_RUNNING, service),
  listCaptureDevices: () => dbusActions.sendMessage(service, path, iface, methods.LIST_CAPTURE_DEVICES),
  listCdDevices: () => dbusActions.sendMessage(service, path, iface, methods.LIST_CD_DEVICES),
  listDiskDevices: () => dbusActions.sendMessage(service, path, iface, methods.LIST_DISK_DEVICES),
  listGpuDevices: () => dbusActions.sendMessage(service, path, iface, methods.LIST_GPU_DEVICES),
  listIsos: () => dbusActions.sendMessage(service, path, iface, methods.LIST_ISOS),
  listPciDevices: () => dbusActions.sendMessage(service, path, iface, methods.LIST_PCI_DEVICES),
  listPlaybackDevices: () => dbusActions.sendMessage(service, path, iface, methods.LIST_PLAYBACK_DEVICES),
  listSoundCardControls: (card) => dbusActions.sendMessage(service, path, iface, methods.LIST_SOUND_CARD_CONTROLS, card),
  listSoundCards: () => dbusActions.sendMessage(service, path, iface, methods.LIST_SOUND_CARDS),
  listUiPlugins: (subdir) => dbusActions.sendMessage(service, path, iface, methods.LIST_UI_PLUGINS, subdir),
  reboot: () => dbusActions.sendMessage(service, path, iface, methods.REBOOT),
  setLicense: (expiryDate, deviceUuid, hash) => dbusActions.sendMessage(service, path, iface, methods.SET_LICENSE, expiryDate, deviceUuid, hash),
  setSoundCardControl: (card, control, value) => dbusActions.sendMessage(service, path, iface, methods.SET_SOUND_CARD_CONTROL, card, control, value),
  shutdown: () => dbusActions.sendMessage(service, path, iface, methods.SHUTDOWN),
  sleep: () => dbusActions.sendMessage(service, path, iface, methods.SLEEP),

  // installer
  getEula: () => dbusActions.sendMessage(service, path, installerIface, methods.GET_EULA),
  getInstallstate: () => dbusActions.sendMessage(service, path, installerIface, methods.GET_INSTALLSTATE),
  progressInstallstate: (action) => dbusActions.sendMessage(service, path, installerIface, methods.PROGRESS_INSTALLSTATE, action),

  // powersettings
  getAcLidCloseAction: () => dbusActions.sendMessage(service, path, powersettingsIface, methods.GET_AC_LID_CLOSE_ACTION),
  getBatteryLidCloseAction: () => dbusActions.sendMessage(service, path, powersettingsIface, methods.GET_BATTERY_LID_CLOSE_ACTION),
  setAcLidCloseAction: (action) => dbusActions.sendMessage(service, path, powersettingsIface, methods.SET_AC_LID_CLOSE_ACTION, action),
  setBatteryLidCloseAction: (action) => dbusActions.sendMessage(service, path, powersettingsIface, methods.SET_BATTERY_LID_CLOSE_ACTION, action),
};

export default actions;
