import { call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import xenmgr, { XENMGR_INITIALIZED } from './actions';
import dbusActions from '../../actions';

export const signalMatcher = signal => {
  return action => (
    action.type === dbusActions.DBUS_SIGNAL_RECEIVED &&
    action.payload.interface === 'com.citrix.xenclient.xenmgr' &&
    action.payload.member === signal
  );
};

function* initialize() {
  yield call(sendMessage, xenmgr.getAllProperties());
  yield put({ type: XENMGR_INITIALIZED });
}

export default initialize;
