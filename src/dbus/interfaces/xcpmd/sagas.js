import { call } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions from './actions';

function* initialize() {
  yield call(sendMessage, actions.batteriesPresent());
}

export default initialize;
