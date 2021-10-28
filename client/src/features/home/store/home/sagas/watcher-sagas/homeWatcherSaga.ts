
import { takeEvery } from "@redux-saga/core/effects"
import {
    initHomeAction,
    sendWSMessageAction,
} from "../../actions"
import { initHomeWorkerSaga } from "../worker-sagas/initHomeWorkerSaga";
import { wsSenderSaga } from "./wsSenderSaga";


export function* homeWatcherSaga() {
    yield takeEvery(initHomeAction.TYPE, initHomeWorkerSaga);
    yield takeEvery(sendWSMessageAction.TYPE, wsSenderSaga);
};

