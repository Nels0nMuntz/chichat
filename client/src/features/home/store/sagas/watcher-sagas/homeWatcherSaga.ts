
import { takeEvery } from "@redux-saga/core/effects"
import {
    fetchInitDataAction,
    fetchAllMessagesAction,
    sendWSMessageAction,
} from "../../actions"
import { fetchInitDataWorkerSaga } from "../worker-sagas/fetchInitDataWorkerSaga";
import { fetchAllMessagesWorkerSaga } from "../worker-sagas/fetchAllMessagesWorkerSaga";
import { wsSenderSaga } from "./wsSenderSaga";


export function* homeWatcherSaga() {
    yield takeEvery(fetchInitDataAction.TYPE, fetchInitDataWorkerSaga);
    yield takeEvery(fetchAllMessagesAction.TYPE, fetchAllMessagesWorkerSaga);
    yield takeEvery(sendWSMessageAction.TYPE, wsSenderSaga);
};

