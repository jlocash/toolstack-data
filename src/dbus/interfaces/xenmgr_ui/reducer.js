const initialState = {
    show_msg_on_vm_start: false,
    show_msg_on_vm_start_tools_warning: false,
    show_msg_on_no_disk: false,
    show_mboot_warning: false,
    show_tools_warning: false,
    wallpaper: '',
    pointer_trail_timeout: 0,
    view_type: '',
    modify_settings: false,
    modify_services: false,
    modify_advanced_vm_settings: false,
    modify_usb_settings: false,
    switcher_enabled: false,
    switcher_self_switch_enabled: false,
    switcher_keyboard_follows_mouse: false,
    switcher_resistance: 0,
    switcher_status_report_enabled: false,
    idle_time_threshold: 0,
    language: '',
    supported_languages: [],
    drm_graphics: false,
}

const xenmgrUiReducer = (state = initialState, action = {}) => {
    return state;
}

export default xenmgrUiReducer;
