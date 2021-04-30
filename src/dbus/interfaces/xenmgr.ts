import * as DBus from '../dbus';
import { services, interfaces } from '../constants';

export type XenmgrConfigProperties = {
  argo_firewall: boolean;
  argo_hosts_file: boolean;
  autolock_cd_drives: boolean;
  autostart: boolean;
  bypass_sha1sum_checks: boolean;
  configurable_save_changes_across_reboots: boolean;
  connect_remote_desktop_allowed: boolean;
  dom0_mem_target_mib: number;
  enable_argo_ssh: boolean;
  enable_dom0_networking: boolean;
  enable_ssh: boolean;
  guest_only_networking: boolean;
  iso_path: string;
  measure_fail_action: string;
  ota_upgrades_allowed: boolean;
  platform_crypto_key_dirs: string;
  pvm_autostart_delay: number;
  secondary_gpu_pt: boolean;
  svm_autostart_delay: number;
  use_networking_domain: boolean;
  vm_creation_allowed: boolean;
  vm_deletion_allowed: boolean;
  xc_diag_timeout: number;
};

const signals = {
  CD_ASSIGNMENT_CHANGED: 'cd_assignment_changed',
  CONFIG_CHANGED: 'config_changed',
  LANGUAGE_CHANGED: 'language_changed',
  NETWORK_STATE_CHANGED: 'network_state_changed',
  NOTIFY: 'notify',
  VM_CONFIG_CHANGED: 'vm_config_changed',
  VM_CREATED: 'vm_created',
  VM_DELETED: 'vm_deleted',
  VM_NAME_CHANGED: 'vm_name_changed',
  VM_STATE_CHANGED: 'vm_state_changed',
  VM_TRANSFER_CHANGED: 'vm_transfer_changed',
  GATHER_REQUEST: 'gather_request',
  REQUESTED_ATTENTION: 'requested_attention',
};

export default {
  signals,
  getProperty: (name: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Get',
    interfaces.XENMGR_CONFIG, name.replace(/_/g, '-'),
  ),
  getAllProperties: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'GetAll',
    interfaces.XENMGR_CONFIG,
  ),
  setProperty: (name: string, value: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.FREEDESKTOP_PROPERTIES,
    'Set',
    interfaces.XENMGR_CONFIG, name.replace(/_/g, '-'), value,
  ),
  createVhd: (template: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'create_vhd',
    template,
  ),
  createVm: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'create_vm',
  ),
  createVmWithTemplate: (template: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'create_vm_with_template',
    template,
  ),
  createVmWithTemplateAndJson: (
    template: string,
    json: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'create_vm_with_template_and_json',
    template, json,
  ),
  createVmWithTemplateAndUuid: (
    template: string,
    uuid: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'create_vm_with_template_and_uuid',
    template, uuid,
  ),
  createVmWithUi: (template: string, name: string, description: string,
    imagePath: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'create_vm_with_ui',
    template, name, description, imagePath,
  ),
  findVmByDomid: (domId: number): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'find_vm_by_domid',
    domId,
  ),
  findVmByUuid: (uuid: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'find_vm_by_uuid',
    uuid,
  ),
  listChildServiceVmTemplates: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'list_child_service_vm_templates',
  ),
  listDomids: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'list_domids',
  ),
  listExtensionPacks: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'list_extension_packs',
  ),
  listTemplates: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'list_templates',
  ),
  listUiTemplates: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'list_ui_templates',
  ),
  listVms: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'list_vms',
  ),
  createStatusReport: (screenshots: boolean, guestInfo: boolean, summary: string,
    description: string, reproSteps: string, ticket: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.DIAG,
    'create_status_report',
    screenshots, guestInfo, summary, description, reproSteps, ticket,
  ),
  gather: (name: string, data: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.DIAG,
    'gather',
    name, data,
  ),
  save: (mode: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.DIAG,
    'save',
    mode,
  ),
  statusReportScreen: (show: boolean): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.DIAG,
    'status_report_screen',
    show,
  ),
  taasAgreeTerms: (
    username: string,
    password: string,
    version: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.DIAG,
    'taas_agree_terms',
    username, password, version,
  ),
  taasAuthenticateCredentials: (
    username: string,
    password: string,
  ): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.DIAG,
    'taas_authenticate_credentials',
    username, password,
  ),
  taasUpload: (username: string, password: string, caseId: string,
    filename: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.DIAG,
    'taas_upload',
    username, password, caseId, filename,
  ),
  requestAttention: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.GUESTREQ,
    'request_attention',
  ),
  scriptDequeue: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'script_dequeue',
  ),
  scriptQueue: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR,
    'script_queue',
  ),
  unrestrictedCreateVm: (): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR_UNRESTRICTED,
    'unrestricted_create_vm',
  ),
  unrestrictedCreateVmWithTemplateAndJson: (template: string,
    json: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR_UNRESTRICTED,
    'unrestricted_create_vm_with_template_and_json',
    template, json,
  ),
  unrestrictedDeleteVm: (uuid: string): Promise<DBus.Arguments> => DBus.send(
    services.XENMGR,
    '/',
    interfaces.XENMGR_UNRESTRICTED,
    'unrestricted_delete_vm',
    uuid,
  ),
};
