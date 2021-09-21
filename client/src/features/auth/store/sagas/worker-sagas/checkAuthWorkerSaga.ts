import { put } from "@redux-saga/core/effects"; 
import { AxiosResponse } from "axios";
import { authService, localStorageService } from "services";

import { setIsAuthAction } from '../../actions';
import { ISignInResponse } from "features/auth/models";
import { setNotification } from "features/notification/store";
import { Status } from "shared";


export function* checkAuthWorkerSaga(){
    try {
        const { status, data }: AxiosResponse<ISignInResponse> = yield authService.checkAuth();
        if(status === 200){
            yield put(setIsAuthAction({ payload: true }));
            if(!data.accessToken) throw new Error("Authorization error");
            localStorageService.setAccessToken(data.accessToken);
        }
    } catch (error: any) { 
        console.log(error);
             
        yield put(setIsAuthAction({ payload: false })); 
        yield put(setNotification({ payload: {
            status: Status.Error,
            message: error.message,
        } }));
    };
};