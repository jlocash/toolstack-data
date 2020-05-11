import dbusActions from '../../actions';

const service = 'com.citrix.xenclient.xenmgr';
const iface = service;
const configIface = `${iface}.config`;
const diagIface = `${iface}.diag`;
const guestreqIface = `${iface}.guestreq`;
const unrestrictedIface = `${iface}.unrestricted`;
const freedesktopIface = 'org.freedesktop.DBus.Properties';
const path = '/';

const actions = {
    getProperty: (name) => dbusActions.sendMessage(service, path, freedesktopIface, 'Get', configIface, name),
    getAllProperties: () => dbusActions.sendMessage(service, path, freedesktopIface, 'GetAll', configIface),
    setProperty: (name, value) => dbusActions.sendMessage(service, path, freedesktopIface, 'Set', configIface, name, value),
    createVhd: (sizeMb) => dbusActions.sendMessage(service, path, iface, 'create_vhd', sizeMb),
    createVm: () => dbusActions.sendMessage(service, path, iface, 'create_vm'),
    createVmWithTemplate: (template) => dbusActions.sendMessage(service, path, iface, 'create_vm_with_template', template),
    createVmWithTemplateAndJson: (template, json) => dbusActions.sendMessage(service, path, iface, 'create_vm_with_template_and_json', template, json),
    createVmWithTemplateAndUuid: (template, uuid) => dbusActions.sendMessage(service, path, iface, 'create_vm_with_template_and_uuid', template, uuid),
    createVmWithUi: (template, name, description, imagePath) => dbusActions.sendMessage(service, path, iface, 'create_vm_with_ui', template, name, description, imagePath),
    findVmByDomid: (vmDomId) => dbusActions.sendMessage(service, path, iface, 'find_vm_by_domid', vmDomId),
    findVmByUuid: (vmUuid) => dbusActions.sendMessage(service, path, iface, 'find_vm_by_uuid', vmUuid),
    listChildServiceVmTemplates: () => dbusActions.sendMessage(service, path, iface, 'list_child_service_vm_templates'),
    listDomids: () => dbusActions.sendMessage(service, path, iface, 'list_domids'),
    listExtensionPacks: () => dbusActions.sendMessage(service, path, iface, 'list_extension_packs'),
    listTemplates: () => dbusActions.sendMessage(service, path, iface, 'list_templates'),
    listUiTemplates: () => dbusActions.sendMessage(service, path, iface, 'list_ui_templates'),
    listVms: () => dbusActions.sendMessage(service, path, iface, 'list_vms'),
    unrestrictedCreateVm: () => dbusActions.sendMessage(service, path, unrestrictedIface, 'unrestricted_create_vm'),
    unrestrictedCreateVmWithTemplateAndJson: (template, json) => dbusActions.sendMessage(service, path, unrestrictedIface, 'unrestricted_create_vm_with_template_and_json', template, json),
    unrestrictedDeleteVm: (vmUuid) => dbusActions.sendMessage(service, path, unrestrictedIface, 'unrestricted_delete_vm', vmUuid),
    createStatusReport: (screenshots, guestInfo, summary, description, reproSteps, ticket) => dbusActions.sendMessage(service, path, diagIface, 'create_status_report', screenshots, guestInfo, summary, description, reproSteps, ticket),
    gatherXcDiagnostics: (name, data) => dbusActions.sendMessage(service, path, diagIface, 'gather', name, data),
    saveVmDiagnostics: (mode) => dbusActions.sendMessage(service, path, diagIface, 'save', mode),
    statusReportScreen: (show) => dbusActions.sendMessage(service, path, diagIface, 'status_report_screen', show),
    taasAgreeTerms: (username, password, version) => dbusActions.sendMessage(service, path, diagIface, 'taas_agree_terms', username, password, version),
    taasAuthenticateCredentials: (username, password) => dbusActions.sendMessage(service, path, diagIface, 'taas_authenticate_credentials', username, password),
    taasUpload: (username, password, caseId, filename) => dbusActions.sendMessage(service, path, diagIface, 'taas_upload', username, password, caseId, filename),
    requestAttention: () => dbusActions.sendMessage(service, path, guestreqIface, 'request_attention'),
};

export default actions;
