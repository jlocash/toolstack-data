import { buildMessage, Message } from '../dbus';
import { services, interfaces } from '../constants';

export type HostProperties = {
  amt_capable: boolean;
  avail_mem: number;
  bios_revision: string;
  build_info: {
    branch: string;
    build: string;
    build_date_time: string;
    edition: string;
    release: string;
    tools: string;
    version: string;
  };
  capture_pcm: string;
  cpu_count: number;
  eth0_mac: string;
  eth0_model: string;
  free_mem: number;
  free_storage: number;
  is_licensed: boolean;
  laptop: boolean;
  measured_boot_enabled: boolean;
  measured_boot_successful: boolean;
  model: string;
  physical_cpu_model: string;
  physical_gpu_model: string;
  playback_pcm: string;
  safe_graphics: boolean;
  serial: string;
  state: string;
  system_amt_pt: boolean;
  total_mem: number;
  total_storage: number;
  ui_ready: boolean;
  vendor: string;
  wireless_mac: string;
  wireless_model: string;
};

export type SoundCard = {
  id: string;
  name: string;
};

export type SoundCardControl = {
  direction: string;
  name: string;
  type: string;
  value: string;
};

export type AudioDevice = {
  card: string;
  id: string;
  name: string;
};

export type GPUDevice = {
  addr: string;
  name: string;
  placement: string;
};

export type PCIDevice = {
  addr: string;
  class: string;
  name: string;
  'device-id': string;
  'vendor-id': string;
};

export type InstallState = {
  deferred_accept_eula: string;
  deferred_dom0_password: string;
  deferred_kb_layout: string;
  deferred_language: string;
};

export const WALLPAPER_DIR = '';

export const signals = {
  LICENSE_CHANGED: 'license_changed',
  STATE_CHANGED: 'state_changed',
  STORAGE_SPACE_LOW: 'storage_space_low',
};

export default {
  getProperty: (name: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.HOST, name.replace(/_/g, '-'),
  ),
  getAllProperties: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.HOST,
  ),
  setProperty: (name: string, value: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.HOST, name.replace(/_/g, '-'), value,
  ),
  assignCdDevice: (deviceId: string, sticky: boolean, vmUuid: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'assign_cd_device',
    deviceId, sticky, vmUuid,
  ),
  configureGpuPlacement: (id: string, slot: number): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'configure_gpu_placement',
    id, slot,
  ),
  ejectCdDevice: (deviceId: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'eject_cd_device',
    deviceId,
  ),
  getCdDeviceAssignment: (deviceId: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_cd_device_assignment',
    deviceId,
  ),
  getGpuPlacement: (id: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_gpu_placement',
    id,
  ),
  getSecondsFromEpoch: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_seconds_from_epoch',
  ),
  getSoundCardControl: (card: string, control: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_sound_card_control',
    card, control,
  ),
  hibernate: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'hibernate',
  ),
  isServiceRunning: (service: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'is_service_running',
    service,
  ),
  listCaptureDevices: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_capture_devices',
  ),
  listCdDevices: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_cd_devices',
  ),
  listDiskDevices: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_disk_devices',
  ),
  listGpuDevices: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_gpu_devices',
  ),
  listIsos: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_isos',
  ),
  listPciDevices: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_pci_devices',
  ),
  listPlaybackDevices: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_playback_devices',
  ),
  listSoundCardControls: (card: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_sound_card_controls',
    card,
  ),
  listSoundCards: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_sound_cards',
  ),
  listUiPlugins: (subdir: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_ui_plugins',
    subdir,
  ),
  reboot: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'reboot',
  ),
  setLicense: (expiryDate: string, deviceUuid: string, hash: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'set_license',
    expiryDate, deviceUuid, hash,
  ),
  setSoundCardControl: (card: string, control: string, value: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'set_sound_card_control',
    card, control, value,
  ),
  shutdown: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'shutdown',
  ),
  sleep: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'sleep',
  ),
  getEula: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.INSTALLER,
    'get_eula',
  ),
  getInstallstate: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.INSTALLER,
    'get_installstate',
  ),
  progressInstallstate: (action: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.INSTALLER,
    'progress_installstate',
    action,
  ),
  getAcLidCloseAction: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'get_ac_lid_close_action',
  ),
  getBatteryLidCloseAction: (): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'get_battery_lid_close_action',
  ),
  setAcLidCloseAction: (action: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'set_ac_lid_close_action',
    action,
  ),
  setBatteryLidCloseAction: (action: string): Message => buildMessage(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'set_battery_lid_close_action',
    action,
  ),
};
