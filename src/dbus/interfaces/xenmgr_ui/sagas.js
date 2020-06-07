import { call, fork, put, take } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import dbusActions from '../../actions';
import ui, { XENMGR_UI_INITIALIZED } from './actions';
import { signals } from '../xenmgr/constants';

function* initialize() {
  yield call(sendMessage, ui.getAllProperties());
  // yield fork(watchSignals);
  yield put({ type: XENMGR_UI_INITIALIZED });
}

// const signalMatcher = action => {
//   const { type, payload } = action;
//   if (type === dbusActions.DBUS_SIGNAL_RECEIVED) {
//     switch (payload.member) {
//       case signals.CONFIG_CHANGED:
//         return true;
//     }
//   }
// };

// function* watchSignals() {
//   while (true) {
//     yield take(signalMatcher);
//     yield fork(sendMessage, ui.getAllProperties());
//   }
// }

export default initialize;
