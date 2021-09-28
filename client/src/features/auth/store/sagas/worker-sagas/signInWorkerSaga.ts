import { put } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { ISignInResponse, SignInFormErrors } from '../../../models';
import { authService, localStorageService } from 'services';
import { ResponseError, Status } from 'shared';
import { setNotification } from 'features/notification/store';
import { HOME_PAGE_URL } from 'features/home/urls';
import {
    signInAction,
    setSignInStatus,
    setSignInErrors,
    setUserAction,
} from '../../actions';


export function* signInWorkerSaga(action: typeof signInAction.typeOf.action){
    try {
        yield put(setSignInStatus({ payload: Status.Running }));
        const response: AxiosResponse<ISignInResponse> = yield authService.signin(action.payload);
        if(response.status === 200){
            const accessToken = response.data.accessToken;
            if(!accessToken){
                throw new Error("Authorization error");
            };
            localStorageService.setAccessToken(accessToken);
            location.href = HOME_PAGE_URL.urlTemplate;
            yield put(setUserAction({ payload: response.data.user }));
            yield put(setSignInStatus({ payload: Status.Success }));
        }
    } catch (error: any) {      
        const Error: ResponseError<Array<{ param: string, msg: string }>> = error;
        yield put(setSignInStatus({ payload: Status.Error }));
        if(Error.status === 400 && Error.metaData){
            const errors: SignInFormErrors = {};
            Error.metaData.forEach(({ param, msg }) => errors[param] = msg);
            yield put(setSignInErrors({ payload: errors }));
        }
        yield put(setNotification({ payload: {
            status: Status.Error,
            message: error.message,
        } }));
    };
};