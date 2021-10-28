import { takeEvery } from "@redux-saga/core/effects";
import { sidebarSearchAction } from "features/home/store";
import { sidebarSearchWorkerSaga } from "../worker-sagas/sidebarSearchWorkerSaga";


export function* sidebarWatcherSaga(){
    yield takeEvery(sidebarSearchAction.TYPE, sidebarSearchWorkerSaga);
};