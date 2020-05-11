
const initialState = {
    state: 'idle',
    total_mem: 0,
    free_mem: 0,
    avail_mem: 0,
    total_storage: 0,
    free_storage: 0,
    system_amt_pt: false,
    cpu_count: 0,
    laptop: false,
    model: '',
    vendor: '',
    serial: '',
    bios_revision: '',
    amt_capable: false,
    eth0_mac: '',
    eth0_model: '',
    wireless_mac: '',
    wireless_model: '',
    physical_cpu_model: '',
    physical_gpu_model: '',
    safe_graphics: false,
    measured_boot_enabled: true,
    measured_boot_successful: false,
    is_licensed: true,
    build_info: '',
    ui_ready: false,
    playback_pcm: '',
    capture_pcm: '',
}

const xenmgrHostReducer = (state = initialState, action) => {
    return state;
}

export default xenmgrHostReducer;
