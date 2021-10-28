import { takeEvery } from "@redux-saga/core/effects";
import { createDialogAction } from "features/home/store";
import { createDialogWorkerSaga } from "../worker-sagas/createDialogWorkerSaga";


export function* dialogsWatcherSaga(){
    yield takeEvery(createDialogAction.TYPE, createDialogWorkerSaga);
};