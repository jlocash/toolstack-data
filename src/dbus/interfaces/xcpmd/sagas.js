import { put } from 'redux-saga/effects';
import { XCPMD_INITIALIZED } from './actions';

const initialize = function* () {
  yield put({ type: XCPMD_INITIALIZED });
};

export default initialize;
