import { call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import ui, { XENMGR_UI_INITIALIZED } from './actions';


function* initialize() {
  yield call(sendMessage, ui.getAllProperties());
  yield put({ type: XENMGR_UI_INITIALIZED });
}

export default initialize;
