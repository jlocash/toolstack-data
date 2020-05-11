import signals from './signals';

const initialState = {
    // properties
    update_url: '',
    update_applicable: '',
    update_state: '',
    update_description: '',
    update_download_percent: 0,
    update_download_speed: 0,
    update_fail_reason: '',

    // signals
    update_state: '',
    update_download_progress: {
        percent: 0,
        speed: 0,
    },
}

const updatemgrReducer = (state = initialState, action = {}) => {
    return state;
}

export default updatemgrReducer;
