import { put, call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas';
import ui, { XENMGR_UI_INITIALIZED } from './actions';


const initialize = function* () {
  yield call(sendMessage, ui.getAllProperties());
  yield put({ type: XENMGR_UI_INITIALIZED });
};

export default initialize;
