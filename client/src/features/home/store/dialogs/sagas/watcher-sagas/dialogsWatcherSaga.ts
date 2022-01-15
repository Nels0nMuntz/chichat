import { takeEvery } from "@redux-saga/core/effects";
import {
    createDialogAction,
    fetchDialogMessagesAction,
    uploadFilesAction,
} from "features/home/store";
import { createDialogWorkerSaga } from "../worker-sagas/createDialogWorkerSaga";
import { fetchDialogMessagesWorkerSaga } from "../worker-sagas/fetchDialogMessagesWorkerSaga";
import { uploadFilesWorkerSaga } from "../worker-sagas/uploadFilesWorkerSaga";


export function* dialogsWatcherSaga() {
    yield takeEvery(createDialogAction.TYPE, createDialogWorkerSaga);
    yield takeEvery(fetchDialogMessagesAction.TYPE, fetchDialogMessagesWorkerSaga);
    yield takeEvery(uploadFilesAction.TYPE, uploadFilesWorkerSaga);
};