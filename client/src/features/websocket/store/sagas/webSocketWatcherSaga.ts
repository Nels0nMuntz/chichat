import { takeEvery } from "@redux-saga/core/effects";

import { sendWebSocketEventAction } from "../actions";
import { sendWebSocketEventSaga } from "./sendWebSocketEventSaga";


export function* webSocketWatcherSaga() {
    yield takeEvery(sendWebSocketEventAction.TYPE, sendWebSocketEventSaga);
};