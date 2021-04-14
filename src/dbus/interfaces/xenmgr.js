import { interfaces, services } from '../constants';
import { buildMessage } from '../dbus';

export const signals = {
  // xenmgr
  VM_CONFIG_CHANGED: 'vm_config_changed',
  NOTIFY: 'notify',
  VM_STATE_CHANGED: 'vm_state_changed',
  VM_NAME_CHANGED: 'vm_name_changed',
  CONFIG_CHANGED: 'config_changed',
  LANGUAGE_CHANGED: 'language_changed',
  VM_CREATED: 'vm_created',
  VM_DELETED: 'vm_deleted',
  NETWORK_STATE_CHANGED: 'network_state_changed',
  VM_TRANSFER_CHANGED: 'vm_transfer_changed',
  CD_ASSIGNMENT_CHANGED: 'cd_assignment_changed',

  // diag
  GATHER_REQUEST: 'gather_request',

  // guestreq
  REQUESTED_ATTENTION: 'requested_attention',
};

export const methods = {
  // xenmgr
  CREATE_VHD: 'create_vhd',
  CREATE_VM: 'create_vm',
  CREATE_VM_WITH_TEMPLATE: 'create_vm_with_template',
  CREATE_VM_WITH_TEMPLATE_AND_JSON: 'create_vm_with_template_and_json',
  CREATE_VM_WITH_TEMPLATE_AND_UUID: 'create_vm_with_template_and_uuid',
  CREATE_VM_WITH_UI: 'create_vm_with_ui',
  FIND_VM_BY_DOMID: 'find_vm_by_domid',
  FIND_VM_BY_UUID: 'find_vm_by_uuid',
  LIST_CHILD_SERVICE_VM_TEMPLATES: 'list_child_service_vm_templates',
  LIST_DOMIDS: 'list_domids',
  LIST_EXTENSION_PACKS: 'list_extension_packs',
  LIST_TEMPLATES: 'list_templates',
  LIST_UI_TEMPLATES: 'list_ui_templates',
  LIST_VMS: 'list_vms',

  // unrestricted
  UNRESTRICTED_CREATE_VM: 'unrestricted_create_vm',
  UNRESTRICTED_CREATE_VM_WITH_TEMPLATE_AND_JSON: 'unrestricted_create_vm_with_template_and_json',
  UNRESTRICTED_DELETE_VM: 'unrestricted_delete_vm',

  // diag
  CREATE_STATUS_REPORT: 'create_status_report',
  GATHER: 'gather',
  SAVE: 'save',
  STATUS_REPORT_SCREEN: 'status_report_screen',
  TAAS_AGREE_TERMS: 'taas_agree_terms',
  TAAS_AUTHENTICATE_CREDENTIALS: 'taas_authenticate_credentials',
  TAAS_UPLOAD: 'taas_upload',

  // guestreq
  REQUEST_ATTENTION: 'request_attention',
};

const path = '/';

const xenmgr = (method, ...args) => buildMessage(
  services.XENMGR,
  path,
  interfaces.XENMGR,
  method,
  ...args,
);

const unrestricted = (method, ...args) => buildMessage(
  services.XENMGR,
  path,
  interfaces.XENMGR_UNRESTRICTED,
  method,
  ...args,
);

const diag = (method, ...args) => buildMessage(
  services.XENMGR,
  path,
  interfaces.DIAG,
  method,
  ...args,
);

export default {
  // properties
  getProperty: (name) => buildMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.XENMGR_CONFIG, name,
  ),
  getAllProperties: () => buildMessage(
    services.XENMGR,
    path,
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.XENMGR_CONFIG,
  ),
  setProperty: (name, value) => buildMessage(
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
  requestAttention: () => buildMessage(
    services.XENMGR,
    path,
    interfaces.GUESTREQ,
    methods.REQUEST_ATTENTION,
  ),
};
