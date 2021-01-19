import dbusActions from '../../actions';

export const SURFMAN_INITIALIZING = 'SURFMAN_INITIALIZING';
export const SURFMAN_INITIALIZED = 'SURFMAN_INITIALIZED';

const service = 'com.citrix.xenclient.surfman';
const iface = service;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
  getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', iface, name),
  getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', iface),
  setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', iface, name, value),
  createVgpu: (domId, bus, device, func) => dbusActions.sendMessage(service, path, iface, 'create_vgpu', parseInt(domId), bus, device, func),
  decreaseBrightness: () => dbusActions.sendMessage(service, path, iface, 'decrease_brightness'),
  displayImage: (filename) => dbusActions.sendMessage(service, path, iface, 'display_image', filename),
  displayText: (text) => dbusActions.sendMessage(service, path, iface, 'display_text', text),
  dpmsOff: () => dbusActions.sendMessage(service, path, iface, 'dpms_off'),
  dpmsOn: () => dbusActions.sendMessage(service, path, iface, 'dpms_on'),
  dumpAllScreens: (dir) => dbusActions.sendMessage(service, path, iface, 'dump_all_screens', dir),
  getHeadResolutions: (head) => dbusActions.sendMessage(service, path, iface, 'get_head_resolutions', parseInt(head)),
  getHeads: () => dbusActions.sendMessage(service, path, iface, 'get_heads'),
  getStrideAlignement: () => dbusActions.sendMessage(service, path, iface, 'get_stride_alignement'),
  getSurfacesCaching: () => dbusActions.sendMessage(service, path, iface, 'get_surfaces_caching'),
  getVisible: () => dbusActions.sendMessage(service, path, iface, 'get_visible'),
  hasVgpu: (domId) => dbusActions.sendMessage(service, path, iface, 'has_vgpu', parseInt(domId)),
  increaseBrightness: () => dbusActions.sendMessage(service, path, iface, 'increase_brightness'),
  notifyDeath: (domId, sState) => dbusActions.sendMessage(service, path, iface, 'notify_death', parseInt(domId), sState),
  postS3: () => dbusActions.sendMessage(service, path, iface, 'post_s3'),
  preS3: () => dbusActions.sendMessage(service, path, iface, 'pre_s3'),
  setFramebufferPages: (domId, dirtyTracking, guestAddr, pages) => dbusActions.sendMessage(service, path, iface, 'set_framebuffer_pages', parseInt(domId), dirtyTracking, guestAddr, pages),
  setFramebufferParamters: (domId, width, height, stride, format) => dbusActions.sendMessage(service, path, iface, 'set_framebuffer_paramters', parseInt(domId), width, height, stride, format),
  setHeadResolution: (head) => dbusActions.sendMessage(service, path, iface, 'set_head_resolution', parseInt(head)),
  setPvDisplay: (domId, beType) => dbusActions.sendMessage(service, path, iface, 'set_pv_display', parseInt(domId), beType),
  setVisible: (domId, timeout, force) => dbusActions.sendMessage(service, path, iface, 'set_visible', parseInt(domId), parseInt(timeout), force),
  updatePassthroughBar: (domId, bar, phys, base, size) => dbusActions.sendMessage(service, path, iface, 'update_passthrough_bar', parseInt(domId), bar, phys, base, size),
  vgpuMode: () => dbusActions.sendMessage(service, path, iface, 'vgpu_mode'),
};

export default actions;
