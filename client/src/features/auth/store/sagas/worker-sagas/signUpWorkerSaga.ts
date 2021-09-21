import { AxiosResponse } from "axios";
import { put } from "@redux-saga/core/effects";
import { signUpAction, setSignUpStatus } from "../../actions";
import { Status } from "shared";
import { authService } from "services";
import { setNotification } from "features/notification/store";
import { SIGNIN_PAGE_URL } from "features/auth/urls";


export function* signUpWorkerSaga(action: typeof signUpAction.typeOf.action){
    try {
        yield put(setSignUpStatus({ payload: Status.Running }));
        const { status }: AxiosResponse = yield authService.signup(action.payload);
        if(status === 200){
            yield put(setSignUpStatus({ payload: Status.Success }));
            location.href = SIGNIN_PAGE_URL.urlTemplate;
        }
    } catch (error: any) {
        yield put(setSignUpStatus({ payload: Status.Error }));
        yield setNotification({
            payload: {
                status: Status.Error,
                message: error.message,
            }
        });
    };
};