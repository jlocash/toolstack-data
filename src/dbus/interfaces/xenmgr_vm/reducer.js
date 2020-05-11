import dbusActions from '../../actions';

const initialState = {};

const xenmgrVmReducer = (state = initialState, action = {}) => {
    const { payload } = action;
    switch (action.type) {
        case dbusActions.DBUS_SIGNAL_RECEIVED: {
            if (payload.interface === 'com.citrix.xenclient.xenmgr') {
                if (payload.member === 'vm_state_changed') {
                    const [_, vmPath, vmState, acpiState] = payload.args;
                    return {
                        ...state,
                        [vmPath]: {
                            ...state[vmPath],
                            state: vmState,
                            acpi_state: acpiState,
                        }
                    }
                }
            }
        }
    }
    return state;
}

export default xenmgrVmReducer;
