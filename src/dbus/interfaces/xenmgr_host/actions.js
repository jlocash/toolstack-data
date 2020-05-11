import dbusActions from '../../actions';


const service = 'com.citrix.xenclient.xenmgr';
const iface = `${service}.host`;
const installerIface = `${service}.installer`;
const powersettingsIface = `${service}.powersettings`;
const path = '/host';
const freedesktopIface = 'org.freedesktop.DBus.Properties';

const actions = {
    getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
    assignCdDevice: (deviceId, sticky, vmUuid) => dbusActions.sendMessage(service, path, iface, 'assign_cd_device', deviceId, sticky, vmUuid),
    configureGpuPlacement: (gpuId, slot) => dbusActions.sendMessage(service, path, iface, 'configure_gpu_placement', gpuId, slot),
    ejectCdDevice: (deviceId) => dbusActions.sendMessage(service, path, iface, 'eject_cd_device', deviceId),
    getCdDeviceAssignment: (deviceId, sticky, vmUuid) => dbusActions.sendMessage(service, path, iface, 'get_cd_device_assignment', deviceId, sticky, vmUuid),
    getGpuPlacement: (gpuId, slot) => dbusActions.sendMessage(service, path, iface, 'get_gpu_placement', gpuId, slot),
    getSecondsFromEpoch: () => dbusActions.sendMessage(service, path, iface, 'get_seconds_from_epoch'),
    getSoundCardControl: (card, control) => dbusActions.sendMessage(service, path, iface, 'get_sound_card_control', card, control),
    hibernate: () => dbusActions.sendMessage(service, path, iface, 'hibernate'),
    isServiceRunning: (service) => dbusActions.sendMessage(service, path, iface, 'is_service_running', service),
    listCaptureDevices: () => dbusActions.sendMessage(service, path, iface, 'list_capture_devices'),
    listCdDevices: () => dbusActions.sendMessage(service, path, iface, 'list_cd_devices'),
    listDiskDevices: () => dbusActions.sendMessage(service, path, iface, 'list_disk_devices'),
    listGpuDevices: () => dbusActions.sendMessage(service, path, iface, 'list_gpu_devices'),
    listIsos: () => dbusActions.sendMessage(service, path, iface, 'list_isos'),
    listPciDevices: () => dbusActions.sendMessage(service, path, iface, 'list_pci_devices'),
    listPlaybackDevices: () => dbusActions.sendMessage(service, path, iface, 'list_playback_devices'),
    listSoundCardControls: (card) => dbusActions.sendMessage(service, path, iface, 'list_sound_card_controls', card),
    listSoundCards: () => dbusActions.sendMessage(service, path, iface, 'list_sound_cards'),
    listUiPlugins: (subdir) => dbusActions.sendMessage(service, path, iface, 'list_ui_plugins', subdir),
    reboot: () => dbusActions.sendMessage(service, path, iface, 'reboot'),
    setLicense: (expiryDate, deviceUuid, hash) => dbusActions.sendMessage(service, path, iface, 'set_license', expiryDate, deviceUuid, hash),
    setSoundCardControl: (card, control, value) => dbusActions.sendMessage(service, path, iface, 'set_sound_card_control', card, control, value),
    shutdown: () => dbusActions.sendMessage(service, path, iface, 'shutdown'),
    sleep: () => dbusActions.sendMessage(service, path, iface, 'sleep'),
    getEula: () => dbusActions.sendMessage(service, path, installerIface, 'get_eula'),
    getInstallstate: () => dbusActions.sendMessage(service, path, installerIface, 'get_installstate'),
    progressInstallstate: (action) => dbusActions.sendMessage(service, path, installerIface, 'progress_installstate', action),
    getAcLidCloseAction: () => dbusActions.sendMessage(service, path, powersettingsIface, 'get_ac_lid_close_action'),
    getBatteryLidCloseAction: () => dbusActions.sendMessage(service, path, powersettingsIface, 'get_battery_lid_close_action'),
    setAcLidCloseAction: (action) => dbusActions.sendMessage(service, path, powersettingsIface, 'set_ac_lid_close_action', action),
    setBatteryLidCloseAction: (action) => dbusActions.sendMessage(service, path, powersettingsIface, 'set_battery_lid_close_action', action),
};

export default actions;
