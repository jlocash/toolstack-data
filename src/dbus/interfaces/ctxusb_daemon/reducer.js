import dbusActions from '../../actions';
import { signals, methods } from './constants';

const initialState = {

};

const usbReducer = (state = initialState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case dbusActions.DBUS_DATA_RECEIVED: {
            if (payload.destination === 'com.citrix.xenclient.usbdaemon') {
                switch (payload.method) {
                    case methods.GET_POLICY_DOMUUID:
                    case methods.LIST_DEVICES:
                    case methods.GET_DEVICE_INFO:
                    case methods.STATE:
                        return state;
                }
            }
            break;
        }
        case dbusActions.DBUS_SIGNAL_RECEIVED: {
            if (payload.interface === 'com.citrix.xenclient.usbdaemon') {
                switch (payload.member) {
                    case signals.DEVICE_ADDED:
                    case signals.DEVICE_REJECTED:
                    case signals.OPTICAL_DEVICE_DETECTED:
                    case signals.DEVICES_CHANGED:
                    case signals.DEVICE_INFO_CHANGED: {
                        return state;
                    }
                }
            }
            break;
        }
    }

    return state;
}

export default usbReducer;
