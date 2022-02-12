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
import { openNotification } from "features/notification/store";
import { uploadFiles, Status } from "shared";


export function* uploadFilesWorkerSaga(action: typeof uploadFilesAction.typeOf.action) {
    const uploadResult = uploadFiles(action.payload);
    if (uploadResult instanceof Error) {
        yield put(openNotification({ payload: { message: uploadResult.message, variant: 'error' } }));
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