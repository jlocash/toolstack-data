import dbusActions from '../../actions';
import { methods } from './constants';
import { services, interfaces } from '../../constants';

export const INPUT_DAEMON_INITIALIZED = 'INPUT_DAEMON_INITIALIZED';

const service = 'com.citrix.xenclient.input';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const input = (method, ...args) => dbusActions.sendMessage(
  services.INPUT,
  path,
  interfaces.INPUT,
  method,
  ...args,
);

const actions = {
  getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
  getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
  setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
  attachVkbd: (domId) => input(methods.ATTACH_VKBD, parseInt(domId, 10)),
  authBegin: () => input(methods.AUTH_BEGIN),
  authClearStatus: () => input(methods.AUTH_CLEAR_STATUS),
  authCollectPassword: () => input(methods.AUTH_COLLECT_PASSWORD),
  authCreateHash: (fname, password) => input(methods.AUTH_CREATE_HASH, fname, password),
  authGetContext: () => input(methods.AUTH_GET_CONTEXT),
  authGetStatus: (clear) => input(methods.AUTH_GET_STATUS, clear),
  authRemoteLogin: (username, password) => input(methods.AUTH_REMOTE_LOGIN, username, password),
  authRemoteStatus: (autoStarted, status, id, username, recoveryKeyFile, ctxFlags) => input(
    methods.AUTH_REMOTE_STATUS,
    autoStarted, parseInt(status, 10), id, username, recoveryKeyFile, ctxFlags,
  ),
  authRmPlatformUser: () => input(methods.AUTH_RM_PLATFORM_USER),
  authSetContext: (user, title) => input(methods.AUTH_SET_CONTEXT, user, title),
  authSetContextFlags: (user, title, flags) => input(
    methods.AUTH_SET_CONTEXT_FLAGS,
    user, title, parseInt(flags, 10),
  ),
  authTitle: () => input(methods.AUTH_TITLE),
  detachVkbd: (domId) => input(methods.DETACH_VKBD, parseInt(domId, 10)),
  divertKeyboardFocus: (vmUuid) => input(methods.DIVERT_KEYBOARD_FOCUS, vmUuid),
  divertMouseFocus: (sX1, sY1, sX2, sY2, dX1, dY1, dX2, dY2) => input(
    methods.DIVERT_MOUSE_FOCUS,
    sX1, sY1, sX2, sY2, dX1, dY1, dX2, dY2,
  ),
  focusMode: (mode) => input(methods.FOCUS_MODE, mode),
  getAuthOnBoot: () => input(methods.GET_AUTH_ON_BOOT),
  getCurrentKbLayout: () => input(methods.GET_CURRENT_KB_LAYOUT),
  getFocusdomId: () => input(methods.GET_FOCUS_domId),
  getIdleTime: () => input(methods.GET_IDLE_TIME),
  getKbLayouts: () => input(methods.GET_KB_LAYOUTS),
  getLastInputTime: () => input(methods.GET_LAST_INPUT_TIME),
  getLidState: () => input(methods.GET_LID_STATE),
  getMouseSpeed: () => input(methods.GET_MOUSE_SPEED),
  getPlatformUser: () => input(methods.GET_PLATFORM_USER),
  getRemoteUserHash: (userId) => input(methods.GET_REMOTE_USER_HASH, userId),
  getUserKeydir: (user) => input(methods.GET_USER_KEYDIR, user),
  lock: (canSwitchOut) => input(methods.LOCK, canSwitchOut),
  lockTimeoutGet: () => input(methods.LOCK_TIMEOUT_GET),
  lockTimeoutSet: (value) => input(methods.LOCK_TIMEOUT_SET, parseInt(value, 10)),
  setAuthOnBoot: (value) => input(methods.SET_AUTH_ON_BOOT, value),
  setCurrentKbLayout: (value) => input(methods.SET_CURRENT_KB_LAYOUT, value),
  setDivertKeyboardFilter: (value) => input(methods.SET_DIVERT_KEYBOARD_FILTER, value),
  setMouseSpeed: (value) => input(methods.SET_MOUSE_SPEED, parseInt(value, 10)),
  setSlot: (domId, slot) => input(methods.SET_SLOT, parseInt(domId, 10), parseInt(slot, 10)),
  stopKeyboardDivert: () => input(methods.STOP_KEYBOARD_DIVERT),
  stopMouseDivert: () => input(methods.STOP_MOUSE_DIVERT),
  switchFocus: (domId, force) => input(methods.SWITCH_FOCUS, parseInt(domId, 10), force),
  touch: (uuid) => input(methods.TOUCH, uuid),
  touchpadGet: (prop) => input(methods.TOUCHPAD_GET, prop),
  touchpadSet: (prop, value) => input(methods.TOUCHPAD_SET, prop, value),
  updateSeamlessMouseSettings: (domUuid) => input(methods.UPDATE_SEAMLESS_MOUSE_SETTINGS, domUuid),
};

export default actions;
