import dbusActions from '../../actions';
import { methods } from './constants';

const service = 'com.citrix.xenclient.input';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
    getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
    getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
    setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
    attachVkbd: (domId) => dbusActions.sendMessage(service, path, iface, methods.ATTACH_VKBD, domId),
    authBegin: () => dbusActions.sendMessage(service, path, iface, methods.AUTH_BEGIN),
    authClearStatus: () => dbusActions.sendMessage(service, path, iface, methods.AUTH_CLEAR_STATUS),
    authCollectPassword: () => dbusActions.sendMessage(service, path, iface, methods.AUTH_COLLECT_PASSWORD),
    authCreateHash: (fname, password) => dbusActions.sendMessage(service, path, iface, methods.AUTH_CREATE_HASH, fname, password),
    authGetContext: () => dbusActions.sendMessage(service, path, iface, methods.AUTH_GET_CONTEXT),
    authGetStatus: (clear) => dbusActions.sendMessage(service, path, iface, methods.AUTH_GET_STATUS, clear),
    authRemoteLogin: (username, password) => dbusActions.sendMessage(service, path, iface, methods.AUTH_REMOTE_LOGIN, username, password),
    authRemoteStatus: (autoStarted, status, id, username, recoveryKeyFile, ctxFlags) => dbusActions.sendMessage(service, path, iface, methods.AUTH_REMOTE_STATUS, autoStarted, status, id, username, recoveryKeyFile, ctxFlags),
    authRmPlatformUser: () => dbusActions.sendMessage(service, path, iface, methods.AUTH_RM_PLATFORM_USER),
    authSetContext: (user, title) => dbusActions.sendMessage(service, path, iface, methods.AUTH_SET_CONTEXT, user, title),
    authSetContextFlags: (user, title, flags) => dbusActions.sendMessage(service, path, iface, methods.AUTH_SET_CONTEXT_FLAGS, user, title, flags),
    authTitle: () => dbusActions.sendMessage(service, path, iface, methods.AUTH_TITLE),
    detachVkbd: (domId) => dbusActions.sendMessage(service, path, iface, methods.DETACH_VKBD, domId),
    divertKeyboardFocus: (vmUuid) => dbusActions.sendMessage(service, path, iface, methods.DIVERT_KEYBOARD_FOCUS, vmUuid),
    divertMouseFocus: (sframeX1, sframeY1, sframeX2, sframeY2, dframeX1, dframeY1, dframeX2, dframeY2) => dbusActions.sendMessage(service, path, iface, methods.DIVERT_MOUSE_FOCUS, sframeX1, sframeY1, sframeX2, sframeY2, dframeX1, dframeY1, dframeX2, dframeY2),
    focusMode: (mode) => dbusActions.sendMessage(service, path, iface, methods.FOCUS_MODE, mode),
    getAuthOnBoot: () => dbusActions.sendMessage(service, path, iface, methods.GET_AUTH_ON_BOOT),
    getCurrentKbLayout: () => dbusActions.sendMessage(service, path, iface, methods.GET_CURRENT_KB_LAYOUT),
    getFocusDomid: () => dbusActions.sendMessage(service, path, iface, methods.GET_FOCUS_DOMID),
    getIdleTime: () => dbusActions.sendMessage(service, path, iface, methods.GET_IDLE_TIME),
    getKbLayouts: () => dbusActions.sendMessage(service, path, iface, methods.GET_KB_LAYOUTS),
    getLastInputTime: () => dbusActions.sendMessage(service, path, iface, methods.GET_LAST_INPUT_TIME),
    getLidState: () => dbusActions.sendMessage(service, path, iface, methods.GET_LID_STATE),
    getMouseSpeed: () => dbusActions.sendMessage(service, path, iface, methods.GET_MOUSE_SPEED),
    getPlatformUser: () => dbusActions.sendMessage(service, path, iface, methods.GET_PLATFORM_USER),
    getRemoteUserHash: (userId) => dbusActions.sendMessage(service, path, iface, methods.GET_REMOTE_USER_HASH, userId),
    getUserKeydir: (user) => dbusActions.sendMessage(service, path, iface, methods.GET_USER_KEYDIR, user),
    lock: (canSwitchOut) => dbusActions.sendMessage(service, path, iface, methods.LOCK, canSwitchOut),
    lockTimeoutGet: () => dbusActions.sendMessage(service, path, iface, methods.LOCK_TIMEOUT_GET),
    lockTimeoutSet: (value) => dbusActions.sendMessage(service, path, iface, methods.LOCK_TIMEOUT_SET, value),
    setAuthOnBoot: (value) => dbusActions.sendMessage(service, path, iface, methods.SET_AUTH_ON_BOOT, value),
    setCurrentKbLayout: (value) => dbusActions.sendMessage(service, path, iface, methods.SET_CURRENT_KB_LAYOUT, value),
    setDivertKeyboardFilter: (value) => dbusActions.sendMessage(service, path, iface, methods.SET_DIVERT_KEYBOARD_FILTER, value),
    setMouseSpeed: (value) => dbusActions.sendMessage(service, path, iface, methods.SET_MOUSE_SPEED, value),
    setSlot: (domid, value) => dbusActions.sendMessage(service, path, iface, methods.SET_SLOT, domid, value),
    stopKeyboardDivert: () => dbusActions.sendMessage(service, path, iface, methods.STOP_KEYBOARD_DIVERT),
    stopMouseDivert: () => dbusActions.sendMessage(service, path, iface, methods.STOP_MOUSE_DIVERT),
    switchFocus: (domid, force) => dbusActions.sendMessage(service, path, iface, methods.SWITCH_FOCUS, domid, force),
    touch: (uuid) => dbusActions.sendMessage(service, path, iface, methods.TOUCH, uuid),
    touchpadGet: (prop) => dbusActions.sendMessage(service, path, iface, methods.TOUCHPAD_GET, prop),
    touchpadSet: (prop, value) => dbusActions.sendMessage(service, path, iface, methods.TOUCHPAD_SET, prop, value),
    updateSeamlessMouseSettings: (domUuid) => dbusActions.sendMessage(service, path, iface, methods.UPDATE_SEAMLESS_MOUSE_SETTINGS, domUuid),
};

export default actions;
