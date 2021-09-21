import { takeEvery } from '@redux-saga/core/effects';
import {
    signInAction,
    signUpAction,
    checkAuthAction,
} from '../../actions';
import { signInWorkerSaga } from '../worker-sagas/signInWorkerSaga';
import { signUpWorkerSaga } from '../worker-sagas/signUpWorkerSaga';
import { checkAuthWorkerSaga } from '../worker-sagas/checkAuthWorkerSaga';


export function* authWatcherSaga(){
    yield takeEvery(signInAction.TYPE, signInWorkerSaga);
    yield takeEvery(signUpAction.TYPE, signUpWorkerSaga);
    yield takeEvery(checkAuthAction.TYPE, checkAuthWorkerSaga);
};