import { all, call, put } from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import actions from './actions';
import dbusActions from '../../actions';

function* signalRegister(iface) {
  yield call(sendMessage, actions.signalRegister(iface));
  yield put({ type: dbusActions.DBUS_REGISTER_INTERFACE, data: iface });
}

export default function* registerSignals() {
  yield call(sendMessage, actions.hello());
  yield all([
    signalRegister('com.citrix.xenclient.status_tool'),
    signalRegister('com.citrix.xenclient.input'),
    signalRegister('com.citrix.xenclient.networkdomain.notify'),
    signalRegister('com.citrix.xenclient.networkdaemon.notify'),
    signalRegister('com.citrix.xenclient.updatemgr'),
    signalRegister('com.citrix.xenclient.usbdaemon'),
    signalRegister('com.citrix.xenclient.xcpmd'),
    signalRegister('com.citrix.xenclient.xenmgr'),
    signalRegister('com.citrix.xenclient.xenmgr.host'),
    signalRegister('com.citrix.xenclient.xenmgr.guestreq'),
  ]);
}
