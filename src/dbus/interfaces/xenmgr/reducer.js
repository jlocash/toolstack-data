const initialState = {
    iso_path: '',
    autostart: false,
    pvm_autostart_delay: 0,
    svm_autostart_delay: 0,
    argo_hosts_file: false,
    use_networking_domain: false,
    bypass_sha1sum_checks: false,
    xc_diag_timeout: 0,
    platform_crypto_key_dirs: '',
    guest_only_networking: false,
    vm_creation_allowed: false,
    vm_deletion_allowed: false,
    ota_upgrades_allowed: false,
    connect_remote_desktop_allowed: false,
    measure_fail_action: '',
    argo_firewall: false,
    secondary_gpu_pt: false,
    configurable_save_changes_across_reboots: false,
    enable_ssh: false,
    enable_argo_ssh: false,
    enable_dom0_networking: false,
    dom0_mem_target_mib: 0,
    autolock_cd_drives: false,
}

const xenmgrReducer = (state = initialState, action = {}) => {
    return state;
}

export default xenmgrReducer;
