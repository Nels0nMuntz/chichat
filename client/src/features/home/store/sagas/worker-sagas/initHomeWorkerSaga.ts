import { put, call } from "@redux-saga/core/effects";
import {
    setHomeStateAction,
    setDialogsStatusAction,
    setDialogsListAction,
    setHomeUserDataAction,
} from "../../actions";
import { Status } from "shared";
import { AxiosResponse } from "axios";
import { 
    IFetchAllDialogsResponse, 
    IFetchUserDataResponse,
} from "features/home/models";
import { 
    dialogsService, 
    userService 
} from "services";
import { setNotification } from "features/notification/store";
import { wsRecieverSaga } from "../watcher-sagas";


export function* initHomeWorkerSaga() {
    yield call(fetchAllDialogs);
    yield call(fetchUserData);
    yield call(wsRecieverSaga);
};

function* fetchAllDialogs() {
    try {
        yield put(setDialogsStatusAction({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IFetchAllDialogsResponse> = yield dialogsService.fetchAllDialogs();
        if (status === 200) {
            yield put(setDialogsListAction({ payload: data }));
            yield put(setDialogsStatusAction({ payload: Status.Success }));
            yield put(setHomeStateAction({ payload: Status.Success }));
        }
    } catch (error: any) {
        yield put(setHomeStateAction({ payload: Status.Error }));
        yield put(setDialogsStatusAction({ payload: Status.Error }));
        yield put(setNotification({
            payload: {
                status: Status.Error,
                message: error.message,
            }
        }));
    }
};

function* fetchUserData() {
    try {
        const { status, data }: AxiosResponse<IFetchUserDataResponse> = yield userService.getUserData();
        if(status === 200){
            yield put(setHomeUserDataAction({ payload: data }));
        }
    } catch (error: any) {
        yield put(setNotification({
            payload: {
                status: Status.Error,
                message: error.message,
            }
        }));
    }
}