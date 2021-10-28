import { put } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { IFetchMessagesResponse } from "../../../../models";
import { messageService } from "services";
import { Status } from "shared";
import { 
    fetchMessagesAction,
    setMessagesStatusAction,
    setMessagesListAction,
    incrementPaginationPageAction,
} from "../../../";
import { setNotification } from "features/notification/store";

export function* fetchMessagesWorkerSaga(action: typeof fetchMessagesAction.typeOf.action){
    try {
        yield put(setMessagesStatusAction({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IFetchMessagesResponse> = yield messageService.fetchMessages(action.payload);
        if(status === 200){
            yield put(setMessagesListAction({ payload: data }));
            yield put(incrementPaginationPageAction({ payload: { dialogId: action.payload.dialogId } }));
            yield put(setMessagesStatusAction({ payload: Status.Success }));
        }
    } catch (error: any) {
        yield put(setMessagesStatusAction({ payload: Status.Error }));
        yield put(setNotification({ payload: {
            status: Status.Error,
            message: error.message,
        } }));
    };
};