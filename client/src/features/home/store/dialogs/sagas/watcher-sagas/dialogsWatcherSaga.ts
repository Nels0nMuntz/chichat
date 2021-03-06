import { takeEvery } from "@redux-saga/core/effects";
import {
    createDialogAction,
    fetchDialogMessagesAction,
    uploadFilesAction,
    createDialogMessageAction,
    fetchMessageAttachVoiceAction,
    deleteDialogMessagesFromDBAction,
} from "features/home/store";
import { createDialogWorkerSaga } from "../worker-sagas/createDialogWorkerSaga";
import { fetchDialogMessagesWorkerSaga } from "../worker-sagas/fetchDialogMessagesWorkerSaga";
import { uploadFilesWorkerSaga } from "../worker-sagas/uploadFilesWorkerSaga";
import { createDialogMessageWorkerSaga } from "../worker-sagas/createDialogMessageWorkerSaga";
import { fetchMessageAttachVoiceWorkerSaga } from "../worker-sagas/fetchMessageAttachWorkerSaga";
import { deleteDialogMessagesFromDBWorkerSaga } from "../worker-sagas/deleteDialogMessagesFromDBWorkerSaga";


export function* dialogsWatcherSaga() {
    yield takeEvery(createDialogAction.TYPE, createDialogWorkerSaga);
    yield takeEvery(fetchDialogMessagesAction.TYPE, fetchDialogMessagesWorkerSaga);
    yield takeEvery(uploadFilesAction.TYPE, uploadFilesWorkerSaga);
    yield takeEvery(createDialogMessageAction.TYPE, createDialogMessageWorkerSaga);
    yield takeEvery(fetchMessageAttachVoiceAction.TYPE, fetchMessageAttachVoiceWorkerSaga);
    yield takeEvery(deleteDialogMessagesFromDBAction.TYPE, deleteDialogMessagesFromDBWorkerSaga);
};