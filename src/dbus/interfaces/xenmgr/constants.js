
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
