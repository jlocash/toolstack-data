import { all, call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions from './actions';

function* initialize() {
  yield call(sendMessage, actions.hello());
  yield all([
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.status_tool')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.input')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.networkdomain.notify')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.networkdaemon.notify')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.updatemgr')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.usbdaemon')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.xcpmd')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.xenmgr')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.xenmgr.host')),
    call(sendMessage, actions.signalRegister('com.citrix.xenclient.xenmgr.guestreq')),
  ]);
}

export default initialize;
