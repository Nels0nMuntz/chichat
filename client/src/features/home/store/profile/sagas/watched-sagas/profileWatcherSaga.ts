import { takeEvery } from 'redux-saga/effects';
import { storeProfilePhoto, updateProfile } from '../../actions';
import { updateProfileWorkerSaga } from "../worker-sagas/updateProfileWorkerSaga";

export function* profileWatcherSaga() {
    yield takeEvery(updateProfile.TYPE, updateProfileWorkerSaga)
}
