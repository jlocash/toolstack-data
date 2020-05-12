import { call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import freedesktop from './actions';

const initialize = function* () {
  yield call(sendMessage, freedesktop.hello());
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.status_tool'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.input'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.networkdomain.notify'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.networkdaemon.notify'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.updatemgr'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.usbdaemon'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.xcpmd'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.xenmgr'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.xenmgr.host'));
  yield call(sendMessage, freedesktop.signalRegister('com.citrix.xenclient.xenmgr.guestreq'));
};

export default initialize;
