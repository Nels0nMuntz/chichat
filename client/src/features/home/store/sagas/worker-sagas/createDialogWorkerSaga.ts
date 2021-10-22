import { put, select } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { IDialog } from "../../../models";
import { dialogService } from "services";
import { Status } from "shared";
import { 
    createDialogAction,
    setDialogsStatusAction,
    addDialogsListItemAction,
    resetSidebarSearchAction,
    setSelectedDialogAction,
    fetchAllMessagesAction,
    setSidebarSearchModeAction,
} from "../../actions";
import { selectMessagesState } from "../../selectors";
import { setNotification } from "features/notification/store";


export function* createDialogWorkerSaga(action: typeof createDialogAction.typeOf.action){
    try {
        yield put(setDialogsStatusAction({ payload: Status.Running }));
        const { status, data }: AxiosResponse<IDialog> = yield dialogService.createDialog(action.payload);
        if(status === 201){
            yield put(addDialogsListItemAction({ payload: data }));
            yield put(setDialogsStatusAction({ payload: Status.Success }));

            const state: { limit: number, offset: number } = yield select(selectMessagesState)
            yield put(resetSidebarSearchAction({ payload: null }));
            yield put(setSelectedDialogAction({ payload: data }));
            yield put(setSidebarSearchModeAction({ payload: false }));
            yield put(fetchAllMessagesAction({ payload: {
                dialogId: data.dialogId,
                limit: state.limit,
                offset: state.offset,
            } }));
        };
    } catch (error: any) {
        yield put(setDialogsStatusAction({ payload: Status.Error }));
        yield put(setNotification({ payload: { status: Status.Error, message: error.message } }));
    };
};