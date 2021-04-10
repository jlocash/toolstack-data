import { call } from 'redux-saga/effects';
import sendMessage from '../../sendMessage';
import actions from './actions';

function* initialize() {
  yield call(sendMessage, actions.batteriesPresent());
}

export default initialize;
