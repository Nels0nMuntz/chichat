import { select } from "@redux-saga/core/effects";
import { selectWebSocket } from "../selectors";
import { sendWebSocketEventAction } from "../actions";


export function* sendWebSocketEventSaga(action: typeof sendWebSocketEventAction.typeOf.action) {
    const socket: WebSocket | null = yield select(selectWebSocket);
    if(socket && socket.readyState === 1){       
        socket.send(JSON.stringify(action.payload));
    };
};