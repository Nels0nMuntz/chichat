
import { takeEvery } from "@redux-saga/core/effects"
import {
    initHomeAction,
    sendWSMessageAction,
} from "../../actions"
import { initHomeWorkerSaga } from "../worker-sagas/initHomeWorkerSaga";
import { wsSendSaga } from "./wsSendSaga";


export function* homeWatcherSaga() {
    yield takeEvery(initHomeAction.TYPE, initHomeWorkerSaga);
    yield takeEvery(sendWSMessageAction.TYPE, wsSendSaga);
};

