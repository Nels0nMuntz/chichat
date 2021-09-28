import { put } from "@redux-saga/core/effects";
import { 
    setDialogsStatus,
    setDialogsList,
} from "../../actions";
import { Status } from "shared";
import { AxiosResponse } from "axios";
import { IFetchDialogsResponse } from "features/home/models";
import { dialogsService } from "services";
import { setNotification } from "features/notification/store";


export function* fetchDialogsWorkerSaga(){
    try {
        yield put(setDialogsStatus({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IFetchDialogsResponse> = yield dialogsService.fetchAll();
        if(status === 200){
            yield put(setDialogsList({ payload: data }));
            yield put(setDialogsStatus({ payload: Status.Success }));
        }
    } catch (error: any) {
        yield put(setDialogsStatus({ payload: Status.Error }));
        yield put(setNotification({ payload: {
            status: Status.Error,
            message: error.message,
        } }));
    }
};