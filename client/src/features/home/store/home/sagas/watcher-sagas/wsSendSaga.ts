import { select } from "@redux-saga/core/effects";

import { selecteWebSocket } from "../../selectors";
import { sendWSMessageAction } from "../../actions";


export function* wsSendSaga(action: typeof sendWSMessageAction.typeOf.action){
    const socket: WebSocket | null = yield select(selecteWebSocket);
    if(socket && socket.readyState === 1){
        socket.send(JSON.stringify(action.payload));
    };
};