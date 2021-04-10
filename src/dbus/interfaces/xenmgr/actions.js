import dbusActions from '../../actions';
import { interfaces, services } from '../../constants';
import { methods } from './constants';

export const types = {
  XENMGR_INITIALIZED: 'XENMGR_INITIALIZED',
};

const path = '/';

const xenmgr = (method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  path,
  interfaces.XENMGR,
  method,
  ...args,
);

const unrestricted = (method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  path,
  interfaces.XENMGR_UNRESTRICTED,
  method,
  ...args,
);

const diag = (method, ...args) => dbusActions.sendMessage(
  services.XENMGR,
  path,
  interfaces.DIAG,
  method,
  ...args,
);

const actions = {
  // properties
  getProperty: (name) => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.XENMGR_CONFIG, name,
  ),
  getAllProperties: () => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.XENMGR_CONFIG,
  ),
  setProperty: (name, value) => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.XENMGR_CONFIG, name, value,
  ),

  // xenmgr
  createVhd: (sizeMb) => xenmgr(methods.CREATE_VHD, sizeMb),
  createVm: () => xenmgr(methods.CREATE_VM),
  createVmWithTemplate: (template) => xenmgr(methods.CREATE_VM_WITH_TEMPLATE, template),
  createVmWithTemplateAndJson: (template, json) => xenmgr(
    methods.CREATE_VM_WITH_TEMPLATE_AND_JSON,
    template, json,
  ),
  createVmWithTemplateAndUuid: (template, uuid) => xenmgr(
    methods.CREATE_VM_WITH_TEMPLATE_AND_UUID,
    template, uuid,
  ),
  createVmWithUi: (template, name, description, imagePath) => xenmgr(
    methods.CREATE_VM_WITH_UI,
    template, name, description, imagePath,
  ),
  findVmByDomid: (vmDomId) => xenmgr(methods.FIND_VM_BY_DOMID, vmDomId),
  findVmByUuid: (vmUuid) => xenmgr(methods.FIND_VM_BY_UUID, vmUuid),
  listChildServiceVmTemplates: () => xenmgr(methods.LIST_CHILD_SERVICE_VM_TEMPLATES),
  listDomids: () => xenmgr(methods.LIST_DOMIDS),
  listExtensionPacks: () => xenmgr(methods.LIST_EXTENSION_PACKS),
  listTemplates: () => xenmgr(methods.LIST_TEMPLATES),
  listUiTemplates: () => xenmgr(methods.LIST_UI_TEMPLATES),
  listVms: () => xenmgr(methods.LIST_VMS),

  // unrestricted
  unrestrictedCreateVm: () => unrestricted(methods.UNRESTRICTED_CREATE_VM),
  unrestrictedCreateVmWithTemplateAndJson: (template, json) => unrestricted(
    methods.UNRESTRICTED_CREATE_VM_WITH_TEMPLATE_AND_JSON,
    template, json,
  ),
  unrestrictedDeleteVm: (vmUuid) => unrestricted(methods.UNRESTRICTED_DELETE_VM, vmUuid),

  // diag
  createStatusReport: (screenshots, guestInfo, summary, description, reproSteps, ticket) => diag(
    methods.CREATE_STATUS_REPORT,
    screenshots, guestInfo, summary, description, reproSteps, ticket,
  ),
  gatherXcDiagnostics: (name, data) => diag(methods.GATHER, name, data),
  saveVmDiagnostics: (mode) => diag(methods.SAVE, mode),
  statusReportScreen: (show) => diag(methods.STATUS_REPORT_SCREEN, show),
  taasAgreeTerms: (username, password, version) => diag(
    methods.TAAS_AGREE_TERMS,
    username, password, version,
  ),
  taasAuthenticateCredentials: (username, password) => diag(
    methods.TAAS_AUTHENTICATE_CREDENTIALS,
    username, password,
  ),
  taasUpload: (username, password, caseId, filename) => diag(
    methods.TAAS_UPLOAD,
    username, password, caseId, filename,
  ),

  // guestreq
  requestAttention: () => dbusActions.sendMessage(
    services.XENMGR,
    path,
    interfaces.GUESTREQ,
    methods.REQUEST_ATTENTION,
  ),
};

export default actions;
