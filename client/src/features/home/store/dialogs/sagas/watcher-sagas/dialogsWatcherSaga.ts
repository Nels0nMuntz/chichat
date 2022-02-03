import { takeEvery } from "@redux-saga/core/effects";
import {
    createDialogAction,
    fetchDialogMessagesAction,
    uploadFilesAction,
    createDialogMessageAction,
    fetchMessageAttachAction,
} from "features/home/store";
import { createDialogWorkerSaga } from "../worker-sagas/createDialogWorkerSaga";
import { fetchDialogMessagesWorkerSaga } from "../worker-sagas/fetchDialogMessagesWorkerSaga";
import { uploadFilesWorkerSaga } from "../worker-sagas/uploadFilesWorkerSaga";
import { createDialogMessageWorkerSaga } from "../worker-sagas/createDialogMessageWorkerSaga";
import { fetchMessageAttachWorkerSaga } from "../worker-sagas/fetchMessageAttachWorkerSaga";


export function* dialogsWatcherSaga() {
    yield takeEvery(createDialogAction.TYPE, createDialogWorkerSaga);
    yield takeEvery(fetchDialogMessagesAction.TYPE, fetchDialogMessagesWorkerSaga);
    yield takeEvery(uploadFilesAction.TYPE, uploadFilesWorkerSaga);
    yield takeEvery(createDialogMessageAction.TYPE, createDialogMessageWorkerSaga);
    yield takeEvery(fetchMessageAttachAction.TYPE, fetchMessageAttachWorkerSaga);
};