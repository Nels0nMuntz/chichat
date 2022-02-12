import { put, call } from "@redux-saga/core/effects";
import { Status } from "shared";
import { AxiosResponse } from "axios";

import {
    setHomeStateAction,
    setHomeUserDataAction,
    setDialogsListAction,
    setDialogsListStatusAction,
} from "features/home/store";
import { openNotification } from "features/notification/store";
import { 
    IFetchAllDialogsResponse,
    IFetchUserDataResponse,
} from "features/home/models";
import { 
    dialogService, 
    userService 
} from "services";
import { wsRecieveSaga } from "../watcher-sagas";
import { DialogDto } from "features/home/store/dialogs/dtos/dialog.dto";


export function* initHomeWorkerSaga() {
    yield call(fetchAllDialogs);
    yield call(fetchUserData);
    yield call(wsRecieveSaga);
};

function* fetchAllDialogs() {
    try {
        yield put(setDialogsListStatusAction({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IFetchAllDialogsResponse> = yield dialogService.fetchAllDialogs();
        if (status === 200) {
            const dialogsList = data.dialogs.map(dialog => {
                const dialogDto = new DialogDto(dialog);
                dialogDto.messages.list.length = 0;
                return dialogDto;
            });
            yield put(setDialogsListAction({ payload: dialogsList }));
            yield put(setDialogsListStatusAction({ payload: Status.Success }));
            yield put(setHomeStateAction({ payload: Status.Success }));
        }
    } catch (error: any) {
        yield put(setHomeStateAction({ payload: Status.Error }));
        yield put(setDialogsListStatusAction({ payload: Status.Error }));
        yield put(openNotification({ payload: { message: error.message, variant: 'error' } }));
    }
};

function* fetchUserData() {
    try {
        const { status, data }: AxiosResponse<IFetchUserDataResponse> = yield userService.getUserData();
        if(status === 200){
            yield put(setHomeUserDataAction({ payload: data }));
        }
    } catch (error: any) {
        yield put(openNotification({ payload: { message: error.message, variant: 'error' } }));
    }
}