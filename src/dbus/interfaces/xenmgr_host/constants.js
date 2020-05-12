
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
