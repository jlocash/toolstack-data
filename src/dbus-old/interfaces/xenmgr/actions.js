import dbusActions from '../../actions';
import { methods } from './constants';

export const XENMGR_INITIALIZED = 'XENMGR_INITIALIZED';

const service = 'com.citrix.xenclient.xenmgr';
const iface = service;
const configIface = `${iface}.config`;
const diagIface = `${iface}.diag`;
const guestreqIface = `${iface}.guestreq`;
const unrestrictedIface = `${iface}.unrestricted`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
  // properties
  getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', configIface, name),
  getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', configIface),
  setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', configIface, name, value),

  // xenmgr
  createVhd: (sizeMb) => dbusActions.sendMessage(service, path, iface, methods.CREATE_VHD, sizeMb),
  createVm: () => dbusActions.sendMessage(service, path, iface, methods.CREATE_VM),
  createVmWithTemplate: (template) => dbusActions.sendMessage(service, path, iface, methods.CREATE_VM_WITH_TEMPLATE, template),
  createVmWithTemplateAndJson: (template, json) => dbusActions.sendMessage(service, path, iface, methods.CREATE_VM_WITH_TEMPLATE_AND_JSON, template, json),
  createVmWithTemplateAndUuid: (template, uuid) => dbusActions.sendMessage(service, path, iface, methods.CREATE_VM_WITH_TEMPLATE_AND_UUID, template, uuid),
  createVmWithUi: (template, name, description, imagePath) => dbusActions.sendMessage(service, path, iface, methods.CREATE_VM_WITH_UI, template, name, description, imagePath),
  findVmByDomid: (vmDomId) => dbusActions.sendMessage(service, path, iface, methods.FIND_VM_BY_DOMID, vmDomId),
  findVmByUuid: (vmUuid) => dbusActions.sendMessage(service, path, iface, methods.FIND_VM_BY_UUID, vmUuid),
  listChildServiceVmTemplates: () => dbusActions.sendMessage(service, path, iface, methods.LIST_CHILD_SERVICE_VM_TEMPLATES),
  listDomids: () => dbusActions.sendMessage(service, path, iface, methods.LIST_DOMIDS),
  listExtensionPacks: () => dbusActions.sendMessage(service, path, iface, methods.LIST_EXTENSION_PACKS),
  listTemplates: () => dbusActions.sendMessage(service, path, iface, methods.LIST_TEMPLATES),
  listUiTemplates: () => dbusActions.sendMessage(service, path, iface, methods.LIST_UI_TEMPLATES),
  listVms: () => dbusActions.sendMessage(service, path, iface, methods.LIST_VMS),

  // unrestricted
  unrestrictedCreateVm: () => dbusActions.sendMessage(service, path, unrestrictedIface, methods.UNRESTRICTED_CREATE_VM),
  unrestrictedCreateVmWithTemplateAndJson: (template, json) => dbusActions.sendMessage(service, path, unrestrictedIface, methods.UNRESTRICTED_CREATE_VM_WITH_TEMPLATE_AND_JSON, template, json),
  unrestrictedDeleteVm: (vmUuid) => dbusActions.sendMessage(service, path, unrestrictedIface, methods.UNRESTRICTED_DELETE_VM, vmUuid),

  // diag
  createStatusReport: (screenshots, guestInfo, summary, description, reproSteps, ticket) => dbusActions.sendMessage(service, path, diagIface, methods.CREATE_STATUS_REPORT, screenshots, guestInfo, summary, description, reproSteps, ticket),
  gatherXcDiagnostics: (name, data) => dbusActions.sendMessage(service, path, diagIface, methods.GATHER, name, data),
  saveVmDiagnostics: (mode) => dbusActions.sendMessage(service, path, diagIface, methods.SAVE, mode),
  statusReportScreen: (show) => dbusActions.sendMessage(service, path, diagIface, methods.STATUS_REPORT_SCREEN, show),
  taasAgreeTerms: (username, password, version) => dbusActions.sendMessage(service, path, diagIface, methods.TAAS_AGREE_TERMS, username, password, version),
  taasAuthenticateCredentials: (username, password) => dbusActions.sendMessage(service, path, diagIface, methods.TAAS_AUTHENTICATE_CREDENTIALS, username, password),
  taasUpload: (username, password, caseId, filename) => dbusActions.sendMessage(service, path, diagIface, methods.TAAS_UPLOAD, username, password, caseId, filename),

  // guestreq
  requestAttention: () => dbusActions.sendMessage(service, path, guestreqIface, methods.REQUEST_ATTENTION),
};

export default actions;
