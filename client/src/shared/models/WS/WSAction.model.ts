export type SET_IS_CONNECTED = "SET_IS_CONNECTED";
export type SET_WEBSOCKET = "SET_WEBSOCKET";

export type setIsConnectedAction = ({ type: SET_IS_CONNECTED, payload: { isConnected: boolean } });

export type setWebSocketAction = ({ type: SET_WEBSOCKET, payload: { ws: WebSocket | null } });

export type IWSAction =
    setIsConnectedAction |
    setWebSocketAction;