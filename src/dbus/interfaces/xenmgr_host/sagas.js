import { all, call, put } from 'redux-saga/effects';
import { sendMessage } from '../../sagas.js';
import actions, { XENMGR_HOST_INITIALIZED } from './actions';

function* initialize() {
  yield all([
    // yield call(sendMessage, host.listDiskDevices());
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
  ]);
  yield put({ type: XENMGR_HOST_INITIALIZED });
}

export default initialize;
