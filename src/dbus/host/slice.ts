/* eslint-disable no-param-reassign */

import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import type { XenmgrConfigProperties } from '../interfaces/xenmgr';
import type {
  HostProperties, SoundCard, GPUDevice, InstallState, AudioDevice, PCIDevice, SoundCardControl,
} from '../interfaces/xenmgr_host';
import type { UIProperties } from '../interfaces/xenmgr_ui';

const DEFAULT_WALLPAPERS = [
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

type USBDevice = {
  id: number;
  name: string;
  state: number;
  assignedVm: string;
  detail: string;
};

type Properties = HostProperties & UIProperties & XenmgrConfigProperties;

type FullSoundCard = SoundCard & {
  controls: SoundCardControl[];
};

type Touchpad = {
  tapToClick: boolean;
  scrollingEnabled: boolean;
  speed: number;
};

type HostState = {
  properties: Properties;
  cdDevices: unknown[];
  gpuDevices: GPUDevice[];
  pciDevices: PCIDevice[];
  isos: string[];
  usbDevices: { [id: number]: USBDevice };
  soundCaptureDevices: AudioDevice[];
  soundPlaybackDevices: AudioDevice[];
  soundCards: { [id: string]: FullSoundCard };
  keyboardLayout: string;
  keyboardLayouts: string[];
  mouseSpeed: number;
  touchpad: Touchpad;
  secondsFromEpoch: number;
  availableWallpapers: string[];
  eula: string;
  installState: InstallState;
  acLidCloseAction: string;
  batteryLidCloseAction: string;
};

const initialState: HostState = {
  properties: {
    // host
    amt_capable: false,
    avail_mem: 0,
    bios_revision: '',
    build_info: {
      branch: '',
      build: '',
      build_date_time: '',
      edition: '',
      release: '',
      tools: '',
      version: '',
    },
    capture_pcm: '',
    cpu_count: 0,
    eth0_mac: '',
    eth0_model: '',
    free_mem: 0,
    free_storage: 0,
    is_licensed: false,
    laptop: false,
    measured_boot_enabled: false,
    measured_boot_successful: false,
    model: '',
    physical_cpu_model: '',
    physical_gpu_model: '',
    playback_pcm: '',
    safe_graphics: false,
    serial: '',
    state: '',
    system_amt_pt: false,
    total_mem: 0,
    total_storage: 0,
    ui_ready: false,
    vendor: '',
    wireless_mac: '',
    wireless_model: '',

    // ui
    drm_graphics: false,
    idle_time_threshold: 0,
    language: '',
    modify_advanced_vm_settings: false,
    modify_services: false,
    modify_settings: false,
    modify_usb_settings: false,
    pointer_trail_timeout: 0,
    show_mboot_warning: false,
    show_msg_on_no_disk: false,
    show_msg_on_vm_start: false,
    show_msg_on_vm_start_tools_warning: false,
    show_tools_warning: false,
    supported_languages: [],
    switcher_enabled: false,
    switcher_keyboard_follows_mouse: false,
    switcher_resistance: 0,
    switcher_self_switch_enabled: false,
    switcher_status_report_enabled: false,
    view_type: '',
    wallpaper: 'images/wallpaper/s9.png',

    // xenmgr
    argo_firewall: false,
    argo_hosts_file: false,
    autolock_cd_drives: false,
    autostart: false,
    bypass_sha1sum_checks: false,
    configurable_save_changes_across_reboots: false,
    connect_remote_desktop_allowed: false,
    dom0_mem_target_mib: 0,
    enable_argo_ssh: false,
    enable_dom0_networking: false,
    enable_ssh: false,
    guest_only_networking: false,
    iso_path: '',
    measure_fail_action: '',
    ota_upgrades_allowed: false,
    platform_crypto_key_dirs: '',
    pvm_autostart_delay: 0,
    secondary_gpu_pt: false,
    svm_autostart_delay: 0,
    use_networking_domain: false,
    vm_creation_allowed: false,
    vm_deletion_allowed: false,
    xc_diag_timeout: 0,
  },
  cdDevices: [],
  gpuDevices: [],
  pciDevices: [],
  isos: [],
  usbDevices: {},
  soundCaptureDevices: [],
  soundPlaybackDevices: [],
  soundCards: {},
  keyboardLayout: '',
  keyboardLayouts: [],
  mouseSpeed: 0,
  touchpad: {
    tapToClick: false,
    scrollingEnabled: false,
    speed: 0,
  },
  secondsFromEpoch: 0,
  availableWallpapers: [],
  eula: '',
  installState: {
    deferred_accept_eula: '',
    deferred_dom0_password: '',
    deferred_kb_layout: '',
    deferred_language: '',
  },
  acLidCloseAction: '',
  batteryLidCloseAction: '',
};

export const slice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    propertiesLoaded: (state, action: PayloadAction<{ properties: Properties }>) => {
      const { properties } = action.payload;
      state.properties = properties;
    },
    powerLoaded: (state, action: PayloadAction<{
      acLidCloseAction: string,
      batteryLidCloseAction: string,
    }>) => {
      const { acLidCloseAction, batteryLidCloseAction } = action.payload;
      state.acLidCloseAction = acLidCloseAction;
      state.batteryLidCloseAction = batteryLidCloseAction;
    },
    soundCaptureDevicesLoaded: (state, action: PayloadAction<{
      soundCaptureDevices: AudioDevice[]
    }>) => {
      const { soundCaptureDevices } = action.payload;
      state.soundCaptureDevices = soundCaptureDevices;
    },
    soundPlaybackDevicesLoaded: (state, action: PayloadAction<{
      soundPlaybackDevices: AudioDevice[]
    }>) => {
      const { soundPlaybackDevices } = action.payload;
      state.soundPlaybackDevices = soundPlaybackDevices;
    },
    soundCardLoaded: (state, action: PayloadAction<{ soundCard: FullSoundCard }>) => {
      const { soundCard } = action.payload;
      state.soundCards[soundCard.id] = soundCard;
    },
    cdDevicesLoaded: (state, action: PayloadAction<{ cdDevices: unknown[] }>) => {
      const { cdDevices } = action.payload;
      state.cdDevices = cdDevices;
    },
    pciDevicesLoaded: (state, action: PayloadAction<{ pciDevices: PCIDevice[] }>) => {
      const { pciDevices } = action.payload;
      state.pciDevices = pciDevices;
    },
    gpusLoaded: (state, action: PayloadAction<{ gpuDevices: GPUDevice[] }>) => {
      const { gpuDevices } = action.payload;
      state.gpuDevices = gpuDevices;
    },
    isosLoaded: (state, action: PayloadAction<{ isos: string[] }>) => {
      const { isos } = action.payload;
      state.isos = isos;
    },
    installStateLoaded: (state, action: PayloadAction<{ installState: InstallState }>) => {
      const { installState } = action.payload;
      state.installState = installState;
    },
    wallpapersLoaded: (state, action: PayloadAction<{ availableWallpapers: string[] }>) => {
      const { availableWallpapers } = action.payload;
      state.availableWallpapers = [
        ...DEFAULT_WALLPAPERS,
        ...availableWallpapers,
      ];
    },
    eulaLoaded: (state, action: PayloadAction<{ eula: string }>) => {
      const { eula } = action.payload;
      state.eula = eula;
    },
    inputLoaded: (state, action: PayloadAction<{
      keyboardLayout: string,
      keyboardLayouts: string[],
      touchpad: Touchpad,
      mouseSpeed: number,
    }>) => {
      const {
        keyboardLayout, keyboardLayouts, touchpad, mouseSpeed,
      } = action.payload;
      state.keyboardLayout = keyboardLayout;
      state.keyboardLayouts = keyboardLayouts;
      state.touchpad = touchpad;
      state.mouseSpeed = mouseSpeed;
    },
    usbDeviceLoaded: (state, action: PayloadAction<{ device: USBDevice }>) => {
      const { device } = action.payload;
      state.usbDevices[device.id] = device;
    },
    stateUpdated: (state, action: PayloadAction<{ newState: string }>) => {
      const { newState } = action.payload;
      state.properties.state = newState;
    },
  },
});

export const actions = {
  ...slice.actions,
  loadProperties: createAction('host/loadProperties'),
  loadSound: createAction('host/loadSound'),
  loadPower: createAction('host/loadPower'),
  loadCdDevices: createAction('host/loadCdDevices'),
  loadPciDevices: createAction('host/loadPciDevices'),
  loadGpus: createAction('host/loadGpus'),
  loadIsos: createAction('host/loadIsos'),
  loadInstallState: createAction('host/loadInstallState'),
  loadWallpapers: createAction('host/loadWallpapers'),
  loadInput: createAction('host/loadInput'),
  loadUsbDevices: createAction('host/loadUsbDevices'),
};

export default slice.reducer;
