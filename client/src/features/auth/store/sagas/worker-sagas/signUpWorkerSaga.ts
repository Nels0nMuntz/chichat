import { AxiosResponse } from "axios";
import { put } from "@redux-saga/core/effects";
import { ResponseError, Status } from "shared";
import { authService } from "services";
import { openNotification } from "features/notification/store";
import { SIGNIN_PAGE_URL } from "features/auth/urls";
import { SignUpFormErrors } from "features/auth/models";
import { 
    signUpAction, 
    setSignUpStatus,
    setSignUpErrors,
} from "../../actions";


export function* signUpWorkerSaga(action: typeof signUpAction.typeOf.action){
    try {
        yield put(setSignUpStatus({ payload: Status.Running }));
        const { status }: AxiosResponse = yield authService.signup(action.payload);
        if(status === 200){
            location.href = SIGNIN_PAGE_URL.urlTemplate;
            yield put(setSignUpStatus({ payload: Status.Success }));
        }
    } catch (error: any) {
        const Error: ResponseError<Array<{ param: string, msg: string }>> = error;
        yield put(setSignUpStatus({ payload: Status.Error }));
        if(Error.status === 400){
            const errors: SignUpFormErrors = {};
            Error.metaData.forEach(({ param, msg }) => errors[param] = msg);
            yield put(setSignUpErrors({ payload: errors }));
        }
        yield put(openNotification({ payload: { message: error.message, variant: 'error' } }));      
    };
};