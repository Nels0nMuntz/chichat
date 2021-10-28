import { put } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { IDialogResponse } from "../../../../models";
import { dialogService } from "services";
import { Status } from "shared";
import { 
    createDialogAction,
    setDialogStatusAction,
    addDialogListItemAction,
    resetSidebarSearchAction,
    setActiveDialogAction,
    setSidebarSearchModeAction,
} from "../../..";
import { setNotification } from "features/notification/store";


export function* createDialogWorkerSaga(action: typeof createDialogAction.typeOf.action){
    try {
        yield put(setDialogStatusAction({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IDialogResponse> = yield dialogService.createDialog(action.payload);
        if(status === 201){
            yield put(addDialogListItemAction({ payload: data }));
            yield put(setDialogStatusAction({ payload: Status.Success }));
            yield put(resetSidebarSearchAction({ payload: null }));
            yield put(setActiveDialogAction({ payload: data.dialogId }));
            yield put(setSidebarSearchModeAction({ payload: false }));
        };
    } catch (error: any) {
        yield put(setDialogStatusAction({ payload: Status.Error }));
        yield put(setNotification({ payload: { status: Status.Error, message: error.message } }));
    };
};