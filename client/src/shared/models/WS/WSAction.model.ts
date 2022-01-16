export type SET_WEBSOCKET = "SET_WEBSOCKET";

export type setWebSocketAction = ({ type: SET_WEBSOCKET, payload: { ws: WebSocket | null } });

export type IWSAction =
    setWebSocketAction;