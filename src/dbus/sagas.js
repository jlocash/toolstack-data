import { take, all, put, call, actionChannel } from 'redux-saga/effects';
import actions from './actions';
import websocketActions from '../websocket/actions';

// signal
// {
//     "id": 16796,
//     "type": "signal",
//     "interface": "com.citrix.xenclient.xenmgr", 
//     "member": "vm_state_changed",
//     "path": "/",
//     "args": [
//         "a6862dd4-ff2d-4dfa-8925-378ac807f26f", 
//         "/vm/a6862dd4_ff2d_4dfa_8925_378ac807f26f",
//         "creating", 
//         0
//     ]
// }

// response
// {
//     "id": 119,
//     "type": "response",
//     "response-to": "144",
//     "args": [
//         "HyperX Cloud Flight Wireless Headset",
//         0,
//         "",
//         "Kingston"
//     ]
// }

const watchDbusSendMessage = function* (outgoing) {
    const channel = yield actionChannel(actions.DBUS_SEND_MESSAGE);
    let id = 0;
    while (true) {
        id++;
        const { payload } = yield take(channel);
        outgoing[id] = { id, ...payload };
        yield put(websocketActions.sendMessage(outgoing[id]));
    }
}

const watchDbusResponseReceived = function* (outgoing) {
    while (true) {
        const { payload } = yield take(actions.DBUS_RESPONSE_RECEIVED);
        const id = payload['response-to'];
        yield put({
            type: actions.DBUS_DATA_RECEIVED,
            payload: {
                ...outgoing[id],
                sentArgs: outgoing[id].args,
                receivedArgs: payload.args,
            },
        });
        delete outgoing[id];
    }
}

const watchDbusErrorReceived = function* (outgoing) {
    while (true) {
        const { payload } = yield take(actions.DBUS_ERROR_RECEIVED);
        console.log(JSON.stringify(payload));
    }
}

export const dbusSaga = function* () {
    const outgoing = {};
    yield all([
        call(watchDbusSendMessage, outgoing),
        call(watchDbusResponseReceived, outgoing),
        call(watchDbusErrorReceived, outgoing),
    ]);
}
