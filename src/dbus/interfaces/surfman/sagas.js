import { put } from 'redux-saga/effects';
import { SURFMAN_INITIALIZED } from './actions';

function* initialize() {
  yield put({ type: SURFMAN_INITIALIZED });
}

export default initialize;
