import { call, put } from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import xenmgr, { types } from './actions';
import dbusActions from '../../actions';

export const signalMatcher = (signal) => (action) => (
  action.type === dbusActions.DBUS_SIGNAL_RECEIVED
    && action.data.interface === 'com.citrix.xenclient.xenmgr'
    && action.data.member === signal
);

function* initialize() {
  yield call(sendMessage, xenmgr.getAllProperties());
  yield put({ type: types.XENMGR_INITIALIZED });
}

export default initialize;
