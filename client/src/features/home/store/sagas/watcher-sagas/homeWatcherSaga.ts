
import { takeEvery } from "@redux-saga/core/effects"
import {
    initHomeAction,
    fetchAllMessagesAction,
    sendWSMessageAction,
} from "../../actions"
import { initHomeWorkerSaga } from "../worker-sagas/initHomeWorkerSaga";
import { fetchAllMessagesWorkerSaga } from "../worker-sagas/fetchAllMessagesWorkerSaga";
import { wsSenderSaga } from "./wsSenderSaga";


export function* homeWatcherSaga() {
    yield takeEvery(initHomeAction.TYPE, initHomeWorkerSaga);
    yield takeEvery(fetchAllMessagesAction.TYPE, fetchAllMessagesWorkerSaga);
    yield takeEvery(sendWSMessageAction.TYPE, wsSenderSaga);
};

