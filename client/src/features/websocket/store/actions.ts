import { defineAction } from "rd-redux-utils";
import { WebSocketEvent } from "../models";

export const setWebSocketAction = defineAction<{ payload: WebSocket }>("SET_WEBSOCKET");

export const sendWebSocketEventAction = defineAction<{ payload: WebSocketEvent }>("SEND_WEB_SOCKET_EVENT");