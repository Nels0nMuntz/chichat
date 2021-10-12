import { put } from "@redux-saga/core/effects";
import { 
    setHomeStateAction,
    setDialogsStatusAction,
    setDialogsListAction,
} from "../../actions";
import { Status } from "shared";
import { AxiosResponse } from "axios";
import { IFetchAllDialogsResponse } from "features/home/models";
import { dialogsService } from "services";
import { setNotification } from "features/notification/store";


export function* fetchInitDataWorkerSaga(){
    try {
        yield put(setDialogsStatusAction({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IFetchAllDialogsResponse> = yield dialogsService.fetchAllDialogs();
        if(status === 200){
            yield put(setDialogsListAction({ payload: data }));
            yield put(setDialogsStatusAction({ payload: Status.Success }));
            yield put(setHomeStateAction({ payload: Status.Success }));
        }
    } catch (error: any) {
        yield put(setHomeStateAction({ payload: Status.Error }));
        yield put(setDialogsStatusAction({ payload: Status.Error }));
        yield put(setNotification({ payload: {
            status: Status.Error,
            message: error.message,
        } }));
    }
};