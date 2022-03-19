import { put } from "@redux-saga/core/effects";

import { openNotification } from "features/notification/store";
import { WebSocketEventHandler } from "features/websocket/helpers";
import { sendWebSocketEventAction } from "features/websocket/store";
import { deleteDialogMessagesFromDBAction } from "../../actions";


export function* deleteDialogMessagesFromDBWorkerSaga(action: typeof deleteDialogMessagesFromDBAction.typeOf.action) {
    try {
        const event = WebSocketEventHandler.deleteDialogMessageEvent(action.payload);
        yield put(sendWebSocketEventAction({ payload: event }));
    } catch (error: any) {
        yield put(openNotification({ payload: { message: error.message, variant: 'error' } }));
    };
};