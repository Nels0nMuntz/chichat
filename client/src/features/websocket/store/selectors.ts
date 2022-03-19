import { AppState } from "app-state";

export const selectWebSocket = (state: AppState) => state.webSocket.websocket;