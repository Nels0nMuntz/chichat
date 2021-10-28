
import { put } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { messageService } from "services";
import { 
    deleteMessagesInDBAction,
    deleteMessagesOnClientAction,
    setMessagesStatusAction,
} from "features/home/store";
import { Status } from "shared";
import { setNotification } from "features/notification/store";


export function* deleteMessagesWorkerSaga(action: typeof deleteMessagesInDBAction.typeOf.action){
    try {
        yield put(setMessagesStatusAction({ payload: Status.Running }));
        const { status }: AxiosResponse<void> = yield messageService.deleteMany(action.payload);
        if(status === 200){
            yield put(deleteMessagesOnClientAction({ payload: action.payload }));
            yield put(setMessagesStatusAction({ payload: Status.Success }));
        }
    } catch (error: any) {
        yield put(setMessagesStatusAction({ payload: Status.Error }));
        yield put(setNotification({ payload: { status: Status.Error, message: error.message } }));
    };
};