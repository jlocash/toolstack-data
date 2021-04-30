import * as DBus from '../dbus';
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

const signals = {
  LICENSE_CHANGED: 'license_changed',
  STATE_CHANGED: 'state_changed',
  STORAGE_SPACE_LOW: 'storage_space_low',
};

export default {
  signals,
  getProperty: (name: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.HOST, name.replace(/_/g, '-'),
  ),
  getAllProperties: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.HOST,
  ),
  setProperty: (name: string, value: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.HOST, name.replace(/_/g, '-'), value,
  ),
  assignCdDevice: (
    deviceId: string,
    sticky: boolean,
    vmUuid: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'assign_cd_device',
    deviceId, sticky, vmUuid,
  ),
  configureGpuPlacement: (id: string, slot: number): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'configure_gpu_placement',
    id, slot,
  ),
  ejectCdDevice: (deviceId: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'eject_cd_device',
    deviceId,
  ),
  getCdDeviceAssignment: (deviceId: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_cd_device_assignment',
    deviceId,
  ),
  getGpuPlacement: (id: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_gpu_placement',
    id,
  ),
  getSecondsFromEpoch: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_seconds_from_epoch',
  ),
  getSoundCardControl: (card: string, control: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'get_sound_card_control',
    card, control,
  ),
  hibernate: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'hibernate',
  ),
  isServiceRunning: (service: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'is_service_running',
    service,
  ),
  listCaptureDevices: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_capture_devices',
  ),
  listCdDevices: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_cd_devices',
  ),
  listDiskDevices: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_disk_devices',
  ),
  listGpuDevices: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_gpu_devices',
  ),
  listIsos: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_isos',
  ),
  listPciDevices: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_pci_devices',
  ),
  listPlaybackDevices: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_playback_devices',
  ),
  listSoundCardControls: (card: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_sound_card_controls',
    card,
  ),
  listSoundCards: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_sound_cards',
  ),
  listUiPlugins: (subdir: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'list_ui_plugins',
    subdir,
  ),
  reboot: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'reboot',
  ),
  setLicense: (
    expiryDate: string,
    deviceUuid: string,
    hash: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'set_license',
    expiryDate, deviceUuid, hash,
  ),
  setSoundCardControl: (
    card: string,
    control: string,
    value: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'set_sound_card_control',
    card, control, value,
  ),
  shutdown: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'shutdown',
  ),
  sleep: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.HOST,
    'sleep',
  ),
  getEula: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.INSTALLER,
    'get_eula',
  ),
  getInstallstate: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.INSTALLER,
    'get_installstate',
  ),
  progressInstallstate: (action: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.INSTALLER,
    'progress_installstate',
    action,
  ),
  getAcLidCloseAction: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'get_ac_lid_close_action',
  ),
  getBatteryLidCloseAction: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'get_battery_lid_close_action',
  ),
  setAcLidCloseAction: (action: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'set_ac_lid_close_action',
    action,
  ),
  setBatteryLidCloseAction: (action: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/host',
    interfaces.POWERSETTINGS,
    'set_battery_lid_close_action',
    action,
  ),
};
