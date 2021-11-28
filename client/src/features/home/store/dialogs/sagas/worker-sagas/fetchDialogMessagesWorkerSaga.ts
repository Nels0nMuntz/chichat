import { put } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { messageService } from "services";
import { 
    fetchDialogMessagesAction,
    setDialogStatusAction,
    setDialogMessagesAction,
    incrementPaginationPageAction,
    MessageDto,
} from "features/home/store";
import { IFetchMessagesResponse } from "features/home/models";
import { Status } from "shared";
import { setNotification } from "features/notification/store";


export function* fetchDialogMessagesWorkerSaga(action: typeof fetchDialogMessagesAction.typeOf.action){
    try {
        yield put(setDialogStatusAction({ payload: { dialogId: action.payload.dialogId, status: Status.Running } }));
        const { status, data }: AxiosResponse<IFetchMessagesResponse> = yield messageService.fetchMessages(action.payload);
        if(status === 200){
            yield put(setDialogMessagesAction({ payload: { 
                dialogId: action.payload.dialogId,
                messages: data.messages.map(message => new MessageDto(message)),
                hasMore: data.hasMore,
            } }));
            yield put(incrementPaginationPageAction({ payload: { dialogId: action.payload.dialogId } }));
            yield put(setDialogStatusAction({ payload: { dialogId: action.payload.dialogId, status: Status.Success } }));
        };
    } catch (error: any) {
        yield put(setDialogStatusAction({ payload: { dialogId: action.payload.dialogId, status: Status.Error } }));
        yield put(setNotification({ payload: {
            status: Status.Error,
            message: error.message,
        } }))
    };
};