
import { takeEvery } from "@redux-saga/core/effects"
import {
    initHomeAction,
    sendWSMessageAction,
    sidebarSearchAction,
    createDialogAction,
} from "../../actions"
import { initHomeWorkerSaga } from "../worker-sagas/initHomeWorkerSaga";
import { wsSenderSaga } from "./wsSenderSaga";
import { sidebarSearchWorkerSaga } from "../worker-sagas/sidebarSearchWorkerSaga";
import { createDialogWorkerSaga } from "../worker-sagas/createDialogWorkerSaga";


export function* homeWatcherSaga() {
    yield takeEvery(initHomeAction.TYPE, initHomeWorkerSaga);
    yield takeEvery(sendWSMessageAction.TYPE, wsSenderSaga);
    yield takeEvery(sidebarSearchAction.TYPE, sidebarSearchWorkerSaga);
    yield takeEvery(createDialogAction.TYPE, createDialogWorkerSaga);
};

