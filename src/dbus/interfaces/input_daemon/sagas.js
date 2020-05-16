import { all, call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions, { INPUT_DAEMON_INITIALIZED } from './actions';

function* initialize() {
  call(sendMessage, actions.authCollectPassword());
  yield all([
    call(sendMessage, actions.getAllProperties()),
    call(sendMessage, actions.getKbLayouts()),
    call(sendMessage, actions.getCurrentKbLayout()),
    call(sendMessage, actions.getMouseSpeed()),
    call(sendMessage, actions.touchpadGet('tap-to-click-enable')),
    call(sendMessage, actions.touchpadGet('scrolling-enable')),
    call(sendMessage, actions.touchpadGet('speed')),
  ]);
  yield put({ type: INPUT_DAEMON_INITIALIZED });
}

export default initialize;
