import { put, select } from "redux-saga/effects";

import { 
    uploadFilesAction,
    setUploadModalOpenAction,
    setUploadModalAttachAction,
    setUploadModalUploadStatusAction,
    resetUploadModalAction,
    setUploadModalMessageTextAction,
} from "../../actions";
import { selectActiveDialog } from './../../selectors';
import { IDialog } from 'features/home/models';
import { setNotification } from "features/notification/store";
import { uploadFiles, Status } from "shared";


export function* uploadFilesWorkerSaga(action: typeof uploadFilesAction.typeOf.action) {
    const uploadResult = uploadFiles(action.payload);
    if (uploadResult instanceof Error) {
        yield put(setNotification({ payload: { status: Status.Error, message: uploadResult.message } }));
    } else {
        const activeDialog: IDialog | undefined = yield select(selectActiveDialog);
        if(!activeDialog) return;
        yield put(resetUploadModalAction({ payload: null }));
        yield put(setUploadModalUploadStatusAction({ payload: Status.Success }));
        yield put(setUploadModalAttachAction({ payload: uploadResult }));
        yield put(setUploadModalMessageTextAction({ payload: activeDialog.form.text || '' }));
        yield put(setUploadModalOpenAction({ payload: true }));
    };
}