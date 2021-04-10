import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import methods from './constants';

export const SURFMAN_INITIALIZING = 'SURFMAN_INITIALIZING';
export const SURFMAN_INITIALIZED = 'SURFMAN_INITIALIZED';

const path = '/';

const surfman = (method, ...args) => dbusActions.sendMessage(
  services.SURFMAN,
  path,
  interfaces.SURFMAN,
  method,
  ...args,
);

const actions = {
  getProperty: (name) => dbusActions.sendMessage(
    services.SURFMAN,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.SURFMAN, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.SURFMAN,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.SURFMAN,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.SURFMAN,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.SURFMAN, name, value,
  ),
  createVgpu: (domId, bus, device, func) => surfman(
    methods.CREATE_VGPU,
    parseInt(domId, 10), bus, device, func,
  ),
  decreaseBrightness: () => surfman(methods.DECREASE_BRIGHTNESS),
  displayImage: (filename) => surfman(methods.DISPLAY_IMAGE, filename),
  displayText: (text) => surfman(methods.DISPLAY_TEXT, text),
  dpmsOff: () => surfman(methods.DPMS_OFF),
  dpmsOn: () => surfman(methods.DPMS_ON),
  dumpAllScreens: (dir) => surfman(methods.DUMP_ALL_SCREENS, dir),
  getHeadResolutions: (head) => surfman(methods.GET_HEAD_RESOLUTIONS, parseInt(head, 10)),
  getHeads: () => surfman(methods.GET_HEADS),
  getStrideAlignement: () => surfman(methods.GET_STRIDE_ALIGNEMENT),
  getSurfacesCaching: () => surfman(methods.GET_SURFACES_CACHING),
  getVisible: () => surfman(methods.GET_VISIBLE),
  hasVgpu: (domId) => surfman(methods.HAS_VGPU, parseInt(domId, 10)),
  increaseBrightness: () => surfman(methods.INCREASE_BRIGHTNESS),
  notifyDeath: (domId, sState) => surfman(methods.NOTIFY_DEATH, parseInt(domId, 10), sState),
  postS3: () => surfman(methods.POST_S3),
  preS3: () => surfman(methods.PRE_S3),
  setFramebufferPages: (domId, dirtyTracking, guestAddr, pages) => surfman(
    methods.SET_FRAMEBUFFER_PAGES,
    parseInt(domId, 10), dirtyTracking, guestAddr, pages,
  ),
  setFramebufferParamters: (domId, width, height, stride, format) => surfman(
    methods.SET_FRAMEBUFFER_PARAMTERS,
    parseInt(domId, 10), width, height, stride, format,
  ),
  setHeadResolution: (head) => surfman(methods.SET_HEAD_RESOLUTION, parseInt(head, 10)),
  setPvDisplay: (domId, beType) => surfman(methods.SET_PV_DISPLAY, parseInt(domId, 10), beType),
  setVisible: (domId, timeout, force) => surfman(
    methods.SET_VISIBLE,
    parseInt(domId, 10), parseInt(timeout, 10), force,
  ),
  updatePassthroughBar: (domId, bar, phys, base, size) => surfman(
    methods.UPDATE_PASSTHROUGH_BAR,
    parseInt(domId, 10), bar, phys, base, size,
  ),
  vgpuMode: () => surfman(methods.VGPU_MODE),
};

export default actions;
