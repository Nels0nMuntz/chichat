import { takeEvery } from "@redux-saga/core/effects";
import {
    createDialogAction,
    fetchDialogMessagesAction,
} from "features/home/store";
import { createDialogWorkerSaga } from "../worker-sagas/createDialogWorkerSaga";
import { fetchDialogMessagesWorkerSaga } from "../worker-sagas/fetchDialogMessagesWorkerSaga";


export function* dialogsWatcherSaga() {
    yield takeEvery(createDialogAction.TYPE, createDialogWorkerSaga);
    yield takeEvery(fetchDialogMessagesAction.TYPE, fetchDialogMessagesWorkerSaga);
};