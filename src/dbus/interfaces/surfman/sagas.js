import { put } from 'redux-saga/effects';
import { SURFMAN_INITIALIZED } from './actions';

const initialize = function* () {
  yield put({ type: SURFMAN_INITIALIZED });
};

export default initialize;
