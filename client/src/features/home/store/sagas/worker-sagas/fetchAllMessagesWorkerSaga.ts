import { put } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { IFetchAllMessagesResponse } from "../../../models";
import { dialogsService } from "services";
import { Status } from "shared";
import { 
    fetchAllMessagesAction,
    setMessagesStatusAction,
    setMessagesListAction,
} from "../../actions";
import { setNotification } from "features/notification/store";

export function* fetchAllMessagesWorkerSaga(action: typeof fetchAllMessagesAction.typeOf.action){
    try {
        yield put(setMessagesStatusAction({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IFetchAllMessagesResponse> = yield dialogsService.fetchAllMessages(action.payload);
        if(status === 200){
            yield put(setMessagesListAction({ payload: data }));
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