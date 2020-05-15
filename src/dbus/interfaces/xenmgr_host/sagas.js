import { all, call, delay, fork, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions, { XENMGR_HOST_INITIALIZED } from './actions';

function* updateTime() {
  while (true) {
    yield call(sendMessage, actions.getSecondsFromEpoch());
    yield delay(3000);
  }
}

function* initialize() {
  yield all([
    call(sendMessage, actions.getAllProperties()),
    call(sendMessage, actions.listPciDevices()),
    call(sendMessage, actions.listCaptureDevices()),
    call(sendMessage, actions.listCdDevices()),
    call(sendMessage, actions.listGpuDevices()),
    call(sendMessage, actions.listIsos()),
    call(sendMessage, actions.listPciDevices()),
    call(sendMessage, actions.listPlaybackDevices()),
    call(sendMessage, actions.listSoundCards()),
    call(sendMessage, actions.getAcLidCloseAction()),
    call(sendMessage, actions.getBatteryLidCloseAction()),
    call(sendMessage, actions.getEula()),
    fork(updateTime),
    call(sendMessage, actions.getInstallstate()),
  ]);
  yield put({ type: XENMGR_HOST_INITIALIZED });
}

export default initialize;
