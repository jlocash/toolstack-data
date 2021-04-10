import { call, put } from 'redux-saga/effects';
import sendMessage from '../../sendMessage';

import ui, { types } from './actions';

function* initialize() {
  yield call(sendMessage, ui.getAllProperties());
  yield put({ type: types.XENMGR_UI_INITIALIZED });
}

export default initialize;
