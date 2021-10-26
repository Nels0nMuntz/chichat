
import { put, select } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { messageService } from "services";
import { 
    deleteMessagesAction,
    setMessagesStatusAction,
    fetchAllMessagesAction,
    selectMessagesState,
} from "features/home/store";
import { Status } from "shared";
import { setNotification } from "features/notification/store";
import { AppState } from "app-state";


export function* deleteMessagesWorkerSaga(action: typeof deleteMessagesAction.typeOf.action){
    const messageIds = action.payload.map(message => message.messageId);
    try {
        yield put(setMessagesStatusAction({ payload: Status.Running }));
        const { status }: AxiosResponse<void> = yield messageService.deleteMany(messageIds);
        if(status === 200){
            const { offset, limit }: AppState["messages"] = yield select(selectMessagesState);
            const dialogId = action.payload[0].dialogId;
            yield put(setMessagesStatusAction({ payload: Status.Success }));
            yield put(fetchAllMessagesAction({ payload: { dialogId, limit, offset } }));
        }
    } catch (error: any) {
        yield put(setMessagesStatusAction({ payload: Status.Error }));
        yield put(setNotification({ payload: { status: Status.Error, message: error.message } }));
    };
};