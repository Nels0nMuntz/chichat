
import { takeEvery } from "@redux-saga/core/effects"
import {
    initHomeAction,
} from "../../actions"
import { initHomeWorkerSaga } from "../worker-sagas/initHomeWorkerSaga";


export function* homeWatcherSaga() {
    yield takeEvery(initHomeAction.TYPE, initHomeWorkerSaga);
};

