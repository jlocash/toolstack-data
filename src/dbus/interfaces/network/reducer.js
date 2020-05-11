import dbusActions from '../../actions';
import { signals } from './constants';

const initialState = {};

const networkReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case dbusActions.DBUS_DATA_RECEIVED: {
            if (payload.interface === 'com.citrix.xenclient.network') {
                switch (payload.method) {
                    case methods.CONFIGURE:
                    case methods.IS_CONFIGURED:
                    case methods.JOIN:
                    case methods.LEAVE: {
                        return state;
                    }
                }
            }
            break;
        }
        case dbusActions.DBUS_SIGNAL_RECEIVED: {
            break;
        }
    }
    return state;
};

export default networkReducer;
