import { put } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import {
    signInAction,
    setSignInStatus,
} from '../../actions';
import { ISignInResponse } from '../../../models';
import { authService, localStorageService } from 'services';
import { Status } from 'shared';
import { setNotification } from 'features/notification/store';
import { HOME_PAGE_URL } from 'features/home/urls';


export function* signInWorkerSaga(action: typeof signInAction.typeOf.action){
    try {
        yield put(setSignInStatus({ payload: Status.Running }));
        const response: AxiosResponse<ISignInResponse> = yield authService.signin(action.payload);
        if(response.status === 200){
            const accessToken = response.data.accessToken;
            console.log(accessToken);
            if(!accessToken){
                throw new Error("Authorization error");
            };
            localStorageService.setAccessToken(accessToken);
            yield put(setSignInStatus({ payload: Status.Success }));
            location.href = HOME_PAGE_URL.urlTemplate;
        }
    } catch (error: any) {      
        yield put(setSignInStatus({ payload: Status.Error }));
        yield put(setNotification({ payload: {
            status: Status.Error,
            message: error.message,
        } }));
    };
};